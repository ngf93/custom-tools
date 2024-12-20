var dropdownOpened = false;

$(document).ready(() => {
    const acceptCookie = document.cookie.includes('acceptCookie');

    $(document).on('click', '#openProfileModal', function () {
        if (acceptCookie) {
            $('#profileModal').fadeIn(300)
        }
    })
    $(document).mouseup(function (e) {
        var div = $("#profileModal");
        if (!div.is(e.target) 
            && div.has(e.target).length === 0) {
            div.hide();
        }
    })

    // NEW JS
    
    $.ajax({
        type: 'get',
        url: $(location).attr('origin') + '/authserver/',
        data: {"jwttoken": getCookie('jwttoken')},
        success: function(data) {
            console.log(data);
        },
        error: function(data2) {
            console.log('token not passed passed to server');
            // alert('Please input valid credentials');
        },
        
    });

    // Change language

    const language = getCookie('django_language');

    const languages = $('.language');

    if (!language) {
        for (let i = 0; i < languages.length; i++) {
            if ($(`#${languages[i].value}-lang`).prop('checked') == true) {
                document.cookie=`django_language=${languages[i].value};path=/`;
                window.location.reload();
            }
        }
    }
    
    if (!language) $(`#en-lang`).prop('checked', true);
    $(`#${language}-lang`).prop('checked', true);

    $(document).on('click', '.language', (event) => {
        document.cookie=`django_language=${event.target.value};path=/`;
        window.location.reload();
    })

    // $(".toggle-password").click(function (e) {
    //     console.log('pass toggled');
    //     e.preventDefault();

        //   $('#subMenuEnter').show();
        //   var type = $(this).find(".password").attr("type");
        //   console.log(type);
        //   if(type == "password"){
        //     //   $("svg.feather.feather-eye").replaceWith(feather.icons["eye-off"].toSvg());
        //       $(this).parent().parent().find(".password").attr("type","text");
        //   }else if(type == "text"){
        //     //   $("svg.feather.feather-eye-off").replaceWith(feather.icons["eye"].toSvg());
        //       $(this).parent().parent().find(".password").attr("type","password");
        //   }
    // });

    //   $("#subMenuShow").click(function (e) {
    //     console.log('entered');
    //     e.preventDefault();
    //      $(this).nextAll('ul').slideToggle();
    //     // $('#subMenuEnter').show();
    });

    // $(document).click(function(event){
    //     if (!event) { var event = window.event; }
    //     var S = event.srcElement ? event.srcElement : event.target;
    //     console.log($(S).attr('id'));
    //     console.log($(this).parent());
    //     if(($(S).attr('id')!='subMenuShow'))
    //         { 
    //          $('#subMenuEnter').slideToggle();
    //          }
    
    //     });

    // get_model_attributes(1387616);
    

    $("#result-row").hide();

    $(document).on('click', '.reset-input-text', function(e){
        e.preventDefault()
        $('#input-text-search').val('')
    })


    // $(document).on('click', '#buttonShortLogin', function (){
    //     function setCookie(name,value,days) {
    //         var expires = "";
    //         if (days) {
    //             var date = new Date();
    //             date.setTime(date.getTime() + (days*24*60*60*1000));
    //             expires = "; expires=" + date.toUTCString();
    //         }
    //         document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    //     }
    //     // preventDefault();
    //     let nick = $('#editShortNick').val();
    //     let password = $('#editShortPassword').val();
    //     let mutataion_login = `mutation login($username_s: String!, $password_s: String!) {
    //         tokenAuth(username:$username_s, password:$password_s){
    //         token
    //         }
    //     }
    //     `;
    //     console.log('we are heaar.');

    //     $.ajax({
    //         method: 'post',   
    //         url: $(location).attr('origin')+ '/graphql/', //+$(location).attr('host') 
    //         contentType: 'application/json',
    //         headers: { "Accept": 'application/json', },
    //         data: JSON.stringify({ query: mutataion_login, 
    //             variables: {
    //                 username_s: nick,
    //                 password_s: password,
    //             } }),
    //         success: function(data_from_graphql_abc) { // <== any var goes here
    //             let token = data_from_graphql_abc.data.tokenAuth.token;
    //             let jwttoken = "JWT "+token; //.trim()
                
    //             $('#buttonShortLogin').text('Passing to marketplace... ');
    //             setCookie("jwttoken", jwttoken, 999);
    //             if (data_from_graphql_abc.data.tokenAuth.token){
                    
    //                 location.reload();
    //             }
    //             else {
    //                 alert('Please check your credentials and/or email to confirm your registration');                 
    //                 $('#buttonShortLogin').text('Log in');
    //             }
    //         },
 
    //         error: function(data_from_graphql){
    //             alert('Please check your credentials and/or email to confirm your registration');
    //         },   
    //     });
    // });

    // $(document).on('click', '#logOutLink', function(){
    //     document.body.style.cursor = 'wait';
    //     $.ajax({
    //         type: 'get',
    //         url: "/goodbye/",
    //         data: {"jwttoken": getCookie('jwttoken')},
    //         success: function(data) {
    //             console.log(data);
    //         },
    //         error: function(data2) {
    //             console.log('token not passed passed to server');
    //         },
    //     });
       
    //     eraseCookie('jwttoken');
        
    //     if (window.location.pathname.includes('pagecart')){
    //         window.setTimeout(function() {
    //            window.location.replace(window.location.origin);}, 1400);
    //     }
    //     else {
    //         delayRefreshPage(1400);
    //     }
    //     document.body.style.cursor = 'default';
        
    // });


    //REQUEST TO RESET PASSWORD
    // $(document).on('click', '#resetPasswordButton', function (){
    //     // preventDefault();
    //     let email = $('#editEmailReset').val();
    //     let mutation_reset_pwd = `mutation ResetPWD($email_l: String!, $redirectUrl_l: String!) {
    //         requestPasswordReset(
    //           email: $email_l
    //           redirectUrl: $redirectUrl_l
    //         ) {
    //           accountErrors {
    //             field
    //             code
    //           }
    //         }
    //       }`;

    //     $.ajax({
    //         method: 'post',   
    //         url: $(location).attr('origin')+ '/graphql/',
    //         contentType: 'application/json',
    //         headers: { "Accept": 'application/json', },
    //         data: JSON.stringify({ query: mutation_reset_pwd, 
    //             variables: {
    //                 email_l: email,
    //                 redirectUrl_l: $(location).attr('origin')+'/resetpassword/',
    //             } 
    //         }),
    //         success: function(data_from_graphql_resetpassword) { 
    //             // console.log(treeData);
                
    //             //console.log(data_from_graphql_resetpassword.data.requestPasswordReset)
    //             // console.log(data_from_graphql_resetpassword.data.tokenCreate.token)
                
    //             $('#resetPasswordButton').text('Link sending...');
                
    //             if (data_from_graphql_resetpassword.data.requestPasswordReset.accountErrors[0]){
    //                 //console.log('Errors are located')
    //                 let errorfield = data_from_graphql_resetpassword.data.requestPasswordReset.accountErrors[0].field
    //                 let errorcode = data_from_graphql_resetpassword.data.requestPasswordReset.accountErrors[0].code
    //                 if (errorfield == 'email' && errorcode == 'NOT_FOUND'){
    //                     alert("The specified email address is not found")
    //                 }
    //                 $('#resetPasswordButton').text('Send email with link for password reset');
    //             }
    //             else {
    //                 let delay = 2500;
    //                 let url = $(location).attr('origin')+'/success/?verbose=succesful_linkresetsend';
    //                 setTimeout(function(){
    //                     location = url;
    //                 }, delay) 
    //             }
                
        
    //         },
    //         //error: function(data_from_graphql) {
    //         //    alert(data_from_graphql);
    //         error: function(data_from_graphql){
    //             alert('Error in query...');
    //         },
            
    //     })

    // })

   
    var ua=navigator.userAgent;
    function isMobile(){
     return !!(ua.match(/(iemobile|opera mini|iphone|ipad|ipod|blackberry|andriod)/i)||ua.search(/mobile/i)>0)
    }
   
    if (isMobile() && (window.location.pathname=='/')) {
        let mess_text = 'For our mobile users we recommend to turn your device at 90 degrees';
        if (sessionStorage.getItem('rotate_info') === null) {
            sessionStorage.setItem('rotate_info', 1);
            alert(mess_text);
        } 
    }





function refreshPage() {
    //ensure reloading from server instead of cache
    location.reload(true);
}
function delayRefreshPage(mileSeconds) {
    window.setTimeout(refreshPage, mileSeconds);
};

// function userlogOut(redirect_url){
//     console.log('bindlogOut');
//     $.ajax({
//         type: 'get',
//         url: "/goodbye/",
//         data: {"jwttoken": getCookie('jwttoken')},
//         success: function(data) {
//             console.log(data);
//         },
//         error: function(data2) {
//             console.log('token not passed passed to server');
//         },
//     });
    
//     eraseCookie('jwttoken');
//     let delay = 1500;
//     let url = $(location).attr('origin');
//     if (redirect_url) {
//        url = $(location).attr('origin')+redirect_url;
//     }
//     console.log(redirect_url,url);
//     setTimeout(function(){
//         location = url;
//     }, delay) 
// };

function $_GET(key) {
    var s = window.location.search;
    s = s.match(new RegExp(key + '=([^&=]+)'));
    return s ? s[1] : false;
};

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
// function eraseCookie(name) {   
//     document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
// }


function show_indevelop(title){
    let mess_text = "Requested web page is under construction";
    if (title == 'Cart'){
      mess_text = "Coming soon...";
      $('#text-indevelop').html(mess_text);
    }
    if (title == 'Profile'){
        mess_text = "Coming soon...";     
    }
    if (title == 'Search analogs'){
        mess_text = "Coming soon...";     
    }
    if (title == 'Assembly'){
        mess_text = "Coming soon";     
    }
    $('#text-indevelop').html(mess_text);
    $('#indevelop-backdrop .modal-title').text(title);
    $('#indevelop-backdrop').modal('show');
}


// add to cart function
function addCart(tool_id){
    var  query_gql_data = `mutation addUserCartMutation($tool_id: Int!){
        addUserCart(toolId:$tool_id){
            result
            mess
        }
    }`;
    $.ajax({
        method: 'post',
        url: $(location).attr('origin') + '/graphql/',
        data: JSON.stringify({ "query": query_gql_data, variables: {"tool_id": tool_id}}),
        contentType: 'application/json',
        headers: {"Authorization": getCookie('jwttoken')}, 
        //headers: { "Authorization": jwttoken },
        success: function(data_from_graphql) { 
            let res = data_from_graphql.data.addUserCart.result;
            let mess = data_from_graphql.data.addUserCart.mess;
            if (res) {
                $("#cart-count-num").text(parseInt($("#cart-count-num").text())+1);
            }
            else{
                if (mess == 'duplicate') {
                    $('#text-warning').html('This tool is already in cart');
                    $('#warning-backdrop .modal-title').text('Adding to cart');
                    $('#warning-backdrop').modal('show');   
                }
            }
        },
        error: function(data_from_graphql) {
            console.log(data_from_graphql);
        }
    });
}

function messCartShow(model,manuf,tool_id){
    if (getCookie('jwttoken') === null){
        let mess_text = "Please log in for work with cart";
        $('#text-warning').html(mess_text);
        $('#warning-backdrop .modal-title').text('Adding to cart');
        $('#warning-backdrop').modal('show');

    } else {
         $('#model-to-card').text(manuf +" "+ model);
         $('#btn-add-to-cart').attr('onclick',`{addCart(${tool_id})}`);
         $('#confirm-backdrop .modal-title').text('Adding to cart');
         $('#confirm-backdrop').modal('show');
    }
} 

function messShow(mess_text){
    $('#text-warning').html(mess_text);
    // $('#warning-backdrop .modal-title').text(title);
    $('#warning-backdrop').modal('show');
}



function get_model_attributes(tool_id){
    var  query_gql_data = `query queryModelAttributes($tool_id: Int!) {
        queryModelAttributes(toolId: $tool_id)
    }`;
    $.ajax({
        method: 'post',
        url: $(location).attr('origin') + '/graphql/',
        data: JSON.stringify({ "query": query_gql_data, variables: {"tool_id": tool_id}}),
        contentType: 'application/json',
        headers: {"Authorization": getCookie('jwttoken')}, 
        success: function(data_from_graphql) { 
            if (data_from_graphql.data.queryModelAttributes != null && typeof data_from_graphql.data.queryModelAttributes.error == 'undefined'){
                json_res =  JSON.parse(data_from_graphql.data.queryModelAttributes);
                $('#json_test').text(JSON.stringify(json_res));  
                $('#json-backdrop').modal('show');         
            }
        },
        error: function(data_from_graphql) {
            console.log(data_from_graphql);
        }
  });
}


function get_constr_default_attributes(constr){
    var  query_gql_data = `query queryConstrAttributes($constr: String!) {
        queryConstrAttributes(constr:$constr)
    }`;
    $.ajax({
        method: 'post',
        url: $(location).attr('origin') + '/graphql/',
        data: JSON.stringify({ "query": query_gql_data, variables: {"constr": constr}}),
        contentType: 'application/json',
        headers: {"Authorization": getCookie('jwttoken')}, 
        success: function(data_from_graphql) { 
            if (data_from_graphql.data.queryConstrAttributes != null && typeof data_from_graphql.data.queryConstrAttributes.error == 'undefined'){
                json_res =  JSON.parse(data_from_graphql.data.queryConstrAttributes);
                $('#json_test').text(JSON.stringify(json_res));  
                $('#json-backdrop').modal('show');            
            }
        },
        error: function(data_from_graphql) {
            console.log(data_from_graphql);
        }
  });
}


function prepare_to_delete(tool_id){
    var  query_gql_data = `mutation prepareToDelete($tool_id: Int!) {
        prepareToDelete(toolId:$tool_id)
    }
    `;
    $.ajax({
        method: 'post',
        url: $(location).attr('origin') + '/graphql/',
        data: JSON.stringify({ "query": query_gql_data, variables: {"tool_id": tool_id}}),
        contentType: 'application/json',
        headers: {"Authorization": getCookie('jwttoken')}, 
        success: function(data_from_graphql) { 
            console.log(data_from_graphql);
            if (data_from_graphql.data.prepareToDelete != null && typeof data_from_graphql.data.prepareToDelete.error == 'undefined'){
                console.log(JSON.parse(data_from_graphql.data.prepareToDelete))
                let res = JSON.parse(data_from_graphql.data.prepareToDelete).result;
                let mess = JSON.parse(data_from_graphql.data.prepareToDelete).mess;

                console.log(res,mess)
                if (res) {
                    $('#warning-backdrop .modal-title').text('Successfull');
                    $('#text-warning').html(`Successful. This marked as trash`);
                    $('#warning-backdrop').modal('show');
                }
                else{
                    if (mess == 'duplicate') {
                        $('#text-warning').html('Aborted. This is already in trash');
                        $('#warning-backdrop .modal-title').text('To delete');
                        $('#warning-backdrop').modal('show');   
                    } else {
                        $('#text-warning').html(mess);
                        $('#warning-backdrop .modal-title').text('To delete');
                        $('#warning-backdrop').modal('show');   

                    }
                }
    

            }
        },
        error: function(data_from_graphql) {
            console.log(data_from_graphql);
        }
  });
}