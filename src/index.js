import { updatePov, onKeyDown, onKeyUp } from './userControls';
import { renderer, planets, scene, camera, controls } from './createScene';
import { planetParams } from './planetData';

// TODO:
// implement controls to move up and down ✓
// create space boundary so user can't go too far out
// make it so that user can't go through planets
// make saturn's rings look good
// implement controls for user to move faster if desired
// translit orbit data into actual orbits
// make smooth animations for the orbits
// make orbit controls not mess up the keyboard controls ✓

let orbits;

fetch('../public/data/orbits.json')
  .then(response => response.json())
  .then(data => {    
    orbits = data;
    console.log(orbits)
  });

const animate = () => {
    
    // controls.update(); 

    planets.forEach((planet, i) => {
        planet.rotation.y += planetParams[i].rotationSpeed;
    })

    updatePov();

	renderer.render(scene, camera);
}

// Event listeners
document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

renderer.setAnimationLoop(animate);



// up left
    // const right = +0.01
    // const left = 
    // const up;
    // const down;
    // planets[1].position.x -= 0.01
    // planets[1].position.z -= 0.01

    // down left
    // planets[1].position.x -= 0.01
    // planets[1].position.z += 0.01

    // down right
    // planets[1].position.x += 0.01
    // planets[1].position.z += 0.01

    // up right
    // planets[1].position.x += 0.01
    // planets[1].position.z -= 0.01