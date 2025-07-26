function launchModelScene() {
  console.log("=== MODEL SCENE DEBUG ===");
  console.log("Model scene starting...");
  
  if (typeof THREE === 'undefined') {
    setTimeout(launchModelScene, 100);
    return;
  }
  
  const container = document.getElementById('model-container');
  const scene = new THREE.Scene();
  
  const width = container.clientWidth || 400;
  const height = container.clientHeight || 300;
  
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 5; // Moved closer - was 10

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 1.0); // Dark semi-transparent background
  container.appendChild(renderer.domElement);

  // Brighter lighting to make model more visible
  scene.add(new THREE.AmbientLight(0x404040, 0.6)); // Increased from 0.4
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0); // Increased from 0.8
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  // Add a second light from the other side
  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight2.position.set(-5, -5, 5);
  scene.add(directionalLight2);

  let model;

  if (typeof THREE.SimpleOBJLoader !== 'undefined') {
    console.log("SimpleOBJLoader found! Attempting to load model...");
    const loader = new THREE.SimpleOBJLoader();
    
    loader.load(
      'models/Mechwbrain.obj',
      function(object) {
        console.log("SUCCESS: OBJ model loaded!", object);
        model = object;
        
        // Center the model
        const box = new THREE.Box3().setFromObject(model);
        const center = new THREE.Vector3();
        
        center.x = (box.max.x + box.min.x) / 2;
        center.y = (box.max.y + box.min.y) / 2;
        center.z = (box.max.z + box.min.z) / 2;
        
        model.position.sub(center);
            model.position.x += 0;    /* Left/right - negative = left, positive = right */
            model.position.y += -2;    /* Up/down - negative = down, positive = up */
            model.position.z += 0;    /* Forward/back - negative = back, positive = forward */
        model.scale.set(6.0, 6.0, 6.0); // Bigger scale - was 2.5
        
        // Make the model material more visible
        model.traverse(function(child) {
          if (child instanceof THREE.Mesh) {
            child.material = new THREE.MeshLambertMaterial({ 
              color: 0x00aaff,
              transparent: false, // Make it solid
              opacity: 1.0
            });
          }
        });
        
        scene.add(model);
        console.log("Model added to scene successfully!");
      },
      function(progress) {
        console.log("Loading progress:", progress);
      },
      function(error) {
        console.error("ERROR loading OBJ model:", error);
        createFallbackModel();
      }
    );
  } else {
    createFallbackModel();
  }

  function createFallbackModel() {
    console.log("Creating fallback model...");
    const geometry = new THREE.IcosahedronGeometry(2.0, 1); // Bigger fallback
    const material = new THREE.MeshLambertMaterial({ 
      color: 0x00aaff,
      transparent: false,
      opacity: 1.0
    });
    model = new THREE.Mesh(geometry, material);
    scene.add(model);
  }

  function animate() {
    requestAnimationFrame(animate);
    
    if (model) {
      model.rotation.y += 0.005;
      model.rotation.x += 0.000;
    }
    
    renderer.render(scene, camera);
  }

  animate();
}

window.launchModelScene = launchModelScene;