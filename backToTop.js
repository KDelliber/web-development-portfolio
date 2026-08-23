document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.top-nav');

  if (nav) {
    nav.innerHTML = `
      <a href="index.html">Home</a>
      <a href="about_me.html">About Me</a>
      <a href="certifications.html">Certifications</a>
      <a href="Kenneth%20Delliber%20Resume.docx" download>Résumé</a>
      <a href="projects.html">Projects</a>
      <a href="contact.html">Contact</a>
    `;
  }

  let backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) {
    backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'backToTopBtn';
    backToTopBtn.textContent = 'Back to Top';
    document.body.appendChild(backToTopBtn);
  }

  const footer = document.querySelector('footer');

  const handleScroll = () => {
    backToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';

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

  window.addEventListener('scroll', handleScroll);

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  handleScroll();
});
