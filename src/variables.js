export var defaults = {
	gridSize:600,
	color:0xff0000,
	cam:{
		position:{
			x:0,
			y:15,
			z:30
		},
		max_movement:{
			x:5,
			y:3.1,
			z:5
		},
		velocity:{
			x:.005,
			y:.024,
			z:.022
		},
		movement:{
			x:'sin',
			y:'sin',
			z:'sin'
		}
	},
	gridVel: .5
}
export var params = {
	camPos: {
		x:0,
		y:0,
		z:0
	}
}