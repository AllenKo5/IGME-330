let canvas = document.querySelector("canvas");

// get pointer to "drawing context" and drawing API
let ctx = canvas.getContext("2d");

// sky
ctx.fillStyle = "rgba(0, 0, 255, 0.3)";
ctx.fillRect(0, 0, 750, 500);

// ground
ctx.fillStyle = "rgba(0, 255, 0, 0.7)";
ctx.fillRect(0, 350, 750, 150);

// horizon line
ctx.strokeStyle = "rgb(0, 128, 0)";
ctx.lineWidth = 5;
ctx.beginPath();
ctx.moveTo(0, 350);
ctx.lineTo(750, 350);
ctx.closePath();
ctx.stroke();

// tree
ctx.strokeStyle = "rgb(128, 128, 0)";
ctx.lineWidth = 50;
ctx.beginPath();
ctx.moveTo(100, 400);
ctx.lineTo(100, 300);
ctx.closePath();
ctx.stroke();
ctx.fillStyle = "rgb(0, 128, 0)";
ctx.beginPath();
ctx.moveTo(20, 320);
ctx.lineTo(180, 320);
ctx.lineTo(100, 150);
ctx.closePath();
ctx.fill();
ctx.beginPath();
ctx.moveTo(50, 210);
ctx.lineTo(150, 210);
ctx.lineTo(100, 100);
ctx.closePath();
ctx.fill();

// main face
// set state variables
ctx.fillStyle = "yellow";
ctx.strokeStyle = "black";
ctx.lineWidth = 5;
// start drawing
ctx.beginPath();
// ctx.arc(x, y, radius, startAngle, endAngle, clockwise)
ctx.arc(375, 250, 200, 0, Math.PI * 2, false);
ctx.closePath();
// fill inside of arc with yellow
ctx.fill();
// stroke outside of arc with black
ctx.stroke();

// eyes
ctx.fillStyle = "black";
ctx.beginPath();
ctx.arc(300, 200, 50, 0, Math.PI * 2, false);
ctx.closePath();
ctx.fill();
ctx.beginPath();
ctx.arc(450, 200, 50, 0, Math.PI * 2, false);
ctx.closePath();
ctx.fill();
ctx.fillStyle = "white";
ctx.beginPath();
ctx.arc(325, 175, 10, 0, Math.PI * 2, false);
ctx.closePath();
ctx.fill();
ctx.beginPath();
ctx.arc(475, 175, 10, 0, Math.PI * 2, false);
ctx.closePath();
ctx.fill();

// mouth
ctx.fillStyle = "red";
ctx.beginPath();
ctx.arc(375, 300, 100, 0, Math.PI, false);
ctx.closePath();
ctx.fill();
ctx.fillStyle = "rgb(255, 128, 128)";
ctx.beginPath();
ctx.arc(425, 300, 50, 0, Math.PI, false);
ctx.closePath();
ctx.fill();