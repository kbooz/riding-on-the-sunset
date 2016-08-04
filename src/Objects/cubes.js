let cubes = [];

var i = 0;
var posy = 10;
var initz = -910;
var size = 10;
var distance = size*2;
var total = 80;
var posx = -(total*distance)/2;
for(var x = posx; x < total*distance + posx; x += distance) {
    var j = 0;
        var geometry = new THREE.CubeGeometry(2, size, 5);
        let cube;
        var material = new THREE.MeshLambertMaterial({
        color: 0xff0000
        });
        cube = new THREE.Mesh(geometry, material);
        cube.position.set(x, 0, initz);
        console.log(x);
        cubes.push(cube);
    i++;
}

export default cubes;