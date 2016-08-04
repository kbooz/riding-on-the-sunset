class PostPos {
	constructor(){
		this.material_depth = new THREE.MeshDepthMaterial();
		this.postprocessing = {enabled:true};
		this.shaderSettings = {rings: 3,samples: 4};
		this.singleMaterial = false;
		this.raycaster = new THREE.Raycaster();
		this.distance = 100;
		this.effectController  = {
			enabled: true,
			jsDepthCalculation: true,
			shaderFocus: false,
			fstop: 2.2,
			maxblur: 1.0,
			showFocus: false,
			focalDepth: 2.8,
			manualdof: false,
			vignetting: false,
			depthblur: false,
			threshold: 0.5,
			gain: 2.0,
			bias: 0.5,
			fringe: 0.7,
			focalLength: 35,
			noise: true,
			pentagon: false,
			dithering: 0.0001
		}
		this.shader = THREE.ShaderLib[ "cube" ];
		this.material = new THREE.ShaderMaterial( {
			fragmentShader: this.shader.fragmentShader,
			vertexShader: this.shader.vertexShader,
			uniforms: this.shader.uniforms,
			depthWrite: false,
			side: THREE.BackSide
		});

		this.mesh = new THREE.Mesh( new THREE.BoxGeometry( 1000, 1000, 1000 ), this.material );
	}

	addToCamera(camera){
		camera.add(this.mesh);
	}

	matChanger (camera) {
		for (var e in this.effectController) {
			if (e in this.postprocessing.bokeh_uniforms)
			this.postprocessing.bokeh_uniforms[ e ].value = this.effectController[ e ];
		}

		this.postprocessing.enabled = this.effectController.enabled;
		this.postprocessing.bokeh_uniforms[ 'znear' ].value = camera.near;
		this.postprocessing.bokeh_uniforms[ 'zfar' ].value = camera.far;
		camera.setLens(this.effectController.focalLength);

	};

	addToGui(camera){

		gui.add( this.effectController, "enabled" ).onChange( matChanger );
		gui.add( this.effectController, "jsDepthCalculation" ).onChange( matChanger );
		gui.add( this.effectController, "shaderFocus" ).onChange( matChanger );
		gui.add( this.effectController, "focalDepth", 0.0, 200.0 ).listen().onChange( matChanger );

		gui.add( this.effectController, "fstop", 0.1, 22, 0.001 ).onChange( matChanger );
		gui.add( this.effectController, "maxblur", 0.0, 5.0, 0.025 ).onChange( matChanger );

		gui.add( this.effectController, "showFocus" ).onChange( matChanger );
		gui.add( this.effectController, "manualdof" ).onChange( matChanger );
		gui.add( this.effectController, "vignetting" ).onChange( matChanger );

		gui.add( this.effectController, "depthblur" ).onChange( matChanger );

		gui.add( this.effectController, "threshold", 0, 1, 0.001 ).onChange( matChanger );
		gui.add( this.effectController, "gain", 0, 100, 0.001 ).onChange( matChanger );
		gui.add( this.effectController, "bias", 0,3, 0.001 ).onChange( matChanger );
		gui.add( this.effectController, "fringe", 0, 5, 0.001 ).onChange( matChanger );

		gui.add( this.effectController, "focalLength", 16, 80, 0.001 ).onChange( matChanger );

		gui.add( this.effectController, "noise" ).onChange( matChanger );

		gui.add( this.effectController, "dithering", 0, 0.001, 0.0001 ).onChange( matChanger );

		gui.add( this.effectController, "pentagon" ).onChange( matChanger );

		gui.add( this.shaderSettings, "rings", 1, 8).step(1).onChange( shaderUpdate );
		gui.add( this.shaderSettings, "samples", 1, 13).step(1).onChange( shaderUpdate );

		matChanger(camera);
}
