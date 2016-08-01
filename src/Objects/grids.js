import {defaults,params} from './../variables'

let grid1 = new THREE.GridHelper( defaults.gridSize, 150, defaults.color, defaults.color );

let grid2 = new THREE.GridHelper( defaults.gridSize, 150, defaults.color, defaults.color );

let grid3 = new THREE.GridHelper( defaults.gridSize, 150, defaults.color, defaults.color );

let grid4 = new THREE.GridHelper( defaults.gridSize, 150, 0xff9e00, 0xff9e00 );

let grid5 = new THREE.GridHelper( defaults.gridSize, 150, 0xff69b4, 0xff69b4 );

let grid6 = new THREE.GridHelper( defaults.gridSize, 150, 0xffffff, 0xffffff );



grid2.position.z = defaults.gridSize*2;
grid3.position.z = -(defaults.gridSize*2);
grid4.position.z = -(defaults.gridSize*1.8);
grid4.position.y = .8;
grid5.position.z = -(defaults.gridSize*2);
grid5.position.y = 1;
grid6.position.y = 1.2;
grid6.position.z = -(defaults.gridSize*2.2);

export default [grid1,grid2,grid3,grid4,grid5,grid6];