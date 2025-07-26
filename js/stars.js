import * as THREE from 'https://unpkg.com/three@0.164.0/build/three.module.js';

export function createStarField() {
  const starCount = 2000;
  const roundPositions = [];
  const roundColors = [];
  const roundVelocities = [];

  const streakPositions = [];
  const streakColors = [];
  const streakVelocities = [];

  for (let i = 0; i < starCount; i++) {
    const x = (Math.random() - 0.5) * 200;
    const y = (Math.random() - 0.5) * 200;
    const z = (Math.random() - 0.5) * 200;

    const h = Math.random();
    const color = new THREE.Color().setHSL(h, 1, 0.6);

    roundPositions.push(x, y, z);
    roundColors.push(color.r, color.g, color.b);
    roundVelocities.push({ x: 0, y: 0, z: -Math.random() * 0.3 - 0.1 });

    streakPositions.push(x, y, z);
    streakColors.push(color.r, color.g, color.b);
    streakVelocities.push({ x: 0, y: 0, z: -Math.random() * 2.2 - 1.0 });
  }

  const textureLoader = new THREE.TextureLoader();
  const roundTexture = textureLoader.load('assets/star-round.png');
  const streakTexture = textureLoader.load('assets/star-streak.png');

  const roundGeometry = new THREE.BufferGeometry();
  roundGeometry.setAttribute('position', new THREE.Float32BufferAttribute(roundPositions, 3));
  roundGeometry.setAttribute('color', new THREE.Float32BufferAttribute(roundColors, 3));

  const streakGeometry = new THREE.BufferGeometry();
  streakGeometry.setAttribute('position', new THREE.Float32BufferAttribute(streakPositions, 3));
  streakGeometry.setAttribute('color', new THREE.Float32BufferAttribute(streakColors, 3));

  const roundMaterial = new THREE.PointsMaterial({
    size: 2.2,
    map: roundTexture,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    vertexColors: true,
  });

  const streakMaterial = new THREE.PointsMaterial({
    size: 4.0,
    map: streakTexture,
    transparent: true,
    opacity: 0.95,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    vertexColors: true,
  });

  const roundStars = new THREE.Points(roundGeometry, roundMaterial);
  const streakStars = new THREE.Points(streakGeometry, streakMaterial);

  return {
    roundStars,
    streakStars,
    roundGeometry,
    streakGeometry,
    roundVelocities,
    streakVelocities,
  };
}