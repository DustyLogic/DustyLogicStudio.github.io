import { createStarField } from './stars.js';

export function launchStarField(scene) {
  const {
    roundStars, streakStars,
    roundGeometry, streakGeometry,
    roundVelocities, streakVelocities
  } = createStarField();

  scene.add(roundStars);
  scene.add(streakStars);

  return function animateStars() {
    const roundPos = roundGeometry.attributes.position.array;
    const streakPos = streakGeometry.attributes.position.array;

    for (let i = 0; i < roundPos.length; i += 3) {
      const index = i / 3;
      roundPos[i] += roundVelocities[index].x;
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
      streakPos[i] += streakVelocities[index].x;
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
  };
}