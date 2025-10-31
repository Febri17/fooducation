function showLoginForm(e) {
    if (e) e.preventDefault();
    document.body.classList.add('login-mode');
    document.querySelector('.container').classList.add('flipped');
}

function showRegistrationForm(e) {
    if (e) e.preventDefault();
    document.body.classList.remove('login-mode');
    document.querySelector('.container').classList.remove('flipped');
    sessionStorage.removeItem('isLoggedIn');
}

document.getElementById('regForm').addEventListener('submit', function (e) {
    e.preventDefault();
    if (this.checkValidity()) {
        setTimeout(function () {
            showLoginForm();
        }, 10);
    }
});

document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    if (this.checkValidity()) {
        sessionStorage.setItem('isLoggedIn', 'true');
        window.location.href = "index.html";
    }
});

function checkInitialState() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const container = document.querySelector('.container');

    if (isLoggedIn === 'true' && container) {
        document.body.classList.add('login-mode');
        container.classList.add('flipped');
    }
}

document.addEventListener('DOMContentLoaded', checkInitialState);