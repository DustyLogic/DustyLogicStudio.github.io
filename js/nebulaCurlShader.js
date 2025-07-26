import * as THREE from 'https://unpkg.com/three@0.164.0/build/three.module.js';

export function createCurlNebulaPlane() {
  const geometry = new THREE.PlaneGeometry(60, 60, 256, 256);

  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      opacity: { value: 0.4 }
    },
    vertexShader: `
      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform float opacity;
      varying vec2 vUv;

      float noise(vec2 p) {
        return fract(sin(dot(p , vec2(91.3, 53.7))) * 31845.5453);
      }

      void main() {
        vec2 center = vUv - 0.5;

        // 🌀 UV warping for animated swirl
        vec2 warpedUV = vUv + vec2(
          sin(time * 0.3 + vUv.y * 6.0) * 0.03,
          cos(time * 0.2 + vUv.x * 4.0) * 0.02
        );

        float n = noise(warpedUV * 6.0 + time * 0.1);
        float mist = smoothstep(0.25, 1.0, n);

        // 🌗 Radial fade for depth illusion
        float radial = length(center * vec2(1.5, 0.8));
        float falloff = 1.0 - smoothstep(0.3, 0.65, radial);
        mist *= falloff;

        // 🌈 Color and alpha
        vec3 glowColor = vec3(0.3, 1.0, 0.6); // Aqua mint haze
        vec3 color = glowColor * mist;
        float alpha = opacity * mist;

        gl_FragColor = vec4(color, alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.scale.set(2.5, 1.2, 1);              // Wide stretch
  mesh.position.set(0, -5, -30);            // Background placement
  mesh.rotation.x = -Math.PI / 3;           // Upward angle
  mesh.renderOrder = -1;
  mesh.visible = true;

  return { mesh, material };
}