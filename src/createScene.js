import * as THREE from 'three';
import { planetParams } from './planetData';
import { addSphere } from './addSphere';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createInfoBox } from './dataBox';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { FXAAShader } from 'three/addons/shaders/FXAAShader.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const backgroundTexture = new THREE.TextureLoader().load(`${import.meta.env.BASE_URL}textures/black-sky-with-few-stars.webp`);
scene.background = backgroundTexture;
scene.background.colorSpace = THREE.SRGBColorSpace;

const orbitControls = new OrbitControls(camera, renderer.domElement);

// setting initial camera position so that we can hit space and fly back to it
const initialCameraPosition = new THREE.Vector3(5, 30, 15);
camera.position.copy(initialCameraPosition);
camera.lookAt(0, 0, 0);

const planets = {}

// create a new effect composer
const composer = new EffectComposer(renderer);

// create a new renderPass
const renderPass = new RenderPass(scene, camera);

// create a new FXAA shader pass
const fxaaPass = new ShaderPass(FXAAShader);

// create a new output pass
const outputPass = new OutputPass();

// get the pixel ratio of the renderer
const pixelRatio = renderer.getPixelRatio();

// fxaa config settings

// bloom pass before configuration
const bloomPass = new UnrealBloomPass(
    new THREE.Vector3(window.innerWidth, window.innerHeight),
    0.3,
    0.9,
    0.1,
);

// adding passes to composer
composer.addPass(renderPass);
composer.addPass(bloomPass);
composer.addPass(fxaaPass);
composer.addPass(outputPass);


const light = new THREE.PointLight(new THREE.Color(0xffffff), 10, 1000, 0.2)
scene.add(light);

// Loop where we create the planet objects
for (let planetParamsSingle of planetParams) {
    planets[planetParamsSingle.name] = addSphere(planetParamsSingle, scene);
    //console.log(planets)
}

createInfoBox();
export {composer, renderer, planets, scene, camera, initialCameraPosition, orbitControls}