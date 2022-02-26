import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000) 

const renderer = new THREE.WebGLRenderer({

  canvas: document.querySelector('#space'),

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

// const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(400, 50)
// scene.add(gridHelper)

const controls = new OrbitControls(camera, renderer.domElement)

function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh(geometry, material)

  const [x, y, z] = Array(3).fill().map( () => THREE.MathUtils.randFloatSpread( 500 ))

  star.position.set(x, y, z)

  scene.add(star)
}

Array(100).fill().forEach(addStar)

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({color: 0xA09BD8})
)
scene.add(moon)

// moon.position.setZ(30)
const orbitRadius = 30
let goForward = false 
let moonVar = 50

function animate(){
  requestAnimationFrame(animate)

  // sphere.rotation.x += 0.01
  // sphere.rotation.y += 0.01

  if (moonVar <= 50 && goForward == false){
    moonVar -= 0.01
    if (moonVar === 0){
      goForward = true
    }
  } 
  if (moonVar < 50 && goForward == true){
    moonVar += 0.01
    if (moonVar === 50){
      goForward = false
    }
  } 
  moon.position.set(
    Math.cos(moonVar) * orbitRadius,
    Math.sin(moonVar) * orbitRadius
  )

  controls.update()

  renderer.render(scene, camera)
}
animate()