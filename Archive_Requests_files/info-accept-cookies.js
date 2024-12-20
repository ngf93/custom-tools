const userLocation = window.location.pathname;
const acceptCookie = document.cookie.includes('acceptCookie') || undefined;

// modal 
const acceptBtn = document.getElementById('accept-btn');
const modal = document.getElementById('modal-info');

// header (main)
const openProfileModal = document.getElementById('openProfileModal');
const selectLanguage = document.getElementById('selectLanguage');

// cookie 
const cookiesAccept = document.querySelector(".wrapper");

const showInfoAcceptModal = () => {
    if (!acceptCookie) {
        modal.style.display = 'flex';
    }
}

// the appearance of modal
if (userLocation !== '/') {
    showInfoAcceptModal();
}

openProfileModal.addEventListener('click', function() {
    showInfoAcceptModal();
});

selectLanguage.addEventListener('click', function() {
    showInfoAcceptModal();
})

acceptBtn.addEventListener('click', function() {
    if (userLocation === '/') {
        modal.style.display = 'none';
        cookiesBox.classList.add('show');
    } else {
        window.location.href = '/';
    }
});