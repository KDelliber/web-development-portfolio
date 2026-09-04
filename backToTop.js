document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.top-nav');

  if (nav) {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const projectPages = new Set(['projects.html', 'help_desk.html', 'home_network.html', 'pc-build-report.html', 'alienware_upgrade.html', 'capstone_project.html', 'games.html']);
    nav.innerHTML = `
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primaryNavLinks">Menu</button>
      <div class="nav-links" id="primaryNavLinks">
        <a href="index.html">Home</a>
        <a href="about_me.html">About Me</a>
        <a href="certifications.html">Certifications</a>
        <a href="Kenneth%20Delliber%20Jr%20Resume.pdf" target="_blank" rel="noopener">Résumé</a>
        <a href="projects.html">Projects</a>
        <a href="contact.html">Contact</a>
      </div>
    `;
    nav.setAttribute('aria-label', 'Primary navigation');

    const activeHref = projectPages.has(currentPage) ? 'projects.html' : currentPage;
    nav.querySelectorAll('.nav-links a').forEach(link => {
      if (link.getAttribute('href') === activeHref) link.setAttribute('aria-current', 'page');
    });

    const toggle = nav.querySelector('.nav-toggle');
    const closeMenu = () => {
      nav.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    };
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    nav.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        closeMenu();
        toggle.focus();
      }
    });
  }

  const footer = document.querySelector('footer');

  // Keep the AI-development disclosure consistent anywhere the shared footer script is used.
  if (footer && !footer.textContent.includes('Built with assistance from ChatGPT')) {
    const disclosure = document.createElement('p');
    disclosure.textContent = 'Built with assistance from ChatGPT for development, troubleshooting, and iteration.';
    const contactLine = Array.from(footer.querySelectorAll('p')).find(p => p.querySelector('a[href*="contact"]'));
    if (contactLine) {
      footer.insertBefore(disclosure, contactLine);
    } else {
      footer.appendChild(disclosure);
    }
  }

  let backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) {
    backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'backToTopBtn';
    backToTopBtn.textContent = 'Back to Top';
    document.body.appendChild(backToTopBtn);
  }

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  handleScroll();
});
