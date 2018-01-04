var can = document.getElementById('myCanvas');
//var can = document.createElement('canvas');
can.setAttribute("height","600px");
can.setAttribute("width","600px");
//document.body.addChildNode(can);

var form = document.createElement('form');
var input= document.createElement('input');
input.setAttribute("type","text");
input.setAttribute("name","word");
input.setAttribute("value","Enter Word");
document.body.appendChild(form);
form.appendChild(input);

document.body.addChildNode(form);

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
function drawStraight (slope) {
  //write stuff here//
}

drawSlope(5);
  
