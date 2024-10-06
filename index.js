import * as THREE from 'three';


import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


import planetInfo from "./data.js"
// import texturePaths from "./public/data.js"

// console.log("texturePaths: ", texturePaths)

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



const spaceTexture = new THREE.TextureLoader().load("./assets/8k_stars_milky_way.jpg") 

// console.log(spaceTexture )
scene.background = spaceTexture 
//


//  function loadTextures(texturePaths) 
 function loadTextures(planetInfo) 
 {

	const textures = {}
	Object.entries(planetInfo).forEach(([key, value]) => 
	{
		new THREE.TextureLoader().load(value.texturePath, //  
			(texture) => {
				// This callback gets called when the texture is successfully loaded
				// textures[key] = texture;
				value.texture = texture;
			},
			undefined, // Optional: onProgress callback
			(err) => {
				console.error(`Error loading ${key} texture`, err); // Handle errors
			}
		);
	});

	console.log(textures)
	return textures;
}

  const textures = loadTextures(planetInfo)

  await new Promise(r => setTimeout(r, 2000));


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
  
  const daysSinceEpoch = 100;  // Time since reference epoch (J2000)
  
//   console.log(`Mars position (AU): X=${marsPosition.x}, Y=${marsPosition.y}, Z=${marsPosition.z}`);

/////
let numDays = 100; 
function animate() 
{

	// controls.update();

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

		}
	);

		
	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );