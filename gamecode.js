var can = document.getElementById('myCanvas');
//var can = document.createElement('canvas');
//var dycan = document.createElement('canvas');
//can.setAttribute("height","600px");
//can.setAttribute("width","600px");
//dycan.setAttribute("height","600px");
//dycan.setAttribute("width","600px");
ctx=can.getContext('2d');
//dyctx=dycan.getContext('2d');
document.body.appendChild(can);
//document.body.appendChild(dycan);
var W = can.width;
var H = can.height;
var slope = Math.PI/4;

var form = document.createElement('form');
//form.style.position = "relative"
//form.style.top = "-340px"
var input= document.createElement('input');
input.setAttribute("type","text");
input.setAttribute("name","word");
//input.setAttribute("value","Enter Word");
document.body.appendChild(form);
form.appendChild(input);

var submit = document.createElement("input");
submit.setAttribute("type","submit");
submit.setAttribute("height","30px");
submit.setAttribute("width","30px");
form.appendChild(submit);
var x = form.elements[0].value;
//Console.write(x);
function computespeed (e) {
  e.preventDefault();
  var word = form.elements[0].value;
  var alphabet=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
  var letters = word.split("");
  var v=0;
  for (var i=1;i<=letters.length;i++)
  {
    v+=2**(-alphabet.indexOf(letters[i])/10); //Math.pow(2,-alphabet.indexOf(letters[i])/10);
  };
  ctx.font = "30px Arial";
  ctx.fillText(String(v),10,50);

  return(v)
};
//form.addEventListener("submit", function (e){if(!isValid){e.preventDefault}});
form.addEventListener("submit", computespeed);


ctx.font = "30px Arial";
//ctx.fillText(String(computespeed(x)),10,50);

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
function drawStraight (x0,y0,slope,length) {
  var xf=x0 + length*Math.cos(slope);
  var yf=y0 - length*Math.sin(slope);
  var context = can.getContext('2d');
  context.beginPath();
  context.lineWidth = 20;
  context.strokeStyle="rgb(0,200,50)";
  context.moveTo(x0,y0);
  context.lineTo(xf,yf);
  context.stroke();
    //write stuff here//
}

function drawStraight (x0,y0,slope,length) {
  var context = can.getContext('2d');
  context.beginPath();
  context.lineWidth = 10;
  context.strokeStyle="rgb(0,250,50)";
  context.moveTo(600,0);
  context.lineTo(600,600);
  context.stroke();
    //write stuff here//
}

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
drawSlope(5);
drawStraight(200,500,slope,200);
ball.draw(ctx);

/*function renderFrame() {
    requestAnimationFrame(renderFrame);
    dyctx.clearRect(0, 0, W, H);
    vy -= gravity*Math.cos(slope);
    vx += gravity*Math.sin(slope);
    ball.x += vx;
    ball.y += vy;
    
    ball.draw(dyctx);
};
renderFrame()*/
function updateCanvas(){
    ctx.clearRect(0, 0, W, H);
    vy -= gravity*Math.cos(slope);
    vx += gravity*Math.sin(slope);
    ball.x += vx;
    ball.y += vy;
    ball.draw(ctx)
}
//setInterval(updateCanvas,100
//computespeed()
