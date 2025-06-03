const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 400;

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('stars-background').appendChild(renderer.domElement);

const starCount = 1500;
const positions = new Float32Array(starCount * 3);

for (let i = 0; i < starCount; i++) {
  positions[i * 3] = (Math.random() - 0.5) * 800;
  positions[i * 3 + 1] = (Math.random() - 0.5) * 600;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 800;
}

const starsGeometry = new THREE.BufferGeometry();
starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const starsMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 1,
  transparent: true,
  opacity: 0.6
});

const starField = new THREE.Points(starsGeometry, starsMaterial);
scene.add(starField);

// Datos individuales para cada estrella
const starData = [];
for (let i = 0; i < starCount; i++) {
  starData.push({
    xBase: positions[i * 3],
    y: positions[i * 3 + 1],
    z: positions[i * 3 + 2],
    speedY: 0.005 + Math.random() * 0.2,
    phase: Math.random() * Math.PI * 2,
    speedPhase: 0.0005 + Math.random() * 0.003
  });
}

// Efecto scroll para parallax
let scrollOffset = 0;
window.addEventListener('scroll', () => {
  scrollOffset = window.scrollY;
});

function animate() {
  requestAnimationFrame(animate);

  const positions = starsGeometry.attributes.position.array;

  for (let i = 0; i < starCount; i++) {
    const data = starData[i];

    // Movimiento vertical
    data.y += data.speedY;
    let yScrollEffect = scrollOffset * 0.2;

    if (data.y + yScrollEffect > 300) {
      data.y = -300 - yScrollEffect;
    }

    // Movimiento lateral oscilatorio
    data.phase += data.speedPhase;
    const xOsc = Math.sin(data.phase) * 400;

    // Actualización de posiciones
    positions[i * 3] = xOsc;
    positions[i * 3 + 1] = data.y + yScrollEffect;
    positions[i * 3 + 2] = data.z;
  }

  starsGeometry.attributes.position.needsUpdate = true;
  renderer.render(scene, camera);
}

animate();
