$(document).on('click', '#delRequestBtn', (event) => {
    const requestId = $(event.target).data('requestId');
    
    $('#modalAccept').data('requestId', requestId).modal('show')
})

$(document).on('click', '#removeBtn', (event) => {
    const id = $('#modalAccept').data('requestId');

    const jwttoken = getCookie('jwttoken').replace(/"/g, '');

    const query = `
        mutation RemoveUserRequest($id: ID!) {
            removeUserRequest(id: $id) {
                userRequest {
                    item
                }
            }
        }
    `

    const variables = {
        id
    }

    const data = JSON.stringify({
        query,
        variables
    })

    $.ajax({
        method: 'post',
        url: $(location).attr('origin') + '/graphql/',
        contentType: 'application/json',
        headers: {
            'Authorization': jwttoken
        },
        data,
        success: (res) => {
            $('#modalAccept').modal('hide')
            window.location.reload()
        },
        error: (err) => {
            console.log(err)
        }
    })
})

