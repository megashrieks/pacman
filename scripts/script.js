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
face["CURRENT"] = face.LEFT;
var mouth = {
	direction: 1,
	wide: 1,
	speed: 0.1,
	max: Math.PI * 0.8,
	min: Math.PI * 0.05
}
function draw() {
	clear();
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
	requestAnimationFrame(draw);
}
draw();