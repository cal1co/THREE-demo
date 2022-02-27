import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';



const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000) 

const renderer = new THREE.WebGLRenderer({

  canvas: document.querySelector('#sun'),

});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(100); 

// renderer.render(scene, camera)

const geometry = new THREE.SphereGeometry(15, 32, 16);
const material = new THREE.MeshToonMaterial({ color:0xF94F00, wireframe:false })
const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)

// renderer.render(scene, camera)


const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(100, 100, 100)
const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(ambientLight)


const gridHelper = new THREE.GridHelper(200,50) // shows us a level plane for perspective 
// scene.add(gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);


function addStar(){
  const geometry = new THREE.SphereGeometry(0.25,24,24); // create new sphere
  const material = new THREE.MeshStandardMaterial({color: 0xffffff}) // give this sphere a mesh
  const star = new THREE.Mesh(geometry, material) // initialise the stars 

  const [x, y, z] = Array(3).fill().map( () => THREE.MathUtils.randFloatSpread( 500 )) // create an array with length 3, then add a random float with max of 100 

  star.position.set(x, y, z); //set the x, y, z
  scene.add(star) // add to the scene 
}

Array(400).fill().forEach(addStar) // create an array of 200 and for each, call addStar

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({color: 0xA09BD8})
)
// moon.position.setZ(30)
scene.add(moon)

const orbitRadius = 30
let moonVar = 1


function animate(){ // recursive loop that renders the animation: game loop
  requestAnimationFrame(animate);

  if (moonVar <= 1){
    moonVar -= 0.01
  } 
  
  moon.position.set(
    Math.cos(moonVar) * orbitRadius,
    Math.sin(moonVar) * orbitRadius
  )

  controls.update()

  renderer.render(scene, camera);
}
animate()

