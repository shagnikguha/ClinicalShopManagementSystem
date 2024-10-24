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
  const productLinks = document.querySelectorAll('a[href="#products"]');
  const product = document.getElementById('products');

  if (productLinks.length > 0 && product) {
      productLinks.forEach(link => {
          link.addEventListener('click', function(e) {
              e.preventDefault();
              product.scrollIntoView({ behavior: 'smooth' });
          });
      });
  } else {
      console.error('Product links or product not found');
  }
});