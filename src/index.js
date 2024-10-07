import { updatePov, onKeyDown, onKeyUp } from './userControls';
import { animateOrbits } from './vectorMath';
import { orbits, anim_data } from './createScene';
import { composer, renderer, scene } from './createScene';

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
    composer.render();    
}

await new Promise(r => setTimeout(r, 100));

const main = async () => 
{
    // Event listeners
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    // console.log(animate)
    renderer.setAnimationLoop(animate);
}

main();
