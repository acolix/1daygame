var can = document.getElementById('myCanvas');
//var can = document.createElement('canvas');
can.setAttribute("height","600px");
can.setAttribute("width","600px");
//document.body.addChildNode(can);
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
drawSlope(5);
  
