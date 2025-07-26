import * as THREE from 'https://unpkg.com/three@0.164.0/build/three.module.js';
import { createStarField } from './stars.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.164.0/examples/jsm/loaders/GLTFLoader.js';

export function launchScene() {
  const container = document.getElementById('scene-container');

  const scene = new THREE.Scene();
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

  scene.add(new THREE.AmbientLight(0xffffff, 0.5));

  const {
    roundStars, streakStars,
    roundGeometry, streakGeometry,
    roundVelocities, streakVelocities
  } = createStarField();

  scene.add(roundStars);
  scene.add(streakStars);

  const loader = new GLTFLoader();
  loader.load('models/mechwBrain.glb', (gltf) => {
    const model = gltf.scene;
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.sub(center);
    model.position.z += 50;
    model.scale.set(2.5, 2.5, 2.5);
    scene.add(model);
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  function animate() {
    requestAnimationFrame(animate);

    const roundPos = roundGeometry.attributes.position.array;
    const streakPos = streakGeometry.attributes.position.array;

    for (let i = 0; i < roundPos.length; i += 3) {
      const index = i / 3;
      roundPos[i]     += roundVelocities[index].x;
      roundPos[i + 1] += roundVelocities[index].y;
      roundPos[i + 2] += roundVelocities[index].z;

      if (roundPos[i + 2] < -300) {
        roundPos[i]     = (Math.random() - 0.5) * 200;
        roundPos[i + 1] = (Math.random() - 0.5) * 200;
        roundPos[i + 2] = 10;
      }
    }

    for (let i = 0; i < streakPos.length; i += 3) {
      const index = i / 3;
      streakPos[i]     += streakVelocities[index].x;
      streakPos[i + 1] += streakVelocities[index].y;
      streakPos[i + 2] += streakVelocities[index].z;

      if (streakPos[i + 2] < -300) {
        streakPos[i]     = (Math.random() - 0.5) * 200;
        streakPos[i + 1] = (Math.random() - 0.5) * 200;
        streakPos[i + 2] = 10;
      }
    }

    roundGeometry.attributes.position.needsUpdate = true;
    streakGeometry.attributes.position.needsUpdate = true;

    const time = Date.now() * 0.0005;
    camera.position.z = 10 + Math.sin(time) * 1.2;
    camera.position.x = Math.sin(time * 1.5) * 0.8;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }

  animate();
}