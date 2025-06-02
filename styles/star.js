const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000);
camera.position.z = 400; // Más lejos para ver el movimiento

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('stars-background').appendChild(renderer.domElement);

const starCount = 1500;
const positions = new Float32Array(starCount * 3);

// Inicializamos posiciones al azar en un rango más pequeño para el efecto
for (let i = 0; i < starCount; i++) {
  positions[i * 3] = (Math.random() - 0.5) * 800;  // X entre -400 y 400
  positions[i * 3 + 1] = (Math.random() - 0.5) * 600;  // Y entre -300 y 300
  positions[i * 3 + 2] = (Math.random() - 0.5) * 800;  // Z entre -400 y 400
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

// Para controlar movimiento individual de cada estrella, guardamos posiciones iniciales y velocidades
const starData = [];
for(let i = 0; i < starCount; i++){
  starData.push({
    xBase: positions[i * 3],         // Posición inicial X
    y: positions[i * 3 + 1],         // Posición inicial Y
    z: positions[i * 3 + 2],         // Posición inicial Z
    speedY: 0.005 + Math.random() * 0.2,  // Velocidad vertical
    phase: Math.random() * Math.PI * 2, // Para movimiento oscilatorio X
    speedPhase: 0.0005 + Math.random() * 0.003  // Velocidad oscilatoria X
  });
}

function animate() {
    requestAnimationFrame(animate);

    const positions = starsGeometry.attributes.position.array;

    for(let i = 0; i < starCount; i++){
        const data = starData[i];

        // Movimiento vertical (hacia arriba)
        data.y += data.speedY;
        if(data.y > 300) data.y = -300;  // Si pasa arriba, vuelve abajo

        // Movimiento oscilatorio lateral (X)
        data.phase += data.speedPhase;
        const xOsc = Math.sin(data.phase) * 400; // oscila entre -400 y 400

        // Actualizar posiciones
        positions[i * 3] = xOsc;
        positions[i * 3 + 1] = data.y;
        // Opcional: pequeño movimiento en Z para efecto profundidad (puedes ajustar o quitar)
        positions[i * 3 + 2] = data.z;

    }
    starsGeometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
}

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const stars = document.getElementById("stars-background");
    stars.style.transform = `translateY(${scrollY * 0.2}px)`; // cambia 0.2 para ajustar profundidad
});

animate();