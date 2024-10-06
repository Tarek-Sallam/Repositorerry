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
				console.log(`${key} texture loaded`, texture); // Print loaded texture
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
		geometry: [5,24,24], 
		texture: textures.sun, 
		positionInit: [0,0,0], 
		positions: [[5,10,5], [0,0,0] ], 
		rotX: 0.02,
		rotY: -0.02
	},
	mercury:
	{
		geometry: [3,24,24], 
		texture: textures.mercury, 
		positionInit: [5,10,5], 
		positions: [[5,10,5], [15,20,15] ], 
		rotX: 0.02,
		rotY: -0.02
	},

	venus:
	{
		geometry: [3,24,24], 
		texture: textures.venus, 
		positionInit: [15,10,5],
		positions: [[5,10,5], [25,30,25] ], 
		rotX: -0.01,
		rotY: 0.03

	},

	earth:
	{
		geometry: [3,24,24], 
		texture: textures.earth, 
		positionInit: [25,10,5],
		positions: [[5,10,5], [35,40,65] ], 
		rotX: 0.01,
		rotY: 0.04
	},
	moon:
	{
		geometry: [1.5,24,24], 
		texture: textures.moon, 
		positionInit: [28,14,5],
		positions: [[5,10,5], [17,22,75] ], 
		rotX: 0.01,
		rotY: 0.04
	},

	mars: 
	{
		geometry: [2,24,24], 
		texture: textures.mars, 
		positionInit: [35,10,5],
		positions: [[5,10,5], [17,22,-75] ], 
		rotX: -0.01,
		rotY: 0.06
	}, 
	jupiter:
	{
		geometry: [3,24,24], 
		texture: textures.jupiter, 
		positionInit: [45,10,5],
		positions: [[5,10,5], [-17,22,75] ], 
		rotX: 0.01,
		rotY: -0.03
	},
	saturn:
	{
		geometry: [3,24,24], 
		texture: textures.saturn, 
		positionInit: [55,10,5],
		positions: [[5,10,5], [17,-22,75] ], 
		rotX: -0.02,
		rotY: 0.01
	},
	uranus:
	{
		geometry: [3,24,24], 
		texture: textures.uranus, 
		positionInit: [55,10,5],
		positions: [[5,10,5], [17,22,-75] ], 
		rotX: 0.02,
		rotY: -0.01
	},

	neptune:
	{
		geometry: [3,24,24], 
		texture: textures.neptune, 
		positionInit: [55,10,5],
		positions: [[5,10,5], [17,-22,75] ], 
		rotX: 0.007,
		rotY: 0.007
	}
}


//   console.log(textures)
// const planetTexture = new THREE.TextureLoader().load(texturePaths.mars)

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

	
function animate() 
{

	// cube.rotateX(0.01)
	// cube.rotateY(0.01)
	// cube.rotateZ(0.01)

	controls.update();

		// console.log(planets.mars.isObject3D())

		// console.log("planetInfo.mercury.targetPosition: ", planetInfo.mercury.targetPosition)

		// for (let planet in planets) 
		// {

		// }

		Object.entries(planets).forEach(([key, value]) =>
		{
			// console.log("key: ",key)
			// console.log(value)
			// console.log("planetInfo.key.rotX: ", planetInfo[key].rotX)
// 
			value.rotateX(planetInfo[key].rotX)
			value.rotateY(planetInfo[key].rotY)

			// console.log(value.targetPosition)

			  // Move the sphere towards the target position
			  console.log("key: ", key)			  
			//   console.log("planetInfo[key]: ", planetInfo[key])			  
			  console.log("planetInfo[key].positions[1]: ", planetInfo[key].positions[1])
			//   console.log("value.position.distanceTo(planetInfo[key].positions[1])", value.position.distanceTo(planetInfo[key].positions[1]) )
			  console.log("value.position: ", value.position)

			const targetPosition = new THREE.Vector3(planetInfo[key].positions[1][0], planetInfo[key].positions[1][1], planetInfo[key].positions[1][2]);
			console.log("targetPosition", targetPosition)
			console.log("value.position.distanceTo(targetPosition): ", value.position.distanceTo(targetPosition))
  			
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


		// planets.mars.rotateX(planetInfo.mars.rotX) 
		// planets.mars.rotateY(planetInfo.mars.rotY) 

		// planets.mars.rotation.x += 0.01;  // Rotate around X-axis
		// planets.mars.rotation.y += 0.01;  // Rotate around Y-axis
		
	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );