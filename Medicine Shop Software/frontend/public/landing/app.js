
function openChatbot() {
    window.open("https://saiyangodgoku.pythonanywhere.com", "_blank");
  }
document.addEventListener('DOMContentLoaded', function() {
    const footerLinks = document.querySelectorAll('a[href="#footer"]');
    const footer = document.getElementById('footer');

    if (footerLinks.length > 0 && footer) {
        footerLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                footer.scrollIntoView({ behavior: 'smooth' });
            });
        });
    } else {
        console.error('Footer links or footer not found');
    }
});