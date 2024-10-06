import * as THREE from 'three';

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
        side: THREE.DoubleSide
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
    let material;
    if (planetParams.name === 'Sun') {
        material = new THREE.MeshBasicMaterial({map: texture});
        //material.emissive = new THREE.Color(0xffffff);
    } else {
        material = new THREE.MeshStandardMaterial({map: texture});
        //material.emissive = new THREE.Color(0x000000);
    }
    // if (planetParams.name === 'Sun') {
    //     material.emissive = 0xffffff
    //     console.log(material)
    // }
    
    const sphere = new THREE.Mesh(sphereGeometry, material);
    
    
    sphere.position.set(x, y, z);
    sphere.name = planetParams.name
    scene.add(sphere);
    
    if (planetParams.ring) {
        addRings(planetParams, sphere)
    }

    return sphere
}