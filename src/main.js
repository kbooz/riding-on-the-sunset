if (! Detector.webgl ) Detector.addGetWebGLMessage();

import {defaults,params} from './variables';
import {normalCam,debugCam} from './camera';
import light from './lights';
import createGui from './gui'
import Audio from './audio';
import Grids from './Objects/grids.js';
import Sun from './Objects/sun.js';
import Car from './Objects/car.js';
import Cubes from './Objects/cubes.js';
import horizon from './Objects/horizon.js';

//Set Enviroment
var debug = false;
var loaded = {car:false,grids:0}
var gui = new dat.GUI();

//Create Scene
var scene = new THREE.Scene();
scene.add( new THREE.AmbientLight( 0x404040 ));

//Create Renderer
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Create Camera
var camera = debug? debugCam() : normalCam();

//Resize Window
window.addEventListener( 'resize', () =>{
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
}, false );

//Audio
var audio = new Audio('audio/audio.mp3');

//Create objects
var grids = new Grids();
var sun = new Sun();
var car = new Car();
var cubes = new Cubes();

//Add elements to canvas
scene.add(camera);
scene.add(light);
grids.addToScene(scene);
sun.addToScene(scene);
car.addToScene(scene);
cubes.addToScene(scene);
horizon().then(value=>{
	scene.add(value);
	loaded.grids++;
})


//Define Render
var render = () => {
	requestAnimationFrame(render);

	if(!debug)
	{
		params.camPos.z += defaults.cam.velocity.z;
		params.camPos.y += defaults.cam.velocity.y;
		params.camPos.x += defaults.cam.velocity.x;

		let xMov = defaults.cam.movement.x == 'sin' ? Math.sin(params.camPos.x) : Math.cos(params.camPos.x);
		let yMov = defaults.cam.movement.y == 'sin' ? Math.sin(params.camPos.y) : Math.cos(params.camPos.y);
		let zMov = defaults.cam.movement.z == 'sin' ? Math.sin(params.camPos.z) : Math.cos(params.camPos.z);

		camera.position.x = defaults.cam.position.x + defaults.cam.max_movement.x * xMov;
		camera.position.y = defaults.cam.position.y + defaults.cam.max_movement.y * yMov;
		camera.position.z = defaults.cam.position.z + defaults.cam.max_movement.z * zMov;
	}

	grids.render();
	cubes.render(audio);
	renderer.render(scene, camera);
};

//Execute Render
render();

//Create gui
createGui(gui,[
	{
		name:"Camera Velocity",
		open:false,
		children:[
			{
				param:defaults.cam.velocity,
				val:'x',
				min:0,
				max:.09
			},
			{
				param:defaults.cam.velocity,
				val:'y',
				min:0,
				max:.09
			},
			{
				param:defaults.cam.velocity,
				val:'z',
				min:0,
				max:.09
			}
		]
	},
	{
		name:"Camera Movement",
		open:false,
		children:[
			{
				param:defaults.cam.movement,
				val:'x',
				array:['sin','cos']
			},
			{
				param:defaults.cam.movement,
				val:'y',
				array:['sin','cos']
			},
			{
				param:defaults.cam.movement,
				val:'z',
				array:['sin','cos']
			}
		]
	},
	{
		name:"Camera Position",
		open:false,
		children:[
			{
				param:camera.position,
				val:'x',
				listen:true
			},
			{
				param:camera.position,
				val:'y',
				listen:true
			},
			{
				param:camera.position,
				val:'z',
				listen:true
			}
		]
	},
	{
		name:"Camera Maximum",
		open:false,
		children:[
			{
				param:defaults.cam.max_movement,
				val:'x',
				min:0,
				max:10
			},
			{
				param:defaults.cam.max_movement,
				val:'y',
				min:0,
				max:10
			},
			{
				param:defaults.cam.max_movement,
				val:'z',
				min:0,
				max:10
			}
		]
	},
]);