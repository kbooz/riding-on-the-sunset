let mat = THREEx.createAtmosphereMaterial();
mat.uniforms.glowColor.value = new THREE.Color(0xff80ef);
mat.uniforms.coeficient.value = 1;
mat.uniforms.power.value = 2.1;

let sunGlow = new THREE.Mesh(new THREE.SphereGeometry(45,27,27), mat)
sunGlow.position.set(100,80,-700);

let sunSphere = new THREE.Mesh(new THREE.SphereGeometry(40,27,27), new THREE.MeshBasicMaterial({color:0xff69cc}))
sunSphere.position.set(100,80,-700);

let sun = new THREE.Object3D();
sun.add(sunSphere);
sun.add(sunGlow);

export default sun;