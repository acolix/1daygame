function loadscript(url) {
  var script = document.createElement('script');
  script.src = url;
  document.body.appendChild(script);
}
loadscript("popular.js");
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

/*var txtFile = "popular.txt"
var file = new File([""],txtFile,{type:"text/plain"});

//file.open("r"); // open file with read access
var str = "";
while (!file.eof) {
  // read each line of text
  str += file.readln() + "\n";
}
file.close();
console.log(str);*/
function computespeed () {
  var word = form.elements[0].value;
  var alphabet=["z","q","x","j","k","v","b","p","y","g","f","w","m","u","c","l","d","r","h","s","n","i","o","a","t","e"];
  var letters = word.split("");
  var v=0;
  for (var i=1;i<=letters.length;i++)
  {
    v += 2**(-alphabet.indexOf(letters[i])/10); //Math.pow(2,-alphabet.indexOf(letters[i])/10);
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
  var grad =context.createLinearGradient(0,600,0,300);
  grad.addColorStop(0,'rgb(50,70,20)');
  grad.addColorStop(1,'rgb(150,210,60)');
  context.fillStyle=grad;
  context.moveTo(0,rampy0);
  context.lineTo(x0,rampy0);
  context.lineTo(xf,yf);
  context.lineTo(xf,y0+100);
  context.lineTo(wallx,y0+100);
  context.lineTo(wallx,y0-holeHeight);
  context.lineTo(600,y0-holeHeight);
  context.lineTo(600,600);
  context.lineTo(0,600);
  context.closePath();
  context.fill();
  context.stroke();
  context.moveTo(wallx,y0-holeHeight-holesize);
  context.lineTo(wallx,0);
  context.stroke();    //write stuff here//
}


function triangle (x1, y1, baselength, height) {
 ctx.beginPath();
 ctx.moveTo(x1,y1);
 ctx.lineTo(x1 + baselength/2, y1 - height);
 ctx.lineTo(x1 + baselength, y1);
 //ctx.strokeStyle('rgb(100,100,100)');
 ctx.closePath();
 var gradient=ctx.createLinearGradient(0,600,0,400);
 gradient.addColorStop(0,'rgb(10,10,40');
 gradient.addColorStop(1,'rgb(255,230,200');
 ctx.fillStyle=gradient;
 ctx.fill();
 ctx.beginPath();
 ctx.moveTo(x1+baselength/6,y1);
 ctx.lineTo(x1 + baselength/2, y1 - height);
 ctx.lineTo(x1 + baselength/3, y1);
 ctx.closePath();
 ctx.fillStyle= 'rgb(200,200,200)';
 ctx.fill();
}

function spikes (){
  var height = 100;
  var valleylength = wallx-rampx;
  var baselength=valleylength;
  var nspikes=1;
  while(baselength>11){nspikes++; baselength=valleylength/nspikes};
  for(i=1;i <= nspikes;i++){
    var x1 = rampx + baselength * (i-1);                         
    triangle(x1,rampy0+height, baselength, height);
    
}
}

function drawball (rad,color,x,y) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y,rad-linewidth/2,0,Math.PI*2,false);
    ctx.closePath();
    ctx.fill();
}
function flash (i){
return (function(){console.log(i);i++;
if(i==11){clearInterval(deathani)}
else if (i%2==1){ball.draw(ctx,'red')}
else{ball.draw(ctx,'black')};
})
}
function Ball() {
    this.radius = 20;
    this.x = x0;
    this.y = y0;
    this.i=1;
    this.draw = function(ctx,color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.x, this.y,this.radius-linewidth/2,0,Math.PI*2,false);
        ctx.closePath();
        ctx.fill();
    }
    this.flash = function(){deathani = setInterval(flash(this.i),100)}
    this.reset = function(ctx,clear){
      this.i=1;
      if(clear){ctx.clearRect(this.x-ball.radius, this.y-ball.radius, 2*ball.radius, 2*ball.radius)};
      this.x=x0;
      this.y=y0;
      this.draw(ctx,'black');
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
    console.log(hit)
    function yinrange(y) {return(y<rampy0-holeHeight && y>rampy0-holeHeight-holesize)};
    var g=gravity;
      if (x<rampx-Math.sin(slope)*ball.radius && !hit){
          g=gravity*Math.sin(slope);
          vy -= g*Math.sin(slope);
          vx += g*Math.cos(slope);
      } else if (!hit){
          vy -= gravity;
          if (distance([x,y],cpoints[0])<ball.radius){cornerbounce(cpoints[0])}
          else if (x>wallx-ball.radius && !yinrange(y)){console.log("yay");vx=-vx; ball.x=wallx-ball.radius; hit=true}
          else if(x>wallx-ball.radius){
            hit=true;
            if (distance([x,y],cpoints[1])<ball.radius){cornerbounce(cpoints[1])}
            else if (distance([x,y],cpoints[2])<ball.radius){cornerbounce(cpoints[2])};
          }
      } else if (x<rampx+ball.radius){
          if (y>rampy){hit=false; ball.x = rampx+ball.radius;vx=-vx}
          else if(distance([x,y],cpoints[0])<ball.radius){cornerbounce(cpoints[0])}
          else if(distance([x,y],y0-slope*(x-x0))<ball.radius){cornerbounce(cpoints[0])};
          vy -= gravity;
      } else {vy -= gravity};
    ball.x += vx+g/2;
    ball.y += vy-g/2;
    ctx.clearRect(x-ball.radius, y-ball.radius, 2*ball.radius, 2*ball.radius);
    drawStraight(rampx0,rampy0,slope,rampLength);
    ball.draw(ctx,'black');
    if (ball.y>rampy0-ball.radius){
      clearInterval(animation);
      ball.draw(ctx,'red');
      ball.flash();
      setTimeout(function(){ball.reset(ctx,true);drawStraight(rampx0,rampy0,slope,rampLength);spikes()},1000);
      (aniended == true);
      };
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
spikes();
ball.draw(ctx,'black');

/*var v0 = computespeed();
var vx = v0*Math.cos(slope);
var vy= -v0*Math.sin(slope);
var hit=false
var score = 0*/
var v0,vx,vy,hit,score,deathani, lives = 5;
if (aniended){
  lives
}

  
function launchball(e){
  e.preventDefault();
  ctx.clearRect(0,0,W,H);
  drawStraight(rampx0,rampy0,slope,200);
  spikes();
  ball.reset(ctx,false);
  if (animation){clearInterval(animation)};
  v0 = computespeed();
  console.log(v0);
  vx = v0*Math.cos(slope);
  vy= -v0*Math.sin(slope);
  hit=false;
  score = 0;
  if (aniended == false) {
   lives = lives - 1 
  }
  animation=setInterval(updateCanvas,100);
  
  
  //if (ball.y>rampy0){ball.reset(ctx);clearInterval(animation)};

  //if (ball.y<rampy0){
  //while (ball.y<=rampy0){}
  //clearInterval(animation);
  //ball.reset(ctx);
  //ball.draw(ctx,'black');
};


form.addEventListener("submit", launchball)
