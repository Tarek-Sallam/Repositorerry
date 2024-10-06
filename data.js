export const planetInfo = { 
	sun:
	{
		geometry: [6,24,24], 
		// texture: textures.sun, 
        texture: {}, 
        texturePath:"./assets/2k_sun.jpg",
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
		// texture: textures.mercury, 
        texture: {}, 
        texturePath:"./assets/2k_mercury.jpg",
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
		// texture: textures.venus, 
        texture: [], 
        texturePath:"./assets/2k_venus_surface.jpg",
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
		// texture: textures.earth, 
        texture: {}, 
        texturePath:"./assets/2k_earth_daymap.jpg",
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
		// texture: textures.moon, 
        texture: {}, 
        texturePath:"./assets/2k_moon.jpg",
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
		// texture: textures.mars, 
        texture: {}, 
        texturePath:"./assets/2k_mars.jpg",
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
		// texture: textures.jupiter, 
        texture: {}, 
        texturePath:"./assets/2k_jupiter.jpg",
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
		// texture: textures.saturn, 
        texture: {}, 
        texturePath:"./assets/2k_saturn.jpg",
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
		// texture: textures.uranus, 
        texture: {}, 
        texturePath:"./assets/2k_uranus.jpg",
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
		// texture: textures.neptune, 
        texture: {}, 
        texturePath:"./assets/2k_neptune.jpg",
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

export default planetInfo
