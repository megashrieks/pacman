var can = document.getElementById("can");
var ctx = can.getContext("2d");
var radius = 20;

function clear() {
	ctx.fillStyle = "#000";
	ctx.rect(0, 0, can.width, can.height);
	ctx.fill();
}
function resize() {
	can.width = window.innerWidth;
	can.height = window.innerHeight;
	clear();
}
var vel = 2;
var speed = {
	x: vel,
	y: 0
};
window.onkeydown = function(e) {
	switch (e.keyCode) {
		case 37:
			face["CURRENT"] = face.LEFT;
			speed = {
				x: -vel,
				y: 0
			};
			break;
		case 38:
			face["CURRENT"] = face.UP;
			speed = { x: 0, y: -vel };
			break;
		case 39:
			face["CURRENT"] = face.RIGHT;
			speed = { x: vel, y: 0 };
			break;
		case 40:
			face["CURRENT"] = face.DOWN;
			speed = { x: 0, y: vel };
			break;
		default:
			face["CURRENT"] = face["CURRENT"];
			break;
	}
};
resize();
window.onresize = resize;
var pacman = {
	x: window.innerWidth / 2,
	y: window.innerHeight / 2
};
var face = {
	RIGHT: {
		initial: 0,
		final: Math.PI * 2
	},
	LEFT: {
		initial: Math.PI,
		final: Math.PI
	},
	UP: {
		initial: -Math.PI / 2,
		final: -(Math.PI * 2 + Math.PI / 2)
	},
	DOWN: {
		initial: Math.PI / 2,
		final: Math.PI * 2 + Math.PI / 2
	}
};
face["CURRENT"] = face.RIGHT;
var mouth = {
	direction: 1,
	wide: 1,
	speed: 0.1,
	max: Math.PI * 0.6,
	min: Math.PI * 0.05
};
var grid = []
var padding = 15;
function createGrid() {
	var width = ~~(can.width / (radius*2 + padding));
	var height = ~~(can.height / (radius * 2 + padding));
	for (var i = 0; i < height; ++i) {
		let temp = [];
		for (var j = 0; j < width; ++j) {
			temp.push(~~(Math.random() * 3));
		}
		grid.push(temp);
	}
	console.log(width == grid.length);
}
function drawMaze() {
	for (var i = 1; i < grid.length+1; ++i){
		for (var j = 1; j < grid[i - 1].length + 1; ++j) {
			if (grid[i-1][j-1] === 0) continue;
			ctx.beginPath();
			let x, y;
			if (grid[i-1][j-1] === 1) {
				y = i * (radius * 2 + padding);
				x = j * (radius * 2 + padding);
				ctx.moveTo(x, y);
				ctx.lineTo(x + (radius * 2 + padding), y);
			}
			if (grid[i-1][j-1] === 2) {
				y = i * (radius * 2 + padding);
				x = j * (radius * 2 + padding);
				ctx.moveTo(x, y);
				ctx.lineTo(x, y + (radius * 2 + padding));
			}
			ctx.fillText(x,y,grid[i-1][j-1]);
			ctx.closePath();
			ctx.strokeStyle = "#fff";
			ctx.stroke();
		}
	}
}
function draw() {
	clear();
	drawMaze();
	ctx.beginPath();
	ctx.strokeStyle = "yellow";
	if (mouth.wide > mouth.max || mouth.wide < mouth.min) mouth.direction *= -1;
	ctx.arc(
		pacman.x,
		pacman.y,
		radius,
		face.CURRENT.initial + mouth.wide / 2,
		face.CURRENT.final - mouth.wide / 2
	);
	mouth.wide += mouth.speed * mouth.direction;
	ctx.stroke();
	ctx.closePath();
	if (!(pacman.x >= can.width - radius ||
		pacman.x <= radius ||
		pacman.y >= can.height - radius ||
		pacman.y <= radius)
	) {
		let x = ~~((pacman.x + speed.x) / ((radius * 2 + padding)*2));
		let y = ~~((pacman.y + speed.y) / ((radius * 2 + padding)*2));
		if (!!grid[x][y]) {
			pacman.x += speed.x;
			pacman.y += speed.y;
		}
	} else {
		speed = {
			x: 0,
			y: 0
		};
		if (pacman.x >= can.width - radius) {
			pacman.x = can.width - (radius+1);
		} else if (pacman.x <= radius) {
			pacman.x = radius+1;
		} else if (pacman.y >= can.height - radius) {
			pacman.y = can.height - (radius + 1);
		} else if (pacman.y <= radius) {
			pacman.y = radius + 1;
		}
	}
	let current = face.CURRENT;
	if (current == face.UP) {
		current = face.DOWN;
	} else if (current == face.DOWN) {
		current = face.UP;
	}

	ctx.beginPath();
	ctx.moveTo(
		pacman.x +
			Math.sin(current.initial + mouth.wide / 2 + Math.PI / 2) * radius,
		pacman.y +
			Math.cos(current.initial + mouth.wide / 2 + Math.PI / 2) * radius
	);
	ctx.lineTo(pacman.x, pacman.y);
	ctx.stroke();
	ctx.closePath();
	ctx.beginPath();
	ctx.moveTo(pacman.x, pacman.y);
	ctx.lineTo(
		pacman.x +
			Math.sin(current.final - mouth.wide / 2 + Math.PI / 2) * radius,
		pacman.y +
			Math.cos(current.final - mouth.wide / 2 + Math.PI / 2) * radius
	);
	ctx.stroke();
	ctx.closePath();

	requestAnimationFrame(draw);
}
createGrid();
draw();
