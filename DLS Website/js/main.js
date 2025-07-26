import * as THREE from 'https://unpkg.com/three@0.164.0/build/three.module.js';
import { createStarField } from './stars.js';
import { createCurlNebulaPlane } from './nebulaCurlShader.js';

const container = document.getElementById('scene-container');

// 🎬 Core Setup
const scene = new THREE.Scene();
scene.background = null;

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// 💡 Ambient Glow
scene.add(new THREE.AmbientLight(0xffffff, 0.5));

// ✨ Starfield
const { stars, starGeometry, starSpeeds } = createStarField();
stars.renderOrder = 1; // render after mist
scene.add(stars);


// 🌫️ Nebula Shader
const { mesh: nebulaMesh, material: nebulaMaterial } = createCurlNebulaPlane();
nebulaMesh.renderOrder = -1; // render before particles
scene.add(nebulaMesh);

// 🔧 Responsive Canvas
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// 🌀 Animation Loop
function animate() {
  requestAnimationFrame(animate);
  
  nebulaMaterial.uniforms.time.value += 0.01;

  // Color Pulse
  const colors = starGeometry.attributes.color.array;
  for (let i = 0; i < colors.length; i += 3) {
    const h = (colors[i] + starSpeeds[i / 3]) % 1;
    const newColor = new THREE.Color().setHSL(h, 1, 0.6);
    colors[i] = newColor.r;
    colors[i + 1] = newColor.g;
    colors[i + 2] = newColor.b;
  }
  starGeometry.attributes.color.needsUpdate = true;

  // Star Drift
  const positions = starGeometry.attributes.position.array;
  for (let i = 0; i < positions.length; i += 3) {
    positions[i + 2] += 0.2;
    if (positions[i + 2] > 10) {
      positions[i] = (Math.random() - 0.5) * 200;
      positions[i + 1] = (Math.random() - 0.5) * 120;
      positions[i + 2] = -300 + Math.random() * 250;
    }
  }
  starGeometry.attributes.position.needsUpdate = true;

  // Camera Float
  const time = Date.now() * 0.0005;
  camera.position.z = 10 + Math.sin(time) * 1.2;
  camera.position.x = Math.sin(time * 1.5) * 0.8;
  camera.lookAt(0, 0, 0);

  renderer.render(scene, camera);
}
animate();