import {defaults,params} from './variables';
import {normalCam,debugCam} from './camera';
import light from './lights';
import obj from './objects';
import createGui from './gui'


//Set Enviroment
var debug = false;
var loaded = {car:false,grids:0}

//Create Scene
var scene = new THREE.Scene();
scene.add( new THREE.AmbientLight( 0x404040 ));

//Create Renderer
var renderer = new THREE.WebGLRenderer({ antialias: false });
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

//Create gui
var gui = new dat.GUI();
var guiValues = [
	{
		name:"Camera Velocity",
		open:true,
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
		open:true,
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
		open:true,
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
		open:true,
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
]
createGui(gui,guiValues);

//Add elements to canvas
scene.add(camera);
scene.add(light);
for (var i = 0; i < obj.grids.length; i++) {
	if(typeof obj.grids[i]=='function'){
		obj.grids[i]().then(value=>{
			obj.grids[i] = value;
			scene.add(obj.grids[i]);
			loaded.grids++;
		})
	}
	else
		scene.add(obj.grids[i]);
}
scene.add(obj.sun);
obj.car().then(value=>{
	loaded.car = true;
	scene.add(value);
	obj.car = value;
});


//Define Render
var render = () => {
	requestAnimationFrame(render);

	// obj.car.children[0].rotation.x += .1;

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


	if(obj.grids[0].position.z > -10 && obj.grids[0].position.z < 10)
	{
		obj.grids[1].position.z = obj.grids[0].position.z + (defaults.gridSize*2) ;
	}

	if(obj.grids[1].position.z > -10 && obj.grids[1].position.z < 10)
	{
		obj.grids[2].position.z = obj.grids[1].position.z + (defaults.gridSize*2) ;
	}

	if(obj.grids[2].position.z > -10 && obj.grids[2].position.z < 10)
	{
		obj.grids[0].position.z = obj.grids[2].position.z + (defaults.gridSize*2);
	}

	obj.grids[0].position.z -= defaults.gridVel;
	obj.grids[1].position.z -= defaults.gridVel;
	obj.grids[2].position.z -= defaults.gridVel;

	renderer.render(scene, camera);
};

//Execute Render
render();