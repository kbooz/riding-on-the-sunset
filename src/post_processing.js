var material_depth = new THREE.MeshDepthMaterial();
var postprocessing = {enabled:true};
var shaderSettings = {rings: 3,samples: 4};
var singleMaterial = false;
var raycaster = new THREE.Raycaster();
var distance = 100;
var effectController;

var shader = THREE.ShaderLib[ "cube" ];
var material = new THREE.ShaderMaterial( {

	fragmentShader: shader.fragmentShader,
	vertexShader: shader.vertexShader,
	uniforms: shader.uniforms,
	depthWrite: false,
	side: THREE.BackSide
} );

var mesh = new THREE.Mesh( new THREE.BoxGeometry( 1000, 1000, 1000 ), material );

function addToCamera(camera){
	camera.add(mesh);
}

