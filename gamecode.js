var can = document.getElementById('myCanvas');
ctx=can.getContext('2d');
var dycan = document.createElement('canvas');
can.setAttribute("height","600px");
can.setAttribute("width","600px");
dycan.setAttribute("height","600px");
dycan.setAttribute("width","600px");
dyctx=dycan.getContext('2d');
document.body.appendChild(dycan);
var W = can.width = window.innerWidth;
var H = can.height = window.innerHeight;
var slope = Math.PI/4

var form = document.createElement('form');
var input= document.createElement('input');
input.setAttribute("type","text");
input.setAttribute("name","word");
input.setAttribute("value","Enter Word");


var submit = document.createElement("submit");
submit.setAttribute("type", "submit");
submit.setAttribute("height","30px");
submit.setAttribute("width","30px");
var x = form.elements[0].value;
document.body.appendChild(form);
form.appendChild(input);

function drawSlope (dh) {
  var context= can.getContext('2d');
  context.beginPath();
  context.lineWidth = 15;
  context.strokeStyle="rgb(0,200,50)";
  context.moveTo(100, 400);
  context.lineTo(200, 400);
  context.quadraticCurveTo(250,400,300,300);
  context.quadraticCurveTo(350,200,400,200);
  
  context.stroke();
}
function drawStraight (x0,y0,slope) {
  var xf=x0 + 100*Math.cos(slope);
  var yf=y0 - 100*Math.sin(slope);
  var context = can.getContext('2d');
  context.beginPath();
  context.lineWidth = 30;
  context.strokeStyle="rgb(0,200,50)";
  context.moveTo(x0,y0);
  context.lineTo(xf,yf);
  context.stroke();
    //write stuff here//
}
drawSlope(5);
drawStraight(slope);

function Ball() {
    this.radius = 50;
    this.x = can.width / 2;
    this.y = can.height - this.radius - 20;
 
    this.draw = function(ctx) {
        ctx.fillStyle = 'black';
        ctx.beginPath();
 
        ctx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI*2,
            false
        );
 
        ctx.closePath();
        ctx.fill();
    }
}

var ball = new Ball()
var gravity = -0.5;
var v0= 10;
var vx = v0*Math.cos(slope);
var vy= -v0*Math.sin(slope);
function renderFrame() {
    requestAnimationFrame(renderFrame);
    dyctx.clearRect(0, 0, W, H);
    vy -= gravity*Math.cos(slope);
    vx += gravity*Math.sin(slope);
    ball.x += vx;
    ball.y += vy;
    
    ball.draw(dyctx);
};
renderFrame()
