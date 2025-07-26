export function loadModel(scene) {
  const loader = new GLTFLoader();
  loader.load('models/mechwBrain.glb', (gltf) => {
    const model = gltf.scene;
    // Center + shift forward
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.sub(center);
    model.position.z += 50;
    model.scale.set(2.5, 2.5, 2.5);
    scene.add(model);
  });
}