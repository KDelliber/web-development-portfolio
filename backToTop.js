document.addEventListener('DOMContentLoaded', () => {
  const backToTopBtn = document.createElement('button');
  backToTopBtn.id = 'backToTopBtn';
  backToTopBtn.textContent = 'Back to Top';
  document.body.appendChild(backToTopBtn);

  const footer = document.querySelector('footer');

  // Function to handle button visibility and position
  const handleScroll = () => {
    if (window.scrollY > 300) {
      backToTopBtn.style.display = 'block';
    } else {
      backToTopBtn.style.display = 'none';
    }

    if (footer) {
      const footerTop = footer.getBoundingClientRect().top;
      const viewportHeight = window.innerHeight;

      if (footerTop < viewportHeight) {
        backToTopBtn.style.bottom = `${viewportHeight - footerTop + 20}px`;
      } else {
        backToTopBtn.style.bottom = '20px';
      }
    }
  };

  // Show/hide the button and prevent overlap with footer
  window.addEventListener('scroll', handleScroll);

  // Smooth scroll to top when button is clicked
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  // Initial check to set the button state
  handleScroll();
});
