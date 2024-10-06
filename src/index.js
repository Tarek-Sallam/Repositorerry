import { updatePov, onKeyDown, onKeyUp } from './userControls';
import { renderer, scene, camera } from './createScene';
import { initializeAnimData, animateOrbits } from './vectorMath';

let orbits;

async function initialize() {
    try {
        const response = await fetch('../public/data/orbits.json');
        orbits = await response.json();
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
