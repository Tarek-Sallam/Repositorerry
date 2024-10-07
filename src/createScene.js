
import * as THREE from 'three';
import { planetParams } from './planetData';
import { addEllipses, addSphere, addFloatingNames } from './addModels';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { initializeAnimData } from './vectorMath';
import { createInfoBox } from './dataBox';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { FXAAShader } from 'three/addons/shaders/FXAAShader.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

let orbits;
let composer, scene, camera, renderer, orbitControls, initialCameraPosition;
let anim_data;
let planets = {};
let track;


export async function initScene() {
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

        initialCameraPosition = new THREE.Vector3(0, 30, -30);
        camera.position.copy(initialCameraPosition);
        camera.lookAt(0, 0, 0);

            // create a new effect composer
        composer = new EffectComposer(renderer);

        // create a new renderPass
        const renderPass = new RenderPass(scene, camera);

        // create a new FXAA shader pass
        const fxaaPass = new ShaderPass(FXAAShader);

        // create a new output pass
        const outputPass = new OutputPass();

        // get the pixel ratio of the renderer

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

        createInfoBox();

        // console.log(orbits);
        const ellipses = addEllipses(orbits, scene);
        const floatingNames = await addFloatingNames(planetParams, scene);
        
        await new Promise(r => setTimeout(r, 500));

        planetParams.forEach((planetParamsSingle, i) => {
            planets[planetParamsSingle.name] = {
                sphere: addSphere(planetParamsSingle, scene),
                ellipse: ellipses[i],
                floatingText: floatingNames[i],
                textOffset: planetParamsSingle.textOffset,
                rotateY : planetParamsSingle.rotateParams[1]
            };
        });


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
//initScene();

export { composer, renderer, planets, scene, camera, initialCameraPosition, orbitControls, orbits, anim_data };
