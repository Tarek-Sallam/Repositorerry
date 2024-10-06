import * as THREE from 'three';


import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight(0xffffff)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200,50)

ambientLight.position.set(10,10,10)

scene.add(pointLight)

const controls = new OrbitControls(camera, renderer.domElement);

scene.add(pointLight, ambientLight)

// scene.add(lightHelper, gridHelper)

camera.position.z = 5;


//

const spaceTexture = new THREE.TextureLoader().load("./assets/8k_stars_milky_way.jpg") 

// console.log(spaceTexture )
scene.background = spaceTexture 
//

//

function addStar() 
{
	const geometry = new THREE.SphereGeometry(0.25, 24, 24);
	const material = new THREE.MeshStandardMaterial( {color:0xffffff } ) 
	const star = new THREE.Mesh(geometry, material);
	const [x,y,z] = [2,1,0]
	star.position.set(x,y,z)
	scene.add(star)
}

// const planetTexture = new THREE.TextureLoader().load("./assets/2k_mars.jpg") 

const texturePaths = {
	sun: "./assets/2k_sun.jpg",
	venus: "./assets/2k_venus_surface.jpg", 
	moon: "./assets/2k_moon.jpg",
	mars:"./assets/2k_mars.jpg",
	jupiter:"./assets/2k_jupiter.jpg", 
	earth: "./assets/2k_earth_daymap.jpg",
	mercury: "./assets/2k_mercury.jpg",
	saturn: "./assets/2k_saturn.jpg",
	uranus: "./assets/2k_uranus.jpg",
	neptune: "./assets/2k_neptune.jpg"
 }

 function loadTextures(texturePaths) 
 {

	const textures = {}
	Object.entries(texturePaths).forEach(([key, value]) => 
	{
		new THREE.TextureLoader().load(value, //  
			(texture) => {
				// This callback gets called when the texture is successfully loaded
				textures[key] = texture;
				// console.log(`${key} texture loaded`, texture); // Print loaded texture
			},
			undefined, // Optional: onProgress callback
			(err) => {
				console.error(`Error loading ${key} texture`, err); // Handle errors
			}
		);
			//)
	//   console.log(`${key}: ${value}`);
	});

	console.log(textures)
	return textures;
}

  const textures = loadTextures(texturePaths)

  await new Promise(r => setTimeout(r, 2000));

  const planetInfo = { 
	sun:
	{
		geometry: [6,24,24], 
		texture: textures.sun, 
		positionInit: [0,0,0], 
		positions: [[5,10,5], [0,0,0] ], 
		rotX: 0.02,
		rotY: -0.02,
		orbitParams: {
			a: 0.387098 ,      
			e:  0.2056,        
			i:  7.005 * (Math.PI / 180),    
			omega: 77.45779628  * (Math.PI / 180), 
			omegaNode: 49.57854 * (Math.PI / 180),
			M0: 174.796  * (Math.PI / 180),  // Mean anomaly at J2000 (radians)
			n: 4.0923344368 // Mean motion (rad/day)
		  }
	},
	mercury:
	{
		geometry: [3,24,24], 
		texture: textures.mercury, 
		positionInit: [5,10,5], 
		positions: [[5,10,5], [15,20,15] ], 
		rotX: 0.02,
		rotY: -0.02,
		orbitParams: {
			a: 0.387098 ,      
			e:  0.2056,        
			i:  7.005 * (Math.PI / 180),    
			omega: 77.45779628  * (Math.PI / 180), 
			omegaNode: 49.57854 * (Math.PI / 180), 
			M0: 174.796  * (Math.PI / 180),  // Mean anomaly at J2000 (radians)
			n: 4.0923344368 // Mean motion (rad/day, for Mars)
		  }
	},

	venus:
	{
		geometry: [3,24,24], 
		texture: textures.venus, 
		positionInit: [15,10,5],
		positions: [[5,10,5], [25,30,25] ], 
		rotX: -0.01,
		rotY: 0.03,
		orbitParams: {
			a: 0.72333566,      
			e: 0.00677672,      
			i: 3.39467605 * (Math.PI / 180),    
			omega: 131.60246718 * (Math.PI / 180),
			omegaNode: 76.67984255 * (Math.PI / 180),
			M0:  50.115 * (Math.PI / 180),  // Mean anomaly at J2000 (radians)
			n: 1.6021302244 // Mean motion (rad/day, for Mars)
		  }

	},

	earth:
	{
		geometry: [3,24,24], 
		texture: textures.earth, 
		positionInit: [25,10,5],
		positions: [[5,10,5], [35,40,65] ], 
		rotX: 0.01,
		rotY: 0.04,
		orbitParams: {
			a: 1.00000,      
			e: 0.01671123 ,        
			i: -0.00001531* (Math.PI / 180),
			omega: 102.93768193 * (Math.PI / 180),
			omegaNode: 49.57854 * (Math.PI / 180),
			M0: 357.51716  * (Math.PI / 180),  // Mean anomaly at J2000 (radians)
			n: 0.9856002831 // Mean motion (rad/day, for Mars)
		  }
	},
	moon:
	{
		geometry: [1.5,24,24], 
		texture: textures.moon, 
		positionInit: [28,14,5],
		positions: [[5,10,5], [17,22,75] ], 
		rotX: 0.01,
		rotY: 0.04,
		orbitParams: {
			a: 0.00256955,      
			e: 0.0549,          
			i: 5.145 * (Math.PI / 180),
			omega: 318.15 * (Math.PI / 180),
			omegaNode: 125.08 * (Math.PI / 180),
			M0: 115.3654 * (Math.PI / 180), // Mean anomaly at J2000 (radians)
			n: 13.176358 * (Math.PI / 180) // Mean motion (radians per day)
		  }
	},

	mars: 
	{
		geometry: [2,24,24], 
		texture: textures.mars, 
		positionInit: [35,10,5],
		positions: [[5,10,5], [17,22,-75] ], 
		rotX: -0.01,
		rotY: 0.06,
		orbitParams: {
			a: 1.523679,      
			e: 0.0934,        
			i: 1.850 * (Math.PI / 180), 
			omega: -23.94 * (Math.PI / 180),
			omegaNode: 49.57854 * (Math.PI / 180),
			M0: 19.412 * (Math.PI / 180),  // Mean anomaly at J2000 (radians)
			n: 0.5240207766 // Mean motion (rad/day, for Mars)
		  }
	}, 
	jupiter:
	{
		geometry: [15,24,24], 
		texture: textures.jupiter, 
		positionInit: [45,10,5],
		positions: [[5,10,5], [-17,22,75] ], 
		rotX: 0.01,
		rotY: -0.03,
		orbitParams: {
			a: 5.20288700,     
			e: 0.04838624,     
			i: 1.30439695 * (Math.PI / 180),
			omega: 14.72847983 * (Math.PI / 180),
			omegaNode: 100.47390909 * (Math.PI / 180),
			M0: 20.020 * (Math.PI / 180),  // Mean anomaly at J2000 (radians)
			n: 0.0830853001 // Mean motion (rad/day, for Mars)
		  }
	},
	saturn:
	{
		geometry: [15,24,24], 
		texture: textures.saturn, 
		positionInit: [55,10,5],
		positions: [[5,10,5], [17,-22,75] ], 
		rotX: -0.02,
		rotY: 0.01,
		orbitParams: {
			a: 9.53667594,      
			e: 0.05386179,      
			i: 2.48599187 * (Math.PI / 180),
			omega: 92.59887831 * (Math.PI / 180),
			omegaNode: 113.66242448 * (Math.PI / 180),
			M0: 317.020  * (Math.PI / 180),  // Mean anomaly at J2000 (radians)
			n: 0.0334442282 // Mean motion (rad/day, for Mars)
		  }
	},
	uranus:
	{
		geometry: [15,24,24], 
		texture: textures.uranus, 
		positionInit: [55,10,5],
		positions: [[5,10,5], [17,22,-75] ], 
		rotX: 0.02,
		rotY: -0.01,
		orbitParams: {
			a: 19.18916464,      
			e: 0.04725744,       
			i: 0.77263783 * (Math.PI / 180),
			omega: -170.95427630 * (Math.PI / 180),
			omegaNode: 74.01692503 * (Math.PI / 180), 
			M0: 142.5905  * (Math.PI / 180),  // Mean anomaly at J2000 (radians)
			n: 0.0117625955 // Mean motion (rad/day, for Mars)
		  }
	},

	neptune:
	{
		geometry: [10,24,24], 
		texture: textures.neptune, 
		positionInit: [55,10,5],
		positions: [[5,10,5], [17,-22,75] ], 
		rotX: 0.007,
		rotY: 0.007,
		orbitParams: {
			a: 30.06992276,    
			e: 0.00859048 ,    
			i:  1.77004347   * (Math.PI / 180),
			omega: 44.96476227 * (Math.PI / 180), 
			omegaNode: 131.78422574 * (Math.PI / 180),
			M0: 267.7673 * (Math.PI / 180),  // Mean anomaly at J2000 (radians)
			n: 0.0059773172 // Mean motion (rad/day, for Mars)
		  }
	}
}


function addPlanet( props) 
{
	const geometry = new THREE.SphereGeometry(props.geometry[0], props.geometry[1], props.geometry[2]);
	// const planet = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({map: planetTexture}) );
	const planet = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({map: props.texture}) );
	planet.position.set(props.positionInit[0], props.positionInit[1], props.positionInit[2])

	// planet.rotateOnAxis()
	// planet.rotateX(4.04)
	scene.add(planet)

	return planet
}


const planets = {}
Object.entries(planetInfo).forEach(([key, value]) => 
	{
		planets[key] = addPlanet( value)	
		// addPlanet(value)	
	});
	
/////

// Orbital elements for Mars (approximate and static for simplicity)
  
  // Kepler's Equation: M = E - e * sin(E)
  // Solve iteratively using Newton's method
  function solveKeplerEquation(M, e) {
	const maxIterations = 100;
	const tolerance = 1e-6;
	let E = M;  // Initial guess: E = M
	for (let i = 0; i < maxIterations; i++) {
	  const deltaE = (M - (E - e * Math.sin(E))) / (1 - e * Math.cos(E));
	  E += deltaE;
	  if (Math.abs(deltaE) < tolerance) break;
	}
	return E;
  }
  
  // Convert eccentric anomaly to true anomaly
  function computeTrueAnomaly(E, e) {
	const sinV = (Math.sqrt(1 - e * e) * Math.sin(E)) / (1 - e * Math.cos(E));
	const cosV = (Math.cos(E) - e) / (1 - e * Math.cos(E));
	return Math.atan2(sinV, cosV); // True anomaly in radians
  }
  
  // Calculate the position of the planet in its orbit
  function getPlanetPosition(elements, daysSinceEpoch) {
	const { a, e, i, omega, omegaNode, M0, n } = elements;
  
	// Mean anomaly at given time
	const M = M0 + n * daysSinceEpoch;
  
	// Solve for eccentric anomaly E
	const E = solveKeplerEquation(M, e);
  
	// Calculate true anomaly (ν)
	const trueAnomaly = computeTrueAnomaly(E, e);
  
	// Radial distance (r)
	const r = a * (1 - e * e) / (1 + e * Math.cos(trueAnomaly));
  
	// Position in the orbital plane (x', y')
	const xPrime = r * Math.cos(trueAnomaly);
	const yPrime = r * Math.sin(trueAnomaly);
  
	// Now, convert to 3D space by rotating from orbital plane to ecliptic plane
  
	// First, rotate by argument of periapsis (ω)
	const x1 = xPrime * Math.cos(omega) - yPrime * Math.sin(omega);
	const y1 = xPrime * Math.sin(omega) + yPrime * Math.cos(omega);
  
	// Second, rotate by inclination (i)
	const z2 = y1 * Math.sin(i);
	const y2 = y1 * Math.cos(i);
  
	// Finally, rotate by longitude of ascending node (Ω)
	const x = x1 * Math.cos(omegaNode) - y2 * Math.sin(omegaNode);
	const y = x1 * Math.sin(omegaNode) + y2 * Math.cos(omegaNode);
	const z = z2;
  
	// Return the 3D position (in AU)
	return { x, y, z };
  }
  
  // Example usage: Calculate Mars' position 100 days after epoch
  const daysSinceEpoch = 100;  // Time since reference epoch (J2000)
//   let marsPosition = getPlanetPosition(marsOrbitalElements, daysSinceEpoch);
  
//   console.log(`Mars position (AU): X=${marsPosition.x}, Y=${marsPosition.y}, Z=${marsPosition.z}`);

/////
let numDays = 100; 
function animate() 
{
	// cube.rotateX(0.01)
	// cube.rotateY(0.01)
	// cube.rotateZ(0.01)

	controls.update();

	const auMultFactor = 30;


	numDays += 0.01;


		let earthCoords = {}

		Object.entries(planets).forEach(([key, value]) =>
		{

			value.rotateX(planetInfo[key].rotX)
			value.rotateY(planetInfo[key].rotY)

			if (key == "sun"  )
			{
				return
			}

			let objPos = getPlanetPosition(planetInfo[key].orbitParams, numDays);
			objPos.x *= auMultFactor
			objPos.y *= auMultFactor
			objPos.z *= auMultFactor


			if (key == "earth")
			{
				earthCoords = objPos;	
			}

			if (key == "moon")
			{
				objPos.x *= 100
				objPos.y *= 100
				objPos.z *= 100
				value.position.set(objPos.x + earthCoords.x,objPos.y+earthCoords.y,objPos.z+earthCoords.z)

			}
			else
			{
				value.position.set(objPos.x,objPos.y,objPos.z)
			}



			// const targetPosition = new THREE.Vector3(planetInfo[key].positions[1][0], planetInfo[key].positions[1][1], planetInfo[key].positions[1][2]);
  			
			// if (value.position.distanceTo(targetPosition) > 0.01) 
			// 	{ 
			// 		console.log("cmooooooon")
    		// 		// value.position.lerp(planetInfo[key].positions[1], 0.002);  // Interpolate the position 
			// 		value.position.lerp(targetPosition, 0.002);  // Interpolate the position 
			// 	}
			// 	else
			// 	{
			// 		console.log("what on earth")
			// 	}

			//

		}
	);

		
	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );