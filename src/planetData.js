export const planetParams = [
    {
        name: 'Sun',
        radius: 5,
        xyz: [0, 0, 0],
        colour: 0xFFFF00,
        texture: '../public/textures/8k_sun.jpg',
        rotationSpeed: 0.0004
    },
    {
        name: 'Mercury',
        radius: 0.8,
        xyz: [10, 0, 0],
        colour: 0x7E7B7A,
        texture: '../public/textures/8k_mercury.jpg',
        rotationSpeed: 0.0017
    },
    {   
        name: 'Venus',
        radius: 1.2,
        xyz: [18, 0, 0],
        colour: 0xD8BFD8,
        texture: '../public/textures/8k_venus.jpg',
        rotationSpeed: -0.0004
    },
    {   
        name: 'Earth',
        radius: 1.3,
        xyz: [28, 0, 0],
        colour: 0x1E90FF,
        texture: '../public/textures/8k_earth.jpg',
        rotationSpeed: 0.001
    },
    {
        name: 'Mars',
        radius: 1,
        xyz: [38, 0, 0],
        colour: 0xFF4500,
        texture: '../public/textures/8k_mars.jpg',
        rotationSpeed: 0.0009
    },
    {
        name: 'Jupiter',
        radius: 3.5,
        xyz: [52, 0, 0],
        colour: 0xD2B48C,
        texture: '../public/textures/8k_jupiter.jpg',
        rotationSpeed: 0.001,
    },
    {   
        name: 'Saturn',
        radius: 3,
        xyz: [70, 0, 0],
        colour: 0xF4A460,
        texture: '../public/textures/8k_saturn.jpg',
        rotationSpeed: 0.0009,
        ring: {
            texture: '../public/textures/saturn_ring.jpg',
            geometrySpecs: [1.25, 2.3]
        }
    },
    {   
        name: 'Uranus',
        radius: 2,
        xyz: [86, 0, 0],
        colour: 0xADD8E6,
        texture: '../public/textures/2k_uranus.jpg',
        rotationSpeed: -0.0006
    },
    {
        name: 'Neptune',
        radius: 1.8,
        xyz: [100, 0, 0],
        colour: 0x0000FF,
        texture: '../public/textures/2k_neptune.jpg',
        rotationSpeed: 0.0008
    },
]