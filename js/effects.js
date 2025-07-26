import * as THREE from 'https://unpkg.com/three@0.164.0/build/three.module.js';

export function applyShimmerEffect(object) {
  object.traverse((child) => {
    if (child.isMesh) {
      const shimmerMaterial = new THREE.MeshStandardMaterial({
        color: 0xaaaaaa,
        emissive: 0x5500ff,
        emissiveIntensity: 0.6,
        metalness: 0.5,
        roughness: 0.3
      });
      child.material = shimmerMaterial;
    }
  });
}