document.addEventListener('DOMContentLoaded', () => {
  // Load the final polish stylesheet once across the portfolio.
  if (!document.querySelector('link[href="polish.css"]')) {
    const polishStyles = document.createElement('link');
    polishStyles.rel = 'stylesheet';
    polishStyles.href = 'polish.css';
    document.head.appendChild(polishStyles);
  }

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const projectPages = new Set([
    'projects.html',
    'help_desk.html',
    'home_network.html',
    'pc-build-report.html',
    'alienware_upgrade.html',
    'capstone_project.html',
    'games.html'
  ]);

  // Give every project detail page an obvious path back to the Projects hub.
  if (projectPages.has(currentPage) && currentPage !== 'projects.html') {
    const mainContainer = document.querySelector('main .container');
    if (mainContainer && !mainContainer.querySelector('.back-to-projects')) {
      const backLink = document.createElement('a');
      backLink.href = 'projects.html';
      backLink.className = 'back-to-projects';
      backLink.textContent = '← Back to Projects';
      mainContainer.insertBefore(backLink, mainContainer.firstChild);
    }
  }

  // Make the Help Desk project the clear featured item on the Projects page.
  if (currentPage === 'projects.html') {
    const helpDeskButton = document.querySelector('a[href="help_desk.html"].button');
    const helpDeskSection = helpDeskButton?.closest('.section');

    if (helpDeskSection) {
      helpDeskSection.classList.add('featured-project');
      if (!helpDeskSection.querySelector('.featured-badge')) {
        const badge = document.createElement('span');
        badge.className = 'featured-badge';
        badge.textContent = 'Featured Work';
        helpDeskSection.insertBefore(badge, helpDeskSection.firstChild);
      }
    }
  }

  // Make external links and downloads clearer without adding visual clutter.
  document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.classList.add('external-link');
    if (!link.querySelector('.sr-only')) {
      const note = document.createElement('span');
      note.className = 'sr-only';
      note.textContent = ' (opens in a new tab)';
      link.appendChild(note);
    }
  });

  document.querySelectorAll('a[download], button[onclick*=".docx"], button[onclick*=".xlsx"], button[onclick*=".pkt"]').forEach(control => {
    control.classList.add('download-action');
    if (!control.getAttribute('title')) {
      control.setAttribute('title', 'Downloads a file');
    }
  });

  const container = document.getElementById('threejs-container');

  if (container && typeof THREE !== 'undefined') {
    // Initialize Three.js scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0xefefef);
    container.appendChild(renderer.domElement);

    const shapes = [];
    const patrioticColors = [0xff0000, 0xffffff, 0x0000ff];
    const positions = [-8, 0, 8];

    const icosahedronGeometry = new THREE.IcosahedronGeometry(3, 0);
    const redMaterial = new THREE.MeshStandardMaterial({
      color: patrioticColors[0],
      metalness: 0.8,
      roughness: 0.3,
    });
    const icosahedron = new THREE.Mesh(icosahedronGeometry, redMaterial);
    icosahedron.position.set(0, positions[0], 0);
    shapes.push(icosahedron);
    scene.add(icosahedron);

    const torusKnotGeometry = new THREE.TorusKnotGeometry(2.5, 0.5, 100, 16);
    const whiteMaterial = new THREE.MeshStandardMaterial({
      color: patrioticColors[1],
      metalness: 0.9,
      roughness: 0.2,
    });
    const torusKnot = new THREE.Mesh(torusKnotGeometry, whiteMaterial);
    torusKnot.position.set(0, positions[1], 0);
    shapes.push(torusKnot);
    scene.add(torusKnot);

    const dodecahedronGeometry = new THREE.DodecahedronGeometry(3, 0);
    const blueMaterial = new THREE.MeshStandardMaterial({
      color: patrioticColors[2],
      metalness: 0.8,
      roughness: 0.3,
    });
    const dodecahedron = new THREE.Mesh(dodecahedronGeometry, blueMaterial);
    dodecahedron.position.set(0, positions[2], 0);
    shapes.push(dodecahedron);
    scene.add(dodecahedron);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    camera.position.z = 30;

    function animate() {
      requestAnimationFrame(animate);
      shapes.forEach((shape, index) => {
        shape.rotation.x += 0.01 * (index + 1);
        shape.rotation.y += 0.01 * (index + 1);
      });
      renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });
  }
});
