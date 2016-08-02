import {defaults,params} from './../variables'
var loader = new THREE.TextureLoader();

let grid1 = new THREE.GridHelper( defaults.gridSize, 150, defaults.color, defaults.color );

let grid2 = new THREE.GridHelper( defaults.gridSize, 150, defaults.color, defaults.color );

let grid3 = new THREE.GridHelper( defaults.gridSize, 150, defaults.color, defaults.color );

// let gridTest = new THREE.GridHelper( defaults.gridSize, 150, 0xff9e00, 0xff9e00 );


let grid4 = new THREE.GridHelper( defaults.gridSize, 150, 0xff69b4, 0xff69b4 );

let grid5 = new THREE.GridHelper( defaults.gridSize, 150, 0xffffff, 0xffffff );



grid2.position.z = defaults.gridSize*2;
grid3.position.z = -(defaults.gridSize*2);
// grid4.position.z = -(defaults.gridSize*1.8);
grid4.position.z = -(defaults.gridSize*2);
grid4.position.y = 1;
grid5.position.y = 1.2;
grid5.position.z = -(defaults.gridSize*2.2);


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
			texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

			texture.repeat.set(10,10);
			let grid = new THREE.Mesh(
				new THREE.PlaneGeometry(500, 500),
				new THREE.MeshBasicMaterial({color:0xffff00,side:THREE.DoubleSide,map:texture,transparent:true})
				)
			grid.position.z = -500;
			grid.position.y = .8;
			console.log(grid);
			// alphaMap().then((alpha)=>{
				// grid.material.alphaMap = alpha;
				resolve(grid);
			// })
			// return grid;
		})
	})
};

/*
TODO: CSS3DOBJECT
let gridTest = 
*/
export default [grid1,grid2,grid3,gridTest,grid4,grid5];