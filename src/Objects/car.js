var loader = new THREE.OBJLoader();

var loadCar = () =>{
	return new Promise((resolve,reject) => {
		loader.load(
			// resource URL
			'/porsche.obj',
			// Function when resource is loaded
			function ( object ) {
				object.castShadow = true;
				object.receiveShadow = true;
				object.rotation.x = 11;
				object.position.y = 3;
				object.position.x = -5;
				object.scale.set(.5,.5,.5);
				for (let i = 0; i < object.children.length; i++) {
					let mesh = object.children[i];
					/*
					let glow = new THREEx.GeometricGlowMesh(mesh);
					mesh.add(glow.object3d);

					let insideUniforms	= glow.insideMesh.material.uniforms
					insideUniforms.glowColor.value.set('hotpink')
					let outsideUniforms	= glow.outsideMesh.material.uniforms
					outsideUniforms.glowColor.value.set('hotpink')*/

					mesh.material.wireframe = true;
					mesh.material.color.setHex(0xff69b4);
				}
				resolve(object);
			}
		);
	})
}

export default loadCar;