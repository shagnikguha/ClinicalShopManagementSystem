// Functions for switching between login and register views
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

// Function to show the failure popup
function showFailurePopup(message) {
    const popup = document.querySelector('.failure-pop-up');
    const errorMessage = document.querySelector('.failure-pop-up .text-wrapper-7');
    if (message) {  // set the error message
        const errorMessageElement = popup.querySelector('.text-wrapper-7');
        if (errorMessageElement) {
            errorMessageElement.textContent = message;
        }
    }
    // Show the popup with flex display
    popup.style.display = 'flex';
}

// Function to hide the failure popup
function hideFailurePopup() {
    const popup = document.querySelector('.failure-pop-up');
    popup.style.display = 'none';
}

// Check the current URL and show the appropriate form
function checkURL() {
    if (window.location.pathname === '/register') {
        showCreateAccount();
    } else if (window.location.pathname === '/login') {
        showLogin();
    }
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check for error state from the hidden input
    const errorStateElement = document.getElementById('errorState');
    if (errorStateElement) {
        const hasError = errorStateElement.getAttribute('data-has-error') === 'true';
        const errorMessage = errorStateElement.getAttribute('data-error-message');
        const currentView = errorStateElement.getAttribute('data-current-view');

        if (currentView === 'register') {
            showCreateAccount();
        } else {
            showLogin();
        }

        if (hasError) {
            showFailurePopup(errorMessage);
        }
    }

    // Add click handlers for the popup
    const crossBtn = document.querySelector('.failure-pop-up .cross-btn');
    if (crossBtn) {
        crossBtn.addEventListener('click', function() {
            hideFailurePopup();
        });
    }

    // OK button click handler
    const okBtn = document.querySelector('.failure-pop-up .OK-btn');
    if (okBtn) {
        okBtn.addEventListener('click', function(e) {
            e.preventDefault();
            hideFailurePopup();
        });
    }

    // Run checkURL initially
    checkURL();
});

// Function to hide the failure popup
function hideFailurePopup() {
    const popup = document.querySelector('.failure-pop-up');
    popup.style.display = 'none'; // Set display to none to hide the popup
}

// Run checkURL when the page loads
window.onload = checkURL;