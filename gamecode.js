var can=document.getElementById("myCanvas");
can.setAttribute("height","600px");
can.setAttribute("width","600px");

//document.body.addChildNode(can);
context=can.getContext("2d")
context.beginPath();
context.moveTo(100, 400);
context.lineTo(200, 400);
context.lineWidth = 15;
context.strokeStyle=rgb(0,200,50);
context.stroke();
//function draw() {
  
