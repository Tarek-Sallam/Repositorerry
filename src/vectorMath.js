import { planets, m } from './createScene.js'
import { scales } from './dynamicScale.js'

// adds two vectors
const addVectors = (v1, v2) => {
    return [v1[0] + v2[0], v1[1] + v2[1], v1[2] + v2[2]]
}

// scales a vector by a factor of k
const scaleVector = (k, v) => {
    return [v[0] * k, v[1] * k, v[2] * k]
}

export const initializeAnimData = (orbits) => {
    const framesPerSecond = 60;
    
    let anim_data = {}
    for (const [key, value] of Object.entries(orbits)) {
        let ts = value.time_scale;
        let n_keyframes = value.positions.length;
        //let w = (m["m"]) / (framesPerSecond*ts);
        let current_index = 0;
        let distance = 0;
        let x;
        if (key in scales) {
            x = scales[key];
        } else {
            x = scales["default"];
        }

        anim_data[key] = {"ts": ts, "m": m, "current_index": current_index, "distance": distance, "n_keyframes": n_keyframes, "space_scaling": x}
    }

    return anim_data
}

export const animateOrbits = (orbits, anim_data) => {
    for (const [p_name, planet] of Object.entries(planets)) {
        // get all the attributes
        let m = anim_data[p_name].m.m;
        let ts = anim_data[p_name].ts;
        let w = m/(ts*60);
        let cur = anim_data[p_name].current_index;
        let n_keyframes = anim_data[p_name].n_keyframes;
        let dist = anim_data[p_name].distance;
        let p = orbits[p_name].positions
        let relative_to = orbits[p_name].relative_to;
        let x = anim_data[p_name].space_scaling;
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
        if (relative_to in planets) 
            {
            p = planets[relative_to].sphere.position;
            // relative_p = addVectors([p.x, p.y, p.z], next_position_v);
            relative_p = [p.x, p.y, p.z] ;
            }
             else 
             {
                relative_p = relative_to;
            }
        next_position_v = addVectors(relative_p, scaleVector(x, next_position_v));
        next_position_v = [next_position_v[0], next_position_v[2], next_position_v [1]];
        planet.sphere.position.fromArray(next_position_v); 

        planet.floatingText.position.fromArray([next_position_v[0] + planet.textOffset, next_position_v[1]  +planet.textOffset, next_position_v[2] +2  ])

        // textInfo[p_name].position.fromArray([next_position_v[0] + 2 , next_position_v[1] + 2 , next_position_v[2]  ]);

        anim_data[p_name].distance = dist;
        anim_data[p_name].current_index = cur;
    }
}

// don't know what this comment is for
// vector addition to interpolate between current position and next position of a factor of w
