document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
  
    cards.forEach(card => {
      const addToCartImage = card.querySelector('.addToCartImage');
      const addToCartForm = card.querySelector('.addToCartForm');
  
      addToCartImage.addEventListener('click', function() {
        // Hide the image and its container
        addToCartImage.style.visibility = 'hidden';
        
        // Show the form
        addToCartForm.style.display = 'flex';
      });
    });
  });