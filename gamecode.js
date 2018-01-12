/*function loadscript(url) {
  var script = document.createElement('script');
  script.src = url;
  document.head.appendChild(script);
}
loadscript("popular.js");*/
//can.setAttribute("background-color","gray");
var can = document.getElementById('myCanvas');
var can2 = document.getElementById('myCanvas2');
var can3 = document.getElementById('myCanvas3');
//can2.setAttribute("background-color","gray");
//var can = document.createElement('canvas');
//var dycan = document.createElement('canvas');
//can.setAttribute("height","600px");
//can.setAttribute("width","600px");
//dycan.setAttribute("height","600px");
//dycan.setAttribute("width","600px");
ctx=can2.getContext('2d');
ctx2=can3.getContext('2d');//can2.getContext('2d');
ctx3=can.getContext('2d');
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
//var pic=document.createElement('img');
//pic.src="trolol.png";
//document.body.appendChild(pic);


/*function computespeed () {
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
};*/

function computespeed (word) {
  //var word = form.elements[0].value;
  var alphabet=["z","q","x","j","k","v","b","p","y","g","f","w","m","u","c","l","d","r","h","s","n","i","o","a","t","e"];
  var letters = word.split("");
  var v=0;
  for (var i=0;i<letters.length;i++)
  {
    v += 2**(-alphabet.indexOf(letters[i])/15 + 2); //Math.pow(2,-alphabet.indexOf(letters[i])/10);
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
  var context = can2.getContext('2d');
  context.beginPath();
  context.lineWidth = linewidth;
  var grad =context.createLinearGradient(0,H,0,H/2);
  grad.addColorStop(0,'rgb(50,70,20)');
  grad.addColorStop(1,'rgb(150,210,60)');
  context.fillStyle=grad;
  //context.strokeStyle="rgb(250,50,50)";
  context.strokeStyle="rgb(0,200,50)";
  context.moveTo(0,rampy0);
  context.lineTo(x0,rampy0);
  context.lineTo(xf,yf);
  context.lineTo(xf,y0+100);
  context.lineTo(wallx,y0+100);
  context.lineTo(wallx,y0-holeHeight);
  context.lineTo(W,y0-holeHeight);
  context.stroke()
  context.lineTo(W,H);
  context.lineTo(0,H);
  context.closePath();
  context.fill();
  context.beginPath();
  context.lineWidth=linewidth;
  context.moveTo(wallx,wally-holesize);
  context.lineTo(wallx,0);
  context.stroke()
      //write stuff here//
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

function drawball (rad,color,x,y,ctx) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y,rad-linewidth/2,0,Math.PI*2,false);
    ctx.closePath();
    ctx.fill();
}
function drawflag(x,y){
  ctx.beginPath();
  var thick=3;
  var base=20;
  var height = 100;
  ctx.strokeStyle='black';
  ctx.lineWidth=thick;
  for(i=0;i<=4;i++){
    ctx.moveTo(x-base/2+i*base/8,y-thick/2-i*thick);
    ctx.lineTo(x+base/2-i*base/8,y-thick/2-i*thick);
    //ctx.stroke();ctx.beginPath();
  }ctx.stroke()
  //ctx.beginPath()
  ctx.lineWidth=5;
  ctx.moveTo(x,y);
  ctx.lineTo(x,y-height);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x,y-height-3,4,0,2*Math.PI);
  ctx.fillStyle='black';
  ctx.closePath(); ctx.fill();
  ctx.beginPath();
  ctx.fillStyle='white';
  ctx.arc(x+2,y-height-5,1.5,0,2*Math.PI);
  ctx.closePath();ctx.fill();
  ctx.beginPath();
  ctx.moveTo(x+2,y-height);
  ctx.lineTo(x+30,y-height);
  ctx.lineTo(x+2,y-height+20);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.fillStyle='rgb(200,200,200)';
  ctx.lineWidth=1;
  ctx.moveTo(x+1,y-7*thick/2);
  ctx.lineTo(x+1,y-height);
  ctx.lineTo(x+2,y-height);
  ctx.lineTo(x+2,y-7*thick/2);
  ctx.closePath;
  ctx.fill();
}
function flash (i,color){
return (function(){i++;
if(i==11){clearInterval(deathani)}
else if (i%2==1){ball.draw(ctx3,color)}
else{ball.draw(ctx3,'black')};
})
}
function Ball() {
    this.radius = 30;
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
    this.flash = function(color){deathani = setInterval(flash(this.i,color),100)}
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
  x=vec[0];
  y=vec[1];
  return([x*cosangle-y*sinangle,
         x*sinangle+y*cosangle]);
}
function distance(p1,p2){return Math.sqrt((p1[0]-p2[0])**2+(p1[1]-p2[1])**2)};
function cornerbounce(cpoint){
  var unitv = [vx,vy].map(x=>x/distance([vx,vy],[0,0]));
  var v = distance([vx,vy],[0,0]);
  var refaxis=[ball.x-cpoint[0],ball.y-cpoint[1]];
  var unitrefaxis = refaxis.map(x=>-x/distance(refaxis,[0,0]));
  ball.x=cpoint[0]-ball.radius*unitrefaxis[0];
  ball.y=cpoint[1]-ball.radius*unitrefaxis[1];
  newv=rotatevec(unitrefaxis,unitv[0]*unitrefaxis[0]+unitv[1]*unitrefaxis[1],unitv[0]*unitrefaxis[1]-unitv[1]*unitrefaxis[0]).map(x=>-v*x);
  vx=newv[0];
  vy=newv[1];
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
          if (distance([x,y],cpoints[0])<ball.radius){console.log('yay0');cornerbounce(cpoints[0])}
          else if (x>wallx-ball.radius && !yinrange(y)){console.log("yay");vx=-vx; ball.x=wallx-ball.radius; hit=true}
          else if(x>wallx-ball.radius){
            hit=true;
            if (distance([x,y],cpoints[1])<ball.radius){console.log("yay1");cornerbounce(cpoints[1])}
            else if (distance([x,y],cpoints[2])<ball.radius){console.log("yay2");cornerbounce(cpoints[2])};
          }
      } else if (x<rampx+ball.radius){
          if (x>rampx-Math.sin(slope)*ball.radius && y>rampy){hit=false; ball.x = rampx+ball.radius;vx=-vx}
          else if(distance([x,y],cpoints[0])<ball.radius){cornerbounce(cpoints[0])}
          else if(distance([x,y],[x,y0-slope*(x-x0)])<ball.radius){
            cornerbounce([x+ball.radius*Math.sin(slope),y+ball.radius*Math.cos(slope)])};
          vy -= gravity;
      } else {if (x>flagx+ball.radius+3){clearInterval(animation);ball.draw(ctx3,'cyan');ball.flash('cyan');score++;setTimeout(function(){ball.reset(ctx3,true);displaystatus();makenewgame()},1000)};
              if(x>wallx && y>cpoints[1][1]-ball.radius){vy=-vy;ball.y=cpoints[1][1]-ball.radius};
               vy -= gravity};
    ball.x += vx+g/2;
    ball.y += vy-g/2;
    ctx3.clearRect(x-ball.radius, y-ball.radius, 2*ball.radius, 2*ball.radius);
    //drawStraight(rampx0,rampy0,slope,rampLength);
    ball.draw(ctx3,'black');
    if (ball.y>rampy0-ball.radius){
      clearInterval(animation);
      ball.draw(ctx3,'red');
      ball.flash('red');
      lives-=1;
      setTimeout(function(){ball.reset(ctx3,true);displaystatus()/*drawStraight(rampx0,rampy0,slope,rampLength);spikes()*/},1000);
      } //else if (x>flagx-ball.radius){drawflag()};
};

/*function displaystatus(){
  ctx.clearRect(0,0,200,150);
  ctx.font = "30px Arial";
  ctx.fillStyle = "rgb(0,80,200)";
};*/
function displaystatus(){
  ctx2.clearRect(0,0,200,150);
  ctx2.font = "20px Arial";
  ctx2.fillStyle = "yellow";
  ctx2.fillText(String(nletters)+" letter word",25,60);
  ctx2.fillStyle = "rgb(50,200,255)";
  ctx2.fillText("Lives remaining: " + String(lives),25,100);
  ctx2.fillText("Score: "+String(score),25,120);
}

function isvalid(word){
    return popular.indexOf(word) != -1 && word.split("").length==nletters;
};
function makenewgame(){
  function randintinc(min,max){
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  rampLength = (Math.random()+1/3)*150;
  slope = (Math.random()+1/6)*Math.PI/2*6/9;
  var g=gravity;
  var dylaunch = rampLength*Math.sin(slope);
  var dxlaunch = rampLength*Math.cos(slope);
  word = popular[randintinc(2,popular.length)];
  var v = computespeed(word);
  while (v**2/2<-g*dylaunch) {
    word = popular[randintinc(2,popular.length)];
    v=computespeed(word);
  }
  console.log("word: "+word);
  nletters = word.split("").length; displaystatus();
  var vlaunch = Math.sqrt(v**2 + 2*g*dylaunch);
  var vlaunchy = vlaunch*Math.sin(slope);
  var vlaunchx = vlaunch*Math.cos(slope);
  var maxheight = dylaunch-(vlaunchy)**2/(2*g);
  holeHeight = Math.random()*(maxheight)*0.9;
  holesize=3*ball.radius;
  console.log("holeHeight:"+String(holeHeight));
  var farside = true;
  if (holeHeight>dylaunch && Math.random()>0.5){farside=false};
  if(farside){valley = (Math.sqrt(-2*(maxheight-holeHeight)/g)-vlaunchy/g)*vlaunchx}
  else {valley = (Math.sqrt(-2*(maxheight-holeHeight)/g))*vlaunchx+vlaunchy/g};
  ctx.clearRect(0,0,W,H);
  ctx2.clearRect(0,0,W,H);
  console.log("Valley: "+String(valley));
  if(valley*2>600){can.width=can2.width=can3.width=W=valley*2};
  if(holeHeight*2>600){can.height=can2.height=can3.height=H=holeHeight*2};
  if(W/5>200){x0=200}else{x0=W/5}; y0=3*H/4; lives=5;
  form.style.top = "calc(50% - "+String(H/2-40)+"px)";
  form.style.left = "calc(50% - "+String(W/2-150)+"px)";
  //holeHeight-=ball.radius;
  rampx0 = x0+ball.radius*Math.tan(slope/2);//-ball.radius/Math.cos(slope);
  rampy0 = y0+ball.radius;
  rampx=rampx0+dxlaunch;
  rampy=rampy0-dylaunch;
  wallx=rampx+valley;
  wally=rampy0-holeHeight;
  console.log("wallx: "+String(wallx));
  flagx=wallx+50;
  flagy=wally-linewidth/2;
  cpoints=[[rampx,rampy],[wallx,rampy0-holeHeight],[wallx,rampy0-holeHeight-holesize]];
  var back = ctx.createLinearGradient(0,0,0,H);
  back.addColorStop(0,"rgb(65,65,65)");
  back.addColorStop(1,"rgb(100,100,100)");
  ctx.fillStyle=back;
  ctx.fillRect(0,0,W,H);
  drawStraight(rampx0,rampy0,slope,rampLength);
  spikes();
  drawflag(flagx,flagy);
  displaystatus();
  ball.reset(ctx3,false);
  drawSaitama(x0-85,y0-36,1);
};
//function displayNletters(){ctx.text(String(n)+" letter word")};

function sum(list){var retval=0;for(i=0;i<list.length;i++){retval+=list[i]}; return retval};
function punchanimate(x,y,scale){
  this.i = 0;
  var h1 = 65;
  var y1 = 38;
  var h2 = 55;
  var y2 = 124;
  var framenums = [1,10,1,4,1,1,2,2,10,1];
  var lastframe=sum(framenums.slice(0,9));
  var punchframe=sum(framenums.slice(0,5));
  var coordlist=
  [[25,y1,38,h1],  //1
  [63,y1,38,h1],  //2
  [3,y2,56,h2],    //3
  [57,y2,55,h2],   //4
  [111,y2,55,h2],  //5
  [164,y2,74,h2],  //6
  [237,y2,74,h2],  //7
  [306,y2,66,h2],  //8
  //[x-6,y+12],
  [63,y1,38,h1],
  [25,y1,38,h1]];
  var filmroll =[].concat.apply([],coordlist.map((x,i)=>Array(framenums[i]).fill(x))); 
  pasteSizes=filmroll.map(x=>x.slice(2).map(y=>y*scale)); 
  corrections=
  [[+0,+0],
  [-2,+1],
  [-6,+12],
  [-6,+12],
  [-2,+12],
  [-2,+12],
  [-2,+12],
  [-2,+12],
  //[-6,+12],
  [-2,+1],
  [+0,+0]];
  var correctionroll =[].concat.apply([],corrections.map((x,i)=>Array(framenums[i]).fill(x))); 
  pasteCoords=correctionroll.map(a=>a.map((b,i)=>[x,y][i]+b*scale)); 
  var lx=Math.min(...pasteCoords.map(x=>x[0])), ly=Math.min(...pasteCoords.map(x=>x[1]));
  var rx=Math.max(...pasteCoords.map(x=>x[0]+pasteSizes[pasteCoords.indexOf(x)][0]))-lx;
  var ry=Math.max(...pasteCoords.map(x=>x[1]+pasteSizes[pasteCoords.indexOf(x)][1]))-ly;
  punch=setInterval(
    function(){//var lastframe=sum(framenums.slice(0,4));console.log(lastframe);
      if(this.i==punchframe){animation=setInterval(updateCanvas,dt)};
      if(this.i==lastframe){clearInterval(punch)};
      ctx2.clearRect(lx,ly,rx,ry);
      ctx2.drawImage(drawing,...filmroll[this.i],...pasteCoords[this.i],...pasteSizes[this.i]);
      this.i++;}
      ,100);
};


var x0 = W/5;
var y0= H*3/4;
var linewidth=10;
var ball = new Ball();
var gravity = -0.25;
var dt = 50
//ball.x+=70;ball.y-=200;
var slope = Math.PI/4;
var rampLength = 200;
var rampx0 = x0;//-ball.radius/Math.cos(slope);
var rampy0 = y0+ball.radius/Math.cos(slope);
var rampx=rampx0+rampLength*Math.cos(slope);
var rampy=rampy0-rampLength*Math.sin(slope);
var holesize = 100;
var holeHeight= 200;
var wallx = 500;
var wally=rampy0-holeHeight;
var flagx=wallx+50;
var flagy=holeHeight-linewidth/2;
var saixx=x0-62; saiy=y0-36;
var cpoints=[[rampx,rampy],[wallx,rampy0-holeHeight],[wallx,rampy0-holeHeight-holesize]];
var animation, punch; //= setInterval(updateCanvas,200);
var lives=5, score=0;
var word, nletters;
var drawing= new Image();
drawing.src="punchsheettrans.png";
function drawSaitama(x,y,scale){
  ctx2.drawImage(drawing,25,38,38,65,x,y,...[38,65].map(x=>x*scale));
};
drawing.onload = function() {
   return drawSaitama(x0-85,y0-36,1)}
makenewgame();
//clearInterval(animation);
//drawSlope(5);

/*var back = ctx.createLinearGradient(0,0,W,H);
back.addColorStop(0,"rgb(30,30,30)");
back.addColorStop(1,"rgb(100,100,100)");
ctx.fillStyle=back;
ctx.fillRect(0,0,W,H);
drawStraight(rampx0,rampy0,slope,200);
spikes();
drawflag(wallx+50,wally-linewidth/2);
displaystatus()

drawSaitama(x0-100,y0-50,1);
ball.draw(ctx3,'black');*/

//setTimeout(function(){punchanimate(W/2,H/2,1)},600);
//ctx.drawImage(pic,20,30,45,70,0,0,50,80);

/*var v0 = computespeed();
var vx = v0*Math.cos(slope);
var vy= -v0*Math.sin(slope);
var hit=false
var score = 0*/
var v0,vx,vy,hit,deathani,aniended;
function launchball(e){
  e.preventDefault();
  var word = form.elements[0].value;
  if (isvalid(word)){
    //ctx.clearRect(0,0,W,H);
    ball.reset(ctx3,true);
    //drawStraight(rampx0,rampy0,slope,200);
    //drawflag(wallx+50,wally-linewidth/2);
    if (aniended==false){lives-=1;displaystatus()};
    if (lives==0){score=0;makenewgame()};
    //if (animation){clearInterval(animation)};
    v0 = computespeed(word);
    console.log(v0);
    vx = v0*Math.cos(slope);
    vy= -v0*Math.sin(slope);
    hit=false;
    punchanimate(x0-85,y0-36,1);
    //setTimeout(function(){animation=setInterval(updateCanvas,dt)},1200);
  } else{alert("Invalid word")}
  //if (ball.y>rampy0){ball.reset(ctx);clearInterval(animation)};

  //if (ball.y<rampy0){
  //while (ball.y<=rampy0){}
  //clearInterval(animation);
  //ball.reset(ctx);
  //ball.draw(ctx,'black');
};


form.addEventListener("submit", launchball)

//punchsprite.png
//For multiplayer

function findheightslope(word){}