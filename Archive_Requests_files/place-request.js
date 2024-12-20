import { check_files_size } from '../../../static/js/common.js';
import { getJwtToken } from './common.js';
import { createAjaxRequestForm } from './request_functions.js';

$('#requestForm').validate({
    rules: {
        requestItem: {
            required: true,
        },
        requestQuantity: {
            required: true
        },
        requestMustHaveDate: {
            required: true
        }
    },
    messages: {
        requestItem: {
            required: "Please specify item"
        },
        requestQuantity: {
            required: "Please specify quantity"
        },
        requestMustHaveDate: {
            required: "Please specify date"
        }
    },
    errorElement: "em",
    errorPlacement: function (error, element) {
        if (element.prop('name') == 'requestMustHaveDate') {
            error.insertAfter(element.parent());
        } else {
            error.insertAfter(element);
        }
    },
    highlight: function (element, errorClass, validClass) {
        $(element).addClass("is-invalid").removeClass("is-valid");
        $(element.form).find("[data-valmsg-for=" + element.id + "]").addClass("invalid-feedback");
    },

    unhighlight: function (element, errorClass, validClass) {
        $(element).addClass("is-valid").removeClass("is-invalid");
        $(element.form).find("[data-valmsg-for=" + element.id + "]").removeClass("invalid-feedback");
    },
})

$(document).on('click', '#btnSendInquiry', (event) => {
    event.preventDefault();

    const item = $('#requestItem').val()
    const files = $('#mainInputFiles_shorten').prop('files')
    const description = $('#requestDetails').val()
    const quantity = $('#requestQuantity').val()
    const mustHaveDate = $('#requestMustHaveDate').val()

    // generate data
    const data = new FormData()

    const query = `
        mutation CreateUserRequest($item: String!, $files: [Upload], $description: String, $mustHaveDate: Date, $quantity: Int, $type_request: String) {
            createUserRequest(item: $item, files: $files, description: $description, mustHaveDate: $mustHaveDate, quantity: $quantity, typeRequest: $type_request) {
                userRequest {
                    id
                    item
                }
            }
        }
    `

    const variables = {
        item,
        files: [],
        description,
        mustHaveDate,
        quantity,
        type_request: 'shorten'
    }

    let map = {}
    let countFiles = 0;

    for (const file of files) {
        variables.files.push(null)
        map[countFiles] = [`variables.files.${countFiles}`]
        data.append(countFiles, file)

        countFiles++;
    }

    const operations = JSON.stringify({
        query,
        variables
    })

    data.append('operations', operations)
    data.append('map', JSON.stringify(map))

    $.ajax({
        method: 'post',
        url: $(location).attr('origin') + '/graphql/',
        contentType: false,
        processData: false,
        headers: {
            'Authorization': getJwtToken()
        },
        data,
        success: (res) => {
            location.href = $(location).attr('origin') + '/ecommerce/my_requests/'
        },
        error: (error) => {
            console.log('Create Request Error', error)
            alert('Error creating request')
        }
    })

})

function handleInputFiles(maxSize) {
    $('.input__files').each(function () {
        const formId = $(this).attr('id').replace('inputFiles_', '');

        $(`#showFiles_${formId}`).on('change', '.fileGroup input[type="file"]', function () {
            if (!window.FileReader) return false // check for browser support
            let input = this
            addFilesToMainInput(input)
            if (input.files) {
                [...input.files].map(function (file) {
                    let reader = new FileReader()
                    reader.onload = function (e) {
                        let html = `
                            <div class="labelFile d-flex" data-file-name="${file.name}">
                                <p class="text-primary-emphasis mb-0">${file.name}</p>
                                <i class="bi bi-x remove_input_file" role="button"></i>
                            </div>
                        `;
                        input.insertAdjacentHTML('beforebegin', html);
                    }
                    reader.readAsDataURL(file);
                })
            }
        })

        $(this).on('click', function () {
            const labelHTML = `
                <div class="fileGroup">
                    <input class="d-none input__files" type="file" name="files" multiple accept=".jpg, .png, .webp, .pdf, .dxf, .dwg, .jpeg">
                </div>
            `;
            $(`#showFiles_${formId}`).append(labelHTML);
            $('.fileGroup:last input', `#showFiles_${formId}`).click()
        })

        $(`#showFiles_${formId}`).on('click', '.fileGroup .remove_input_file', function() {
            const fileName = $(this).closest('.labelFile').data('file-name');
            const input_id = `#mainInputFiles_${formId}`;

            const inputElement = $(input_id)[0]; // Преобразуем jQuery объект в обычный элемент DOM
            const files = inputElement.files;
            const updatedFiles = [...files].filter((file) => file.name != fileName);

            // Создаем новый объект FileList
            const newFileList = new DataTransfer();
            updatedFiles.forEach(file => newFileList.items.add(file));

            // Устанавливаем новое значение для элемента input
            inputElement.files = newFileList.files;

            $(this).closest('.labelFile').remove();

            checkAndShowErrorSize(inputElement.files);
        })
        
        function addFilesToMainInput(inputFiles) {
            const mainInputElement = document.getElementById(`mainInputFiles_${formId}`);
            const fileList = new DataTransfer();
        
            // Добавляем старые файлы в новый объект DataTransfer
            for (let i = 0; i < mainInputElement.files.length; i++) {
                fileList.items.add(mainInputElement.files[i]);
            }
        
            // Добавляем новые файлы в новый объект DataTransfer
            $(inputFiles).each(function() {
                const inputElement = $(this)[0]; // Преобразуем jQuery объект в обычный элемент DOM
                const newFiles = inputElement.files;
        
                for (let i = 0; i < newFiles.length; i++) {
                    fileList.items.add(newFiles[i]);
                }
            });
        
            // Устанавливаем новый список файлов для основного input
            mainInputElement.files = fileList.files;
            checkAndShowErrorSize(mainInputElement.files);
        }
        
        function checkAndShowErrorSize(files) {
            const errorLabelSize = $(`#errorLabelSize_${formId}`);
    
            if (check_files_size(files, maxSize)) {
                errorLabelSize.html('You reached the limit size of total files upload');
            } else {
                errorLabelSize.html('');
            }
        }
    })
}
handleInputFiles(10);

$(document).on('click', '#btnSend_StepDrills', () => {
    createAjaxRequestForm('Step Drills', [
        'Internal coolant options',
        'Workpiece material',
        'Machine Type',
        'Machine Age',
        'DC',
        'DC2',
        'DCON',
        'LB1',
        'LU',
        'LCF',
        'LB2',
        'OAL',
        'SIG1',
        'SIG2'
    ])
})

$(document).on('click', '#btnSend_CustomDimensionsDrills', () => {
    createAjaxRequestForm('Custom Dimensions Drills', [
        'Internal coolant options',
        'Workpiece material',
        'Machine Type',
        'Machine Age',
        'DC',
        'DCON',
        'LU',
        'LCF',
        'SIG',
        'OAL'
    ])
})

$(document).on('click', '#btnSend_T-SlotMills', () => {
    createAjaxRequestForm('T-Slot Mills', [
        'Internal coolant options',
        'Workpiece material',
        'Machine Type',
        'Machine Age',
        'DC',
        'DN',
        'DCON',
        'CW',
        'CDX',
        'LU',
        'LB1',
        'OAL',
        'REL',
        'RER'
    ])
})

$(document).on('click', '#btnSend_BladeBallNoseConicalMills', () => {
    createAjaxRequestForm('Blade Ball Nose Conical Mills', [
        'Internal coolant options',
        'Workpiece material',
        'Machine Type',
        'Machine Age',
        'RE',
        'BHTA',
        'DCON',
        'APMX',
        'LU',
        'OAL'
    ])
})

$(document).on('click', '#btnSend_ThreadMills', () => {
    createAjaxRequestForm('Thread Mills', [
        'Internal coolant options',
        'Workpiece material',
        'Machine Type',
        'Machine Age',
        'Thread Profile',
        'DC',
        'DCON',
        'APMX',
        'LU',
        'OAL',
        'THREAD DESIGNATION',
        'THREAD PITCH'
    ])
})

$(document).on('click', '#btnSend_CornerRadiusMills', () => {
    createAjaxRequestForm('Corner Radius Mills', [
        'Internal coolant options',
        'Workpiece material',
        'Machine Type',
        'Machine Age',
        'DC',
        'DCON',
        'APMX',
        'LU',
        'OAL',
        'RE'
    ])
})

$(document).on('click', '#btnSend_OtherTools', () => {
    createAjaxRequestForm('Other Tools', [
        'Internal coolant options',
        'Workpiece material',
        'Tool material',
        'Machine Type',
        'Machine Age',
    ])
})

export {
    handleInputFiles
}