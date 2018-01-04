var can = document.getElementById('myCanvas');
//var can = document.createElement('canvas');
can.setAttribute("height","600px");
can.setAttribute("width","600px");
//document.body.appendChild(can);

var form = document.createElement('form');
var input= document.createElement('input');
input.setAttribute("type","text");
input.setAttribute("name","word");
input.setAttribute("value","Enter Word");
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
  var xf=x0 + Math.cos(slope);
  var yf=y0 + Math.sin(slope);
  var context = can.getContext("2d");
  context.beginPath();
  context.strokeStyle="rgb(0,200,50)";
  context.moveTo(x0,y0);
  context.lineTo(xl,yl);
  context.stroke();
    //write stuff here//
}
drawSlope(5)
drawStraight(100,500,math.pi/4)

