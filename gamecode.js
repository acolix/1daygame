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
submit.setAttribute("value","launch");
//submit.setAttribute("height","30px");
//submit.setAttribute("width","30px");
form.appendChild(submit);
var x = form.elements[0].value;
//Console.write(x);
function computespeed () {
  var word = form.elements[0].value;
  var alphabet=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
  var letters = word.split("");
  var v=0;
  for (var i=1;i<=letters.length;i++)
  {
    v+=2**(-alphabet.indexOf(letters[i])/10); //Math.pow(2,-alphabet.indexOf(letters[i])/10);
  };
  //ctx.font = "30px Arial";
  //ctx.fillText(String(v),10,50);

  return(v)
};


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
  context.lineWidth = linewidth;
  context.strokeStyle="rgb(0,200,50)";
  context.moveTo(0,y0);
  context.lineTo(x0,y0);
  context.lineTo(xf,yf);
  context.lineTo(xf,y0);
  context.lineTo(wallx,y0);
  context.lineTo(wallx,y0-holeHeight);
  context.moveTo(wallx,y0-holeHeight-holesize);
  context.lineTo(wallx,0);
  context.stroke();
    //write stuff here//
}

function Ball() {
    this.radius = 20;
    this.x = x0
    this.y = y0
    this.draw = function(ctx) {
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(this.x, this.y,this.radius-linewidth/2,0,Math.PI*2,false);
        ctx.closePath();
        ctx.fill();
    }
    this.reset = function(ctx){
      this.x=x0;
      this.y=y0;
      this.draw(ctx);
    }
}

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

function rotatevec (vec, cosangle,sinangle){
  x=vec[1];
  y=vec[2];
  return[x*cosangle-y*sinangle,
         x*sinangle+y*cosangle];
}
function distance(p1,p2){return Math.sqrt((p1[1]-p2[1])**2+(p1[2]-p2[2])**2)}
function cornerbounce(cpoint){
  var unitv = [vx,vy].map(x=>x/distance([vx,vy],[0,0]));
  var refaxis=[ball.x-cpoint[1],ball.y-cpoint[2]];
  var unitrefaxis = refaxis.map(x=>x/distance(refaxis,[0,0]));
  ball.x=cpoint[1]+ball.radius*unitrefaxis[1];
  ball.y=cpoint[2]+ball.radius*unitrefaxis[2];
  newv=-rotatevec([vx,vy],unitv[1]*unitrefaxis[1]+unitv[2]*unitrefaxis[2],unitv[1]*unitrefaxis[2]-unitv[2]*unitrefaxis[1]);
  vx=-newv[1];
  vy=newv[2];
}

function updateCanvas(){        //drawSlope(5);
    var x = ball.x;
    var y= ball.y;
    function yinrange(y) {return(y<y0-holeHeight && y>y0-holeHeight-holesize)};
    if (x>rampx0){
      if (x<rampx+Math.sin(slope)*ball.radius && !hit){
          vy -= gravity*Math.sin(slope)**2;
          vx += gravity*Math.sin(2*slope)/2;
      } else if (!hit){
          vy -= gravity;
          if (distance([x,y],cpoints[0])<ball.radius){cornerbounce(cpoints[0])};
          if (x>wallx && !yinrange(y)){console.log(!yinrange(y));vx=-vx; ball.x=wallx; hit=true}
          else if(x>wallx-ball.radius){
            hit=true;
            if (distance([x,y],cpoints[1])<ball.radius){cornerbounce(cpoints[1])};
            if (distance([x,y],cpoints[2])<ball.radius){cornerbounce(cpoints[2])};
          }
      } else if (x<rampx-ball.radius){
          if (y>rampy){hit=false; ball.x = rampx;vx=-vx};
          if(distance([x,y],cpoints[1])<ball.radius){cornerbounce(cpoints[1])};
          vy -= gravity;
      } else {vy -= gravity};
    };
    ball.x += vx;
    ball.y += vy;
    if (ball.y>rampy0){ball.reset(ctx);clearInterval(animation)};
    ctx.clearRect(0, 0, W, H);
    drawStraight(rampx0,rampy0,slope,rampLength);
    ball.draw(ctx);
};
var x0 = W/5;
var y0= H*3/4;
var linewidth=10;
var ball = new Ball();
var slope = Math.PI/4;
var rampLength = 200;
var rampx0 = x0;//-ball.radius/Math.cos(slope);
var rampy0 = y0+ball.radius/Math.cos(slope);
var rampx=rampx0+rampLength*Math.cos(slope);
var rampy=rampy0-rampLength*Math.sin(slope);
var wallx = 500;
var holesize = 100;
var holeHeight= 200;
var gravity = -0.5;
var cpoints=[[rampx,rampy],[wallx,y0-holeHeight],[wallx,y0-holeHeight-holesize]];
var animation //= setInterval(updateCanvas,200);
//clearInterval(animation);
//drawSlope(5);
drawStraight(rampx0,rampy0,slope,200);
ball.draw(ctx);

/*var v0 = computespeed();
var vx = v0*Math.cos(slope);
var vy= -v0*Math.sin(slope);
var hit=false
var score = 0*/
var v0,vx,vy,hit,score;
function launchball(e){
  e.preventDefault();
  ball.reset(ctx);
  if (animation){clearInterval(animation)};
  v0 = computespeed();
  console.log(v0);
  vx = v0*Math.cos(slope);
  vy= -v0*Math.sin(slope);
  hit=false;
  score = 0;
  animation=setInterval(updateCanvas,100);
  //if (ball.y>rampy0){ball.reset(ctx);clearInterval(animation)};

  //if (ball.y<rampy0){
  //while (ball.y<=rampy0){}
  //clearInterval(animation);
  //ball.reset(ctx);
  //ball.draw(ctx);
};


form.addEventListener("submit", launchball)

function triangle (x1, y1, baselength, height) {
 ctx.beginPath();
 ctx.moveTo(x1,y1);
 ctx.lineTo(x1 + baselength/2, y1 + height);
 ctx.lineTo(x1 + baselength, y1);
 ctx.closePath(); 
}

function spikes (){
  var height = 100;
  var valleylength = wallx-rampx;
  var baselength = 10px;
  var nspikes = valleylength/baselength;
  for(i=1;i <= nspikes;i++1){;
    var x1 = rampx + baselength * (i-1);                         
    triangle(x1,y0, baselength, height);
    
}
}
spikes ()
