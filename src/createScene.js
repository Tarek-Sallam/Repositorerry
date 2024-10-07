// import * as THREE from 'three';
// import { planetParams } from './planetData';
// import { addEllipses, addSphere } from './addModels';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// let orbits;

// async function getOrbitData() {
//     try {
//         const response = await fetch(`${import.meta.env.BASE_URL}data/orbits.json`);
//         orbits = await response.json();

//         return true;
//     } catch (error) {
//         console.error('Error loading orbits data:', error);
//         return false;
//     }
// }

// getOrbitData();

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// const backgroundTexture = new THREE.TextureLoader().load(`${import.meta.env.BASE_URL}textures/black-sky-with-few-stars.webp`);
// scene.background = backgroundTexture;
// scene.background.colorSpace = THREE.SRGBColorSpace;

// const orbitControls = new OrbitControls(camera, renderer.domElement);

// // setting initial camera position so that we can hit space and fly back to it
// const initialCameraPosition = new THREE.Vector3(5, 30, 15);
// camera.position.copy(initialCameraPosition);
// camera.lookAt(0, 0, 0);

// // Loop where we create the planet objects
// const planets = {}
// console.log(orbits)
// const ellipses = addEllipses(orbits, scene)
// const floatingNames = addFloatingNames(planetParams, scene)

// planetParams.forEach((planetParamsSingle, i) => {
//     planets[planetParamsSingle.name] = {
//         sphere: addSphere(planetParamsSingle, scene),
//         ellipse: ellipses[i],
//         floatingText: floatingNames[i],
//     }
// })

// console.log(planets)

// export {renderer, planets, scene, camera, initialCameraPosition, orbitControls}

import * as THREE from 'three';
import { planetParams } from './planetData';
import { addEllipses, addSphere, addFloatingNames } from './addModels';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { initializeAnimData } from './vectorMath';

let orbits;
let scene, camera, renderer, orbitControls, initialCameraPosition;
let anim_data;
let planets = {};

async function initScene() {
    try {
        await getOrbitData();
        anim_data = initializeAnimData(orbits)
        
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        const backgroundTexture = new THREE.TextureLoader().load(`${import.meta.env.BASE_URL}textures/black-sky-with-few-stars.webp`);
        scene.background = backgroundTexture;
        scene.background.colorSpace = THREE.SRGBColorSpace;

        orbitControls = new OrbitControls(camera, renderer.domElement);

        initialCameraPosition = new THREE.Vector3(5, 30, 15);
        camera.position.copy(initialCameraPosition);
        camera.lookAt(0, 0, 0);

        console.log(orbits);
        const ellipses = addEllipses(orbits, scene);
        const floatingNames = await addFloatingNames(planetParams, scene);

        console.log("floatingNames test: ", floatingNames)

        planetParams.forEach((planetParamsSingle, i) => {
            planets[planetParamsSingle.name] = {
                sphere: addSphere(planetParamsSingle, scene),
                ellipse: ellipses[i],
                floatingText: floatingNames[i],
            };
        });

        console.log(planets);

    } catch (error) {
        console.error('Error initializing scene:', error);
    }
}

async function getOrbitData() {
    try {
        const response = await fetch(`${import.meta.env.BASE_URL}data/orbits.json`);
        orbits = await response.json();
    } catch (error) {
        console.error('Error loading orbits data:', error);
        throw error;
    }
}

// Initialize the scene
initScene();

export { renderer, planets, scene, camera, initialCameraPosition, orbitControls, orbits, anim_data };