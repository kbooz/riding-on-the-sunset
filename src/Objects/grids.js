import {defaults,params} from './../variables'
var loader = new THREE.TextureLoader();

let grid1 = new THREE.GridHelper( defaults.grid.size, defaults.grid.division, defaults.color, defaults.color );

let grid2 = new THREE.GridHelper( defaults.grid.size, defaults.grid.division, defaults.color, defaults.color );

let grid3 = new THREE.GridHelper( defaults.grid.size, defaults.grid.division, defaults.color, defaults.color );

// let gridTest = new THREE.GridHelper( defaults.grid.size, defaults.grid.division, 0xff9e00, 0xff9e00 );

console.log(defaults.grid.division);

let grid4 = new THREE.GridHelper( defaults.grid.size, defaults.grid.division, 0xff69b4, 0xff69b4 );

let grid5 = new THREE.GridHelper( defaults.grid.size, defaults.grid.division, 0xffffff, 0xffffff );



grid2.position.z = defaults.grid.size*2;
grid3.position.z = -(defaults.grid.size*2);
// grid4.position.z = -(defaults.grid.size*1.8);
grid4.position.z = -(defaults.grid.size*2);
grid4.position.y = 1;
grid5.position.y = 1.2;
grid5.position.z = -(defaults.grid.size*2.2);


/*
ALPHA AND TEXTURE
*/
let gridTest = () => {

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
				console.log(grid);
				resolve(grid);
			})
		})
	})
};
export default [grid1,grid2,grid3,gridTest];


// export default [grid1,grid2,grid3,grid4,grid5];