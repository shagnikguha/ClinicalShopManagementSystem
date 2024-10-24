
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

document.addEventListener('DOMContentLoaded', function() {
    const wrapper = document.querySelector('.carousel-wrapper');
    const slides = wrapper.children;
    let currentSlide = 0;
    const totalSlides = slides.length;

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        wrapper.style.transform = `translateX(-${currentSlide * 50}%)`; // 50% for each slide

        // Reset to first slide when reaching the end
        if (currentSlide === totalSlides - 1) {
            setTimeout(() => {
                wrapper.style.transition = 'none';
                currentSlide = 0;
                wrapper.style.transform = 'translateX(0)';
                setTimeout(() => {
                    wrapper.style.transition = 'transform 0.5s ease-in-out';
                }, 50);
            }, 5000);
        }
    }

    // Change slide every 5 seconds
    setInterval(nextSlide, 5000);

    // Optional: Add navigation dots
    const sliderContainer = document.querySelector('.slider');
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'slider-dots';
    
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.className = 'slider-dot';
        if (i === 0) dot.classList.add('active');
        dotsContainer.appendChild(dot);
    }
    
    sliderContainer.appendChild(dotsContainer);
});