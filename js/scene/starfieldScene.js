function launchStarfieldScene() {
  if (typeof THREE === 'undefined') {
    console.log("THREE.js not ready, waiting...");
    setTimeout(launchStarfieldScene, 100);
    return;
  }
  
  const container = document.getElementById('starfield-container');
  
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor(0x000022); // Dark space background
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 10;

  scene.add(new THREE.AmbientLight(0xffffff, 0.5));

  // Star creation (round + streak) - your original counts and settings
  const starCount = 2000;
  const roundGeometry = new THREE.Geometry();
  const streakGeometry = new THREE.Geometry();
  const roundVelocities = [];
  const streakVelocities = [];

  for (let i = 0; i < starCount; i++) {
    const x = (Math.random() - 0.5) * 200;
    const y = (Math.random() - 0.5) * 200;
    const z = (Math.random() - 0.5) * 200;

    const h = Math.random();
    const color = new THREE.Color().setHSL(h, 1, 0.6);

    // Round stars
    const roundVertex = new THREE.Vector3(x, y, z);
    roundGeometry.vertices.push(roundVertex);
    roundGeometry.colors.push(color);
    roundVelocities.push({ x: 0, y: 0, z: -Math.random() * 0.3 - 0.1 });

    // Streak stars  
    const streakVertex = new THREE.Vector3(x, y, z);
    streakGeometry.vertices.push(streakVertex);
    streakGeometry.colors.push(color);
    streakVelocities.push({ x: 0, y: 0, z: -Math.random() * 2.2 - 1.0 });
  }

  // Materials with your original settings
  
  const roundMaterial = new THREE.ParticleBasicMaterial({
    size: 2.2,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
    vertexColors: true
  });

  const streakMaterial = new THREE.ParticleBasicMaterial({
    size: 4.0,
    transparent: true,
    opacity: 0.95,
    blending: THREE.AdditiveBlending,
    vertexColors: true
  });

  const roundStars = new THREE.ParticleSystem(roundGeometry, roundMaterial);
  const streakStars = new THREE.ParticleSystem(streakGeometry, streakMaterial);
  scene.add(roundStars);
  scene.add(streakStars);

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  function animateStars() {
    // Animate round stars
    for (let i = 0; i < roundGeometry.vertices.length; i++) {
      const vertex = roundGeometry.vertices[i];
      vertex.x += roundVelocities[i].x;
      vertex.y += roundVelocities[i].y;
      vertex.z += roundVelocities[i].z;
      
      if (vertex.z < -300) {
        vertex.x = (Math.random() - 0.5) * 200;
        vertex.y = (Math.random() - 0.5) * 200;
        vertex.z = 10;
      }
    }

    // Animate streak stars
    for (let i = 0; i < streakGeometry.vertices.length; i++) {
      const vertex = streakGeometry.vertices[i];
      vertex.x += streakVelocities[i].x;
      vertex.y += streakVelocities[i].y;
      vertex.z += streakVelocities[i].z;
      
      if (vertex.z < -300) {
        vertex.x = (Math.random() - 0.5) * 200;
        vertex.y = (Math.random() - 0.5) * 200;
        vertex.z = 10;
      }
    }

    roundGeometry.verticesNeedUpdate = true;
    streakGeometry.verticesNeedUpdate = true;
  }

  function animate() {
    requestAnimationFrame(animate);
    animateStars();
    renderer.render(scene, camera);
  }

  animate();
}

window.launchStarfieldScene = launchStarfieldScene;