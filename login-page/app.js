function showCreateAccount() {
    document.getElementById('login-box').style.display = 'none';
    document.getElementById('create-account-box').style.display = 'flex';
    history.pushState(null, '', '/register');
}

function showLogin() {
    document.getElementById('create-account-box').style.display = 'none';
    document.getElementById('login-box').style.display = 'flex';
    history.pushState(null, '', '/login');
}

// Check the current URL and show the appropriate form
function checkURL() {
    if (window.location.pathname === '/register') {
        showCreateAccount();
    } else if (window.location.pathname === '/login') {
        showLogin();
    }
}

// Run checkURL when the page loads
window.onload = checkURL;