import {defaults,params} from './variables';
import {normalCam,debugCam} from './camera';
import lights from './lights';
import obj from './objects';

//Set Enviroment
var debug = false;
var loaded = {car:false}

//Create Scene
var scene = new THREE.Scene();
scene.add( new THREE.AmbientLight( 0x404040 ));

//Create Renderer
var renderer = new THREE.WebGLRenderer();
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
var gui = () => {
	var gui = new dat.GUI();
	var f1 = gui.addFolder('Camera Velocity');
	f1.add(defaults.cam.velocity,'x',0,.09);
	f1.add(defaults.cam.velocity,'y',0,.09);
	f1.add(defaults.cam.velocity,'z',0,.09);
	// f1.open();
	var f2 = gui.addFolder('Camera Movement');
	f2.add(defaults.cam.movement,'x',['sin','cos']);
	f2.add(defaults.cam.movement,'y',['sin','cos']);
	f2.add(defaults.cam.movement,'z',['sin','cos']);
	// f2.open();

	var f3 = gui.addFolder('Camera Position');
	f3.add(camera.position,'x').listen();
	f3.add(camera.position,'y').listen();
	f3.add(camera.position,'z').listen();
	// f3.open();

	var f4 = gui.addFolder('Camera Maximum');
	f4.add(defaults.cam.max_movement,'x',0,10);
	f4.add(defaults.cam.max_movement,'y',0,10);
	f4.add(defaults.cam.max_movement,'z',0,10);
	// f4.open();

	var f5 = gui.addFolder('Grid');
	f5.add(defaults,'gridVel', -1,1).listen();
}

//Add elements to canvas
scene.add(camera);
scene.add(lights());
for (var i = 0; i < obj.grids.length; i++) {
	scene.add(obj.grids[i]);
}
scene.add(obj.sun);
obj.car().then(value=>{
	loaded.car = true;
	scene.add(value);
	obj.car = value;
})

// scene.add(obj.car);

gui();

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