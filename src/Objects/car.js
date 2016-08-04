export default class Car {
	constructor(){
		this.object;
	}

	addToScene(scene){
		let loader = new THREE.OBJLoader();
		let loadCar = () =>{
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

					mesh.material.wireframe = true;
					mesh.material.color.setHex(0xff69b4);
				}
				resolve(object);
			}
			);
			})
		}

		return loadCar().then(val=>{
			scene.add(val);
			return val;
		})
	}
}


