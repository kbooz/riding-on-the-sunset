export default class Cubes {
	constructor(){
		this.cubes = [];
		let z = -910;
		let size = 10;
		let distance = size*2;
		let total = 80;
		let initx = -(total*distance)/2;
		for(var x = initx; x < total*distance + initx; x += distance) {
			var j = 0;
			var geometry = new THREE.CubeGeometry(2, size, 5);
			let cube;
			var material = new THREE.MeshLambertMaterial({
				color: 0xff0000
			});
			cube = new THREE.Mesh(geometry, material);
			cube.position.set(x, 0, z);
			console.log(x);
			this.cubes.push(cube);
		}
	}

	addToScene(scene){
		for (let i = 0; i < this.cubes.length; i++) {
			scene.add(this.cubes[i]);
		}
	}

	render(audio){
		let k = 0;
		for(let i = 0; i < this.cubes.length; i++) {
				let scale = audio.array[k] / 30;
				scale = (scale < 1 ? 1 : scale)*5;
				this.cubes[i].scale.y = scale;
				this.cubes[i].position.y = scale*5;
				k += (k < audio.array.length ? 1 : 0);
		}
	}
}