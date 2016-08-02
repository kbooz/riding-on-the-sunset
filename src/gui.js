/*

ARRAY STRUCTURE

[
	{
		name:"Camera Velocity",
		open:true,
		children:[
			{
				param:defaults.cam.velocity,
				val:'x'
			},
			{
				param:defaults.cam.velocity,
				val:'y'
			},
			{
				param:defaults.cam.velocity,
				val:'z'
			}
			]
	}
]
*/
export default (gui,array) => {
	for (let i = 0; i < array.length; i++) {
		let section = array[i];
		let folder = gui.addFolder(section.name);

		for (let c = 0; c < section.children.length; c++) {

			let children = section.children[c];
			if(children.listen)
			{
				if(typeof children.min == 'number')
					folder.add(children.param,children.val,children.min,children.max).listen();
				else {
					if(typeof children.array == 'object')
						folder.add(children.param,children.val,children.array).listen();
					else
						folder.add(children.param,children.val).listen();
				}
			}
			else{
				if(typeof children.min == 'number')
					folder.add(children.param,children.val,children.min,children.max);
				else{
					if(typeof children.array == 'object')
						folder.add(children.param,children.val,children.array);
					else
						folder.add(children.param,children.val);
				}
			}
		}
		if(section.open)
			folder.open();
	}
}