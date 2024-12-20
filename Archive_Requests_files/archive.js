
document.querySelectorAll('article').forEach((fro)=>{
    if (fro.querySelector('.row>.dlock>.gapler>#rerequest') != null) {
        fro.querySelector('.row>.dlock>.gapler>#rerequest').onclick = () => {
            typeform = fro.querySelector('.row>.dlock>.gapler>.info>.typ_reg').innerText.replace(/\s/g, "")
            console.log(typeform)
            if (typeform == 'shorten') {
                // const requestId = $(event.target).data('requestId');
                // document.querySelector('#form_shorten').classList.add('show')
                // document.querySelector('#form_shorten').data('requestId', requestId).modal('show')

                const requestId = $(event.target).data('requestId');
                $('#form_shorten').data('requestId', requestId).modal('show')
                document.querySelectorAll('#form_shorten>.modal-dialog>.modal-content>.modal-body>.row>.tab-content>#parameters-tab-pane_>#requestForm>.mb-3').forEach((mb) => {
                    if (mb.querySelector('#requestItem') != null) {
                        mb.querySelector('#requestItem').value = fro.querySelector('.row>.dlock>.gapler>.info>.name').textContent
                    }
                    if (mb.querySelector('#requestDetails') != null) {
                        mb.querySelector('#requestDetails').value = fro.querySelector('.row>.dlock>.gapler>.info>.description_reg').textContent
                    }
                    if (mb.querySelector('#requestQuantity') != null) {
                        mb.querySelector('#requestQuantity').value = fro.querySelector('.row>.dlock>.gapler>.info>.Quantity_re').textContent
                    }
                })
                // = fro.querySelector('.row>.dlock>.gapler>.info>.name').textContent
            }
            if (typeform == 'extended') {
                // const requestId = $(event.target).data('requestId');
                // document.querySelector('#form_shorten').classList.add('show')
                // document.querySelector('#form_shorten').data('requestId', requestId).modal('show')

                const requestId = $(event.target).data('requestId');
                $('#form_extended').data('requestId', requestId).modal('show')
                document.querySelectorAll('#form_extended>.modal-dialog>.modal-content>.modal-body>.row>.tab-content>#parameters-tab-pane_OtherTools>div>article>#requestForm>.mb-3').forEach((mb) => {
                    if (mb.querySelector('#item_OtherTools') != null) {
                        mb.querySelector('#item_OtherTools').value = fro.querySelector('.row>.dlock>.gapler>.info>.name').textContent
                    }

                })
                document.querySelector('#form_extended>.modal-dialog>.modal-content>.modal-body>.row>.tab-content>#parameters-tab-pane_OtherTools>#additional_section3>#comrow>#requestDetails_OtherTools').value = fro.querySelector('.row>.dlock>.gapler>.info>.description_reg').textContent
                document.querySelectorAll('#form_extended>.modal-dialog>.modal-content>.modal-body>.row>.tab-content>#parameters-tab-pane_OtherTools>.mb-3').forEach((mb3) => {
                    if (mb3.querySelector('.d-flex>div>#requestQuantity_OtherTools') != null) {
                        mb3.querySelector('.d-flex>div>#requestQuantity_OtherTools').value = fro.querySelector('.row>.dlock>.gapler>.info>.Quantity_re').textContent
                    }
                })


                // = fro.querySelector('.row>.dlock>.gapler>.info>.name').textContent
            }
            if ((typeform != 'shorten') && (typeform != 'extended')){
                const requestId = $(event.target).data('requestId');
                var formtype = `#form_${typeform}`
                console.log(formtype)
                // document.querySelector(`${formtype}).data('requestId', requestId).modal('show')
                
                $(`${formtype}`).data('requestId', requestId).modal('show')
                console.log(typeform)
                if (fro.querySelectorAll('.row>.dlock>.gapler>.info>.rpoblock>.rpoblock_des')){
                full_info = fro.querySelectorAll('.row>.dlock>.gapler>.info>.rpoblock>.rpoblock_des')
                info_block = document.querySelector(`${formtype}`)
                if (info_block.querySelector('.modal-dialog>.modal-content>.modal-body>.row>.tab-content>.show>div')){
                    rows = info_block.querySelectorAll('.modal-dialog>.modal-content>.modal-body>.row>.tab-content>.show>div')
                }       
                des_des = document.querySelector(`${formtype}`)

                if (des_des.querySelector('.modal-dialog>.modal-content>.modal-body>.row>.tab-content>.tab-pane>#additional_section3>#comrow>textarea[name="lorem"]')){
                    des_des.querySelector('.modal-dialog>.modal-content>.modal-body>.row>.tab-content>.tab-pane>#additional_section3>#comrow>textarea[name="lorem"]').value = fro.querySelector('.row>.dlock>.gapler>.info>.description_reg').textContent
                }
                rows.forEach((row)=>{
                    if(row.querySelector('.row')){
                        // Здесь вставлю переменные 
                        row.querySelectorAll('.row>aside').forEach((assi)=>{
                            if (assi.querySelectorAll('.mb-3>select')){
                                assi.querySelectorAll('.mb-3>select').forEach((mbs)=>{
                                    mbs.querySelectorAll('option').forEach((op)=>{
                                        if (op.value == '0'){
                                            if (op.textContent){
                                            val = op.textContent
                                            full_info.forEach((fir)=>{
                                                if (fir.querySelector('.rpoblock_des_par').textContent == val){
                                                    mbs.value = fir.querySelector('.rpoblock_des_val').textContent
                                                }
                                            })
                                            }
                                        }
                                    })
                                })
                            }
                            if (assi.querySelectorAll('label')){
                                //assi.querySelectorAll('.mb-3>select').forEach((mbs)=>{
                                    //mbs.querySelectorAll('option').forEach((op)=>{
                                      //  if (op.value == '0'){
                                        //    val = op.textContent
                                          //  full_info.forEach((fir)=>{
                                            //    if (fir.querySelector('.rpoblock_des_par').textContent == val){
                                              //      mbs.value = fir.querySelector('.rpoblock_des_val').textContent
                                                //}
                                            //})
                                        //}
                                   // })
                                //})
                                label = assi.querySelectorAll('label')
                                inpgroup = assi.querySelectorAll('div.input-group')
                                o = 0 
                                label.forEach((lab)=>{
                                    full_info.forEach((id)=>{
                                        ad = id.querySelectorAll('.rpoblock_des_par')
                                        ad.forEach((ib)=>{
                                            if (ib.innerText.replace(/\s/g, "")+'=' == lab.innerText.replace(/\s/g, "")){
                                                o += 1
                                                values = id.querySelector('.rpoblock_des_val')
                                                inpgroup[o-1].querySelector('input').value = id.querySelector('.rpoblock_des_val').textContent
                                            }
                                            
                                        })
                                    })
                                })
                            }
                            
                        })
                    }
                    if(row.querySelector('div.mb-3>.d-flex>div>#requestQuantity_T-SlotMills')){
                        row.querySelector('div.mb-3>.d-flex>div>#requestQuantity_T-SlotMills').value = fro.querySelector('.row>.dlock>.gapler>.info>.Quantity_re').textContent
                    }
                })
            }
            }
            document.querySelectorAll('.ses').forEach((bs) => {
                bs.innerText = 'Publish'
            })
        }
    }
})


document.querySelectorAll('button.bcreat').forEach((bc)=>{
    bc.onclick = ()=>{
     document.querySelectorAll('.ses').forEach((bs)=>{
            bs.innerText = 'Send inquery'
        })
    }
})