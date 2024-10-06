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
            //console.log(orbits)
        })
        .then(()=>{
            main()
        })
}

// adds two vectors
const addVectors = (v1, v2) => {
    //console.log(v1);
    //console.log(v2);
    return [v1[0] + v2[0], v1[1] + v2[1], v1[2] + v2[2]]
}

// scales a vector by a factor of k
const scaleVector = (k, v) => {
    return [v[0] * k, v[1] * k, v[2] * k]
}


const main = () => {
    const framesPerSecond = 60;
    const m = 10; // time scaling factor (user)
    const x = 20; // space scaling factor
    //const ts = orbits['Mercury'].time_scale; // time scaling factor (planet position keyframes)
    //const n_keyframes = orbits['Mercury'].positions.length; // number of keyframes
    //const w = (ts * m) / framesPerSecond;
    //let current = 0;
    //console.log(ts, length)

    let anim_data = {}
    for (const [key, value] of Object.entries(orbits)) {
        let ts = value.time_scale;
        let n_keyframes = value.positions.length;
        let w = (m) / (framesPerSecond*ts);
        let current_index = 0;
        let distance = 0;
        anim_data[key] = {"w": w, "current_index": current_index, "distance": distance, "n_keyframes": n_keyframes}
    }

    const animate = () => {
        for (const [p_name, planet] of Object.entries(planets)) {
            // get all the attributes
            //console.log(anim_data);
            let w = anim_data[p_name].w;
            let cur = anim_data[p_name].current_index;
            let n_keyframes = anim_data[p_name].n_keyframes;
            let dist = anim_data[p_name].distance;
            let p = orbits[p_name].positions
            let relative_to = orbits[p_name].relative_to;
            // calculate the interpolation vector
            
            let next_position_v;
            if (dist + w >= 1) {
                cur = (cur + 1) % n_keyframes;
                dist = (dist + w) - 1;
            } else {
                dist += w;
            }
            let v = addVectors(p[(cur + 1) % n_keyframes], scaleVector(-1, p[cur]));
            next_position_v = addVectors(p[cur], scaleVector(dist, v));
            let relative_p;
            if (relative_to in planets) {
                p = planets[relative_to].position;
                //console.log(p)
                relative_p = addVectors([p.x, p.y, p.z], next_position_v);
            } else {
                relative_p = relative_to;
            }
            next_position_v = addVectors(relative_p, scaleVector(x, next_position_v));
            planet.position.fromArray(next_position_v);
            anim_data[p_name].distance = dist;
            anim_data[p_name].current_index = cur;

            //planet.rotation.y += planetParams[i].rotationSpeed;
        }
        
        // vector addition to interpolate between current position and next position of a factor of w
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
