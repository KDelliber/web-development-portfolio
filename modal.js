document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('threejs-container');

  if (container) {
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
    renderer.setClearColor(0xefefef); // Sidebar background color
    container.appendChild(renderer.domElement);

    // Define shapes, patriotic colors, and positions
    const shapes = [];
    const patrioticColors = [0xff0000, 0xffffff, 0x0000ff]; // Red, White, Blue
    const positions = [-8, 0, 8]; // Adjusted positions

    // Shape 1: Icosahedron (Red)
    const icosahedronGeometry = new THREE.IcosahedronGeometry(3, 0);
    const redMaterial = new THREE.MeshStandardMaterial({
      color: patrioticColors[0], // Red
      metalness: 0.8,
      roughness: 0.3,
    });
    const icosahedron = new THREE.Mesh(icosahedronGeometry, redMaterial);
    icosahedron.position.set(0, positions[0], 0);
    shapes.push(icosahedron);
    scene.add(icosahedron);

    // Shape 2: Torus Knot (White)
    const torusKnotGeometry = new THREE.TorusKnotGeometry(2.5, 0.5, 100, 16);
    const whiteMaterial = new THREE.MeshStandardMaterial({
      color: patrioticColors[1], // White
      metalness: 0.9,
      roughness: 0.2,
    });
    const torusKnot = new THREE.Mesh(torusKnotGeometry, whiteMaterial);
    torusKnot.position.set(0, positions[1], 0);
    shapes.push(torusKnot);
    scene.add(torusKnot);

    // Shape 3: Dodecahedron (Blue)
    const dodecahedronGeometry = new THREE.DodecahedronGeometry(3, 0);
    const blueMaterial = new THREE.MeshStandardMaterial({
      color: patrioticColors[2], // Blue
      metalness: 0.8,
      roughness: 0.3,
    });
    const dodecahedron = new THREE.Mesh(dodecahedronGeometry, blueMaterial);
    dodecahedron.position.set(0, positions[2], 0);
    shapes.push(dodecahedron);
    scene.add(dodecahedron);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Soft light
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Adjust camera position
    camera.position.z = 30; // Fit all shapes into view

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      shapes.forEach((shape, index) => {
        shape.rotation.x += 0.01 * (index + 1);
        shape.rotation.y += 0.01 * (index + 1);
      });
      renderer.render(scene, camera);
    }

    animate();

    // Handle window resizing
    window.addEventListener('resize', () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });
  }
});
