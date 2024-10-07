import * as THREE from 'three';
import { camera, initialCameraPosition, orbitControls, planets } from './createScene';
import { following } from './dataBox.js'

// this is the state that holds all the current pressed keys, if multiple keys are pressed, multi-directional movements are allowed
const keyStates = {};

const povMoveSpeed = 0.2;
const povRotationSpeed = 0.03;
const euler = new THREE.Euler(0, 0, 0, 'YXZ');

// this boundary will not let the user leave after a certain distance
// todo

export const onKeyDown = (event) => {
    keyStates[event.code] = true;

    // console.log(event.code)
    
    if (event.code === 'Space') {
        resetPov();
    }
}

export const onKeyUp = (event) => {
    // this if block fixes bug where pressing command and arrow key makes it move forever
    if (event.code === 'MetaLeft' || event.code === 'MetaRight') {
        for (const key in keyStates) {
            keyStates[key] = false;
        }
    }
    
    keyStates[event.code] = false;
}

const resetPov = () => {
    camera.position.copy(initialCameraPosition);
    camera.lookAt(0, 0, 0);
    //euler.set(initialCameraPosition);
    //camera.quaternion.setFromEuler(euler);
}

export const updatePov = () => {
    if (following === "Default") {
        let moved = false;

        euler.setFromQuaternion(camera.quaternion, 'YXZ');

        const shiftPressed = keyStates['ShiftLeft'] || keyStates['ShiftRight'];
        const tabPressed = keyStates['Tab']



        if (shiftPressed) {
            // Rotate the camera
            if (keyStates['ArrowLeft']) euler.y += povRotationSpeed;
            if (keyStates['ArrowRight']) euler.y -= povRotationSpeed;
            if (keyStates['ArrowUp']) euler.x += povRotationSpeed;
            if (keyStates['ArrowDown']) euler.x -= povRotationSpeed;

            // Clamp vertical rotation to avoid over-rotation
            euler.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, euler.x));

            // Apply rotation to camera
            camera.quaternion.setFromEuler(euler);

            // moved = true;
        } else if (tabPressed) {
            
            if (keyStates['ArrowUp']) camera.position.y += povMoveSpeed;
            if (keyStates['ArrowDown']) camera.position.y -= povMoveSpeed;

            // moved = true;
        } else {
            // Move in world space
            const direction = new THREE.Vector3();
            camera.getWorldDirection(direction);
            const right = new THREE.Vector3();
            right.crossVectors(camera.up, direction).normalize();

            if (keyStates['ArrowLeft']) camera.position.addScaledVector(right, povMoveSpeed);
            if (keyStates['ArrowRight']) camera.position.addScaledVector(right, -povMoveSpeed);
            if (keyStates['ArrowUp']) camera.position.addScaledVector(direction, povMoveSpeed);
            if (keyStates['ArrowDown']) camera.position.addScaledVector(direction, -povMoveSpeed);

            // moved = true;
        }

        for (const key in keyStates) {
            if (keyStates[key] === true) {
                moved = true;    
            } 
        }
        
        if (moved) {
            const newDirection = new THREE.Vector3();
            camera.getWorldDirection(newDirection);
        
            orbitControls.target.copy(camera.position).add(newDirection.multiplyScalar(10));
            orbitControls.update();
        }
    }
    else {
        let pos = planets[following].sphere.position;
        let xyz = new THREE.Vector3(pos.x + 10, pos.y + 10, pos.z + 10)
        camera.position.copy(xyz);
        camera.lookAt(pos);
        // const newDirection = new THREE.Vector3(pos[0], pos[1], pos[2]);
        // camera.getWorldDirection(newDirection);
    
        // orbitControls.target.copy(camera.position).add(newDirection.multiplyScalar(10));
        // orbitControls.update();
    }
}