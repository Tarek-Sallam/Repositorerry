import { updatePov, onKeyDown, onKeyUp } from './userControls';
import { renderer, scene, camera } from './createScene';
import { initializeAnimData, animateOrbits } from './vectorMath';

import * as THREE from 'three';
import {scales} from "./dynamicScale"

let orbits;

async function initialize() {
    try {
        const response = await fetch('../public/data/orbits.json');
        orbits = await response.json();

        const ellipsePoints = {}
        Object.entries(orbits).forEach(([key, value]) =>
        {


            ellipsePoints.key = value.positions.map( function(item) 
            {
                return( new THREE.Vector3(item[0] * scales[key], item[1] *scales[key], item[2] *scales[key]) );
            } )

            if (key == "Sun")
            {
                return;
            }

            const ellipseGeometry = new THREE.BufferGeometry().setFromPoints( ellipsePoints.key );

            const ellipseMaterial = new THREE.LineBasicMaterial( { color: 0xff0000 } );
            // Create the final object to add to the scene
            const ellipse = new THREE.Line( ellipseGeometry, ellipseMaterial );

            scene.add(ellipse)

        } );

        //
        return true;
    } catch (error) {
        console.error('Error loading orbits data:', error);
        return false;
    }
}

const main = () => {
    let anim_data = initializeAnimData(orbits)
    
    const animate = () => {
        animateOrbits(orbits, anim_data)

        updatePov()

        renderer.render(scene, camera);
    }

    // Event listeners
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    renderer.setAnimationLoop(animate);
}

async function startApp() {
    const initialized = await initialize();
    if (initialized) {
        main();
    } else {
        console.error('Failed to initialize the application');
    }
}

startApp();
