import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { ArrayCamera } from 'three';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const threejsCanvas = document.querySelector('#bg')
const renderer = new THREE.WebGL1Renderer({canvas: document.querySelector('#bg')})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({color:0xFF6347});
const torus =  new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLigth = new THREE.PointLight(0xffffff);
pointLigth.position.set(5,5,5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLigth, ambientLight);


function addStar(){
    const geometry = new THREE.SphereGeometry(0.25, 24,24);
    const material = new THREE.MeshStandardMaterial({color:0xffffff});
    const star = new THREE.Mesh(geometry, material);

    const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
    star.position.set(x,y,z);
    scene.add(star);
}

Array(200).fill().forEach(addStar);

//Main Background 

const spaceTexture = new THREE.TextureLoader().load('/assets/space.jpg');
console.log("path:", 'space.jpg');
scene.background = spaceTexture;


//Avatar
const avatarTexture = new THREE.TextureLoader().load('/assets/profile.jpg');

const avatar = new THREE.Mesh(
    new THREE.BoxGeometry(3,3,3),
    new THREE.MeshBasicMaterial({map:avatarTexture}),
);

scene.add(avatar)

//Earth

const earthTexture = new THREE.TextureLoader().load('/assets/earth_nightmap.jpg');


const earth = new THREE.Mesh(
    new THREE.SphereGeometry(3,32,32),
    new THREE.MeshBasicMaterial({
        map:earthTexture,
    })
);

scene.add(earth);

earth.position.z = 30;
earth.position.x = -10;

avatar.position.z = -5;
avatar.position.x = 2;


//Mars

const marsTexture = new THREE.TextureLoader().load('/assets/mars.jpg');


const mars = new THREE.Mesh(
    new THREE.SphereGeometry(3,35,35),
    new THREE.MeshBasicMaterial({
        map: marsTexture,
    })
);

scene.add(mars);

mars.position.z = 50;
mars.position.x = -10;

//Helpers
/*
const lightHelper = new THREE.PointLightHelper(pointLigth);
const earthligthHelper  = new THREE.PointLightHelper(earthpointLigth);
const gridHelper = new THREE.GridHelper(200,50);
scene.add(earthligthHelper,lightHelper,gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);
*/


function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    
    avatar.rotation.y += 0.02;
    avatar.rotation.z += 0.01;


    earth.rotation.x += 0.05;
    earth.rotation.y += 0.075;
    earth.rotation.z += 0.05;
  
    mars.rotation.x += 0.06;
    mars.rotation.y += 0.090;
    mars.rotation.z += 0.06;


  
    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.rotation.y = t * -0.0002;
  }

document.body.onscroll = moveCamera;
moveCamera();


function animate(){
    requestAnimationFrame(animate);

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    //controls.update();

    

    renderer.render(scene, camera);
}

animate();
