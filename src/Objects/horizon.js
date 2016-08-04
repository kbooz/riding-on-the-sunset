import {defaults,params} from './../variables'

var horizon = () => {
	let loader = new THREE.TextureLoader();
	
	let alphaMap = () => {
		return new Promise((resolve,reject)=>{
			loader.load('img/alpha.png',texture=>{
				resolve(texture);
			})
		})
	}

	return new Promise((resolve,reject)=>{
		loader.load('img/grid.png',(texture)=>{
			texture.wrapS = THREE.ClampToEdgeWrapping;
			texture.wrapT = THREE.ClampToEdgeWrapping;

			texture.repeat.set(1,1);
			let grid = new THREE.Mesh(
				new THREE.PlaneGeometry(defaults.grid.size, defaults.grid.size),
				new THREE.MeshBasicMaterial({color:0xff0000,side:THREE.DoubleSide,map:texture})
				)
			grid.material.transparent=true;
			grid.position.z = -900;
			grid.material.opacity = .6;
			grid.position.y = (defaults.grid.size)/2;
			alphaMap().then((alpha)=>{
				alpha.wrapS = alpha.wrapT = THREE.ClampToEdgeWrapping;
				grid.material.alphaMap = alpha;
				resolve(grid);
			})
		})
	})
};

export default horizon;