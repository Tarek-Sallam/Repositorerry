import { updatePov, onKeyDown, onKeyUp } from './userControls';
import { renderer, scene, camera } from './createScene';
import { animateOrbits } from './vectorMath';
import { orbits, anim_data } from './createScene';

// let orbits;

// async function initialize() {
//     try {
//         const response = await fetch(`${import.meta.env.BASE_URL}data/orbits.json`);
//         orbits = await response.json();

//         return true;
//     } catch (error) {
//         console.error('Error loading orbits data:', error);
//         return false;
//     }
// }

function animate()
{
    // animateOrbits(orbits, anim_data, textInfo)
    animateOrbits(orbits, anim_data)
    updatePov()
    renderer.render(scene, camera);    
}

await new Promise(r => setTimeout(r, 100));

const main = async () => 
    {
        // const animate = () => 
        // {
        //     animateOrbits(orbits, anim_data, textInfo)
        //     updatePov()
        //     renderer.render(scene, camera);
        // }

    // Event listeners
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    // console.log(animate)
    renderer.setAnimationLoop(animate);
}

main();
// async function startApp() {
//     const initialized = await initialize();
//     if (initialized) {
//         main();
//     } else {
//         console.error('Failed to initialize the application');
//     }
// }

// startApp();

