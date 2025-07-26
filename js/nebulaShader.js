import * as THREE from 'three';

export function createNebulaPlane() {
  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
  varying vec2 vUv;
  uniform float time;
  uniform float alpha;

  float noise(vec2 p){
    return fract(sin(dot(p ,vec2(12.9898,78.233))) * 43758.5453);
  }

  void main() {
    vec2 uv = vUv;
    float n = noise(uv * 10.0 + time * 0.2);

    float dist = distance(uv, vec2(0.5));
    float fade = 1.0 - smoothstep(0.3, 0.8, dist);

    vec3 color = vec3(0.22, 1.0, 0.56) * n * fade;
    gl_FragColor = vec4(color, pow(n * fade, 2.0) * alpha); // Now using the uniform!
  }
`;


  const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
 uniforms: {
  time: { value: 0 },
  alpha: { value: 0.4 }
},
  transparent: true,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
  depthTest: false,
  side: THREE.DoubleSide // <-- add this line
});

  const geometry = new THREE.PlaneGeometry(150, 150);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.z = -10;
  mesh.scale.set(3.5, 3.5, 2); // large enough to fill view
  mesh.rotation.z = Math.PI / 4;

  return { mesh, material };
}