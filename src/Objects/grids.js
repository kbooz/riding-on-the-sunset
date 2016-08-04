import {defaults,params} from './../variables'

export default class Grids {
	constructor(){
		this.grids = []
		this.grids[0] = new THREE.GridHelper( defaults.grid.size, defaults.grid.division, defaults.color, defaults.color );

		this.grids[1] = new THREE.GridHelper( defaults.grid.size, defaults.grid.division, defaults.color, defaults.color );

		this.grids[2] = new THREE.GridHelper( defaults.grid.size, defaults.grid.division, defaults.color, defaults.color );

		this.grids[1].position.z = defaults.grid.size*2;
		this.grids[2].position.z = -(defaults.grid.size*2);
	}

	addToScene(scene){
		for (var i = 0; i < this.grids.length; i++) {
			scene.add(this.grids[i]);
		}
	}

	render(){
		if(this.grids[0].position.z > -10 && this.grids[0].position.z < 10)
		{
			this.grids[1].position.z = this.grids[0].position.z + (defaults.grid.size*2) ;
		}

		if(this.grids[1].position.z > -10 && this.grids[1].position.z < 10)
		{
			this.grids[2].position.z = this.grids[1].position.z + (defaults.grid.size*2) ;
		}

		if(this.grids[2].position.z > -10 && this.grids[2].position.z < 10)
		{
			this.grids[0].position.z = this.grids[2].position.z + (defaults.grid.size*2);
		}

		this.grids[0].position.z -= defaults.gridVel;
		this.grids[1].position.z -= defaults.gridVel;
		this.grids[2].position.z -= defaults.gridVel;
	}

}
