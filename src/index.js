import { updatePov, onKeyDown, onKeyUp } from './userControls';
import { renderer, planets, scene, camera, controls } from './createScene';
import { planetParams } from './planetData';

// TODO: move up and down
// TODO: create space boundary
// TODO: can't go through planets
// TODO: saturn rings (planet rings)
// TODO: restructure code into different files
// TODO: move faster with holding comand
let orbits;

const getOrbits = async () => {
    fetch('../public/data/orbits.json')
        .then(response => {
            return response.json(); 
        })
        .then(data => {
            orbits = data;
            console.log(orbits)
        })
        .then(()=>{
            main()
        })
}

const addVectors = (v1, v2) => {
    return [v1[0] + v2[0], v1[1] + v2[1], v1[2] + v2[2]]
}

const scaleVector = (k, v) => {
    v[0] *= k
    v[1] *= k
    v[2] *= k
}


const main = () => {
    console.log(orbits)

    let currentFrame = 0;
    const framesPerSecond = 60;
    const m = 1;
    const ts = orbits['Mercury'].time_scale;
    const length = orbits['Mercury'].positions.length;
    const w = (ts * m) / framesPerSecond;
    let current = 0;
    console.log(ts, length)
    let p = orbits.Mercury.positions

    const animate = () => {
        
        planets.forEach((planet, i) => {
            planet.rotation.y += planetParams[i].rotationSpeed;
        })
        
        let next = p[current+1];
        
        // vector addition to interpolate between current position and next position of a factor of w
        let v = addVectors(scaleVector(w, (addVectors(p[next], scaleVector(-1, p[current])))), p[current])
        
        updatePov()

        renderer.render(scene, camera);

        // currentFrame++;
    }

    // Event listeners
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    renderer.setAnimationLoop( animate );
}

getOrbits();
