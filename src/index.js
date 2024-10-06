import { updatePov, onKeyDown, onKeyUp } from './userControls';
import { renderer, planets, scene, camera, controls } from './createScene';
import { planetParams } from './planetData';

// TODO: move up and down
// TODO: create space boundary
// TODO: can't go through planets
// TODO: saturn rings (planet rings)
// TODO: restructure code into different files
// TODO: move faster with holding comand

const animate = () => {
    
    // controls.update(); 

    planets.forEach((planet, i) => {
        planet.rotation.y += planetParams[i].rotationSpeed;
    })

    updatePov()

	renderer.render(scene, camera);
}

// Event listeners
document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

renderer.setAnimationLoop( animate );

