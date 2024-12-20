$(document).on('click', '#logOutLink', () => {
    eraseCookie('jwttoken');
    eraseCookie('csrftoken');
    
    window.location.href = '/';
    console.log('exit')
})

const eraseCookie = (name) => {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}