var can = document.getElementById("can");
var ctx = can.getContext("2d");

function resize() {
    can.width = window.innerWidth;
    can.height = window.innerHeight;
    ctx.fillStyle = "#000";
    ctx.rect(0, 0, can.width, can.height);
    ctx.fill();
}
resize();
window.onresize = resize;
