import {defaults,params} from './variables'

export var normalCam = () => {
	var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.rotation.x = -.2;
	camera.position.set(defaults.cam.position.x,defaults.cam.position.y,defaults.cam.position.z);
	return camera;
}

export var debugCam = () => {
	var camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.rotation.x = -1.6;
	camera.position.set(0,100,0);
	return camera;
}