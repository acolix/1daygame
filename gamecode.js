var can=document.createNewElement('canvas');
document.body.addChildNode(can);
context=canvas.getContext('2d')
context.beginPath();
context.moveTo(50, 400);
context.lineTo(200, 400);
context.lineWidth = 15;
context.strokeStyle=rgb(0,200,50);
context.stroke();
//function draw() {
  
