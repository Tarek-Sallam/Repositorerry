import * as THREE from 'three';
import {FontLoader}  from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { scales } from './dynamicScale';

const addRings = (planetParams, sphere) => {
    let ringGeometrySpecs = planetParams.ring.geometrySpecs
    let ringTexturePath = planetParams.ring.texture

    const thickness = 0.03;

    const ringTexture = new THREE.TextureLoader().load(ringTexturePath);
    ringTexture.colorSpace = THREE.SRGBColorSpace;

    const innerRadius = ringGeometrySpecs[0] * planetParams.radius;
    const outerRadius = ringGeometrySpecs[1] * planetParams.radius;

    const shape = new THREE.Shape();
    shape.moveTo(outerRadius, 0);
    shape.absarc(0, 0, outerRadius, 0, Math.PI * 2, false, 180);
    const hole = new THREE.Path();
    hole.moveTo(innerRadius, 0);
    hole.absarc(0, 0, innerRadius, 0, Math.PI * 2, true, 180);
    shape.holes.push(hole);
    
    const extrudeSettings = {
        steps: 1,
        depth: thickness,
        bevelEnabled: false,
        curveSegments: 180
    };
    
    const ringGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

    const ringMaterial = new THREE.MeshBasicMaterial({
        map: ringTexture,
        side: THREE.DoubleSide,
        transparent: true
    });
    
    const rings = new THREE.Mesh(ringGeometry, ringMaterial);
    rings.rotation.x = Math.PI / 1.5; // Rotate the rings to lie on an angle
    sphere.add(rings);
}   

export const addSphere = (planetParams, scene) => {
    const widthSegments = 32; // Number of horizontal segments
    const heightSegments = 32; // Number of vertical segments

    let radius = planetParams.radius
    let x = planetParams.xyz[0]; let y = planetParams.xyz[1]; let z = planetParams.xyz[2];
    // let colour = planetParams['colour']
    let texturePath = planetParams.texture

    const sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
    const texture = new THREE.TextureLoader().load(texturePath);
    texture.colorSpace = THREE.SRGBColorSpace;
    //const material = new THREE.MeshBasicMaterial({map: texture});
    let material;
    if (planetParams.name === 'Sun') {
        material = new THREE.MeshBasicMaterial({map: texture});
        //material.emissive = new THREE.Color(0xffffff);
    } else {
        material = new THREE.MeshStandardMaterial({map: texture});
        //material.emissive = new THREE.Color(0x000000);
    }
    const sphere = new THREE.Mesh(sphereGeometry, material);
    
    sphere.position.set(x, y, z);
    sphere.name = planetParams.name

    // console.log("planetParams: ", planetParams.rotateParams[0])

    // sphere.rotateX = planetParams.rotateParams[0]
    sphere.rotateY = planetParams.rotateParams[1]

    scene.add(sphere);
    
    if (planetParams.ring) {
        addRings(planetParams, sphere)
    }

    return sphere
}

export const addFloatingNames = (planetParams, scene) => 
    {
        // const floatingNames = {};
        const floatingNames = [];

        planetParams.forEach((planetParamsSingle)=> {
        const loader = new FontLoader();

        loader.load(`${import.meta.env.BASE_URL}data/Roboto_Light_Italic.json`, (font) => {
                const textGeometry = new TextGeometry(planetParamsSingle.name, {
                font: font,
                size: 0.5,       // Size of the text
                depth: 0.05,    // Depth of the 3D text
                curveSegments: 12, // Smoothness of the text curves
                bevelEnabled: false // Optional bevel settings
            });

            const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Material for the text
            const textMesh = new THREE.Mesh(textGeometry, textMaterial);

            // Set the position of the text above the planet
            textMesh.position.set(planetParamsSingle.xyz[0], planetParamsSingle.xyz[1] + 2.5, planetParamsSingle.xyz[2]);
            scene.add(textMesh)

            // floatingNames.push(textMesh)
            floatingNames.push(textMesh)

            // textInfo[planetParamsSingle.name] = textMesh
        })
    })

    
    return floatingNames;
}

export const addEllipses = (orbits, scene) => {
    const ellipses = []

    let ellipsePoints = {}

    Object.entries(orbits).forEach(([key, value]) => {
        ellipsePoints.key = value.positions.map((item) => {
            return(new THREE.Vector3(item[0] * scales[key], item[2] *scales[key], item[1] *scales[key]));
        })

        if (key !== "Sun") {
            const ellipseGeometry = new THREE.BufferGeometry().setFromPoints( ellipsePoints.key );

            const ellipseMaterial = new THREE.LineBasicMaterial( { color: 0xff0000 } );
            // Create the final object to add to the scene
            const ellipse = new THREE.Line( ellipseGeometry, ellipseMaterial );

            ellipses.push(ellipse)
            scene.add(ellipse)
        } else {
            ellipses.push('')
        }
    });

    return ellipses
}