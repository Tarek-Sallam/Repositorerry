import * as THREE from 'three';
import { camera } from './createScene';

// this is the state that holds all the current pressed keys, if multiple keys are pressed, multi-directional movements are allowed
const keyStates = {};

const povMoveSpeed = 0.1;
const povRotationSpeed = 0.02;
const euler = new THREE.Euler(0, 0, 0, 'YXZ');

// this boundary will not let the user leave after a certain distance
// todo

export const onKeyDown = (event) => {
    keyStates[event.code] = true;
    if (event.code === 'Space') {
        resetPov();
    }
}

export const onKeyUp = (event) => {
    keyStates[event.code] = false;
}

const resetPov = () => {
    camera.position.copy(initialCameraPosition);
    euler.set(0, 0, 0);
    camera.quaternion.setFromEuler(euler);
}

export const updatePov = () => {
    const shiftPressed = keyStates['ShiftLeft'] || keyStates['ShiftRight'];

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
    }
}