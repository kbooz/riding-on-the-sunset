import {defaults,params} from './variables'

export default () => {
	var light = new THREE.PointLight( 0xffffff, 1, 0 );
	light.position.set(0,20,20);
	return light;
}