can=document.createNewElement('canvas');
document.body.addChildNode(can);
context=canvas.getContext('2d')
context.beginPath();
context.moveTo(100, 400);
context.lineTo(200, 400);
context.lineWidth = 15;
context.stroke();
//function draw() {
  
