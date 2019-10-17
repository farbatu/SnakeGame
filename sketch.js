var snke;
var scl = 20;
var l = 0;
var w = 0;
function setup() {
  createCanvas(600,600);
  snke =new Snk();
  picklocation();
  frameRate(10);
}

function draw() {
  background(50);
  write();
  if (snke.eatbait(bait)){
   picklocation();
  }
 fill(0,250,50);
 rect(bait.x,bait.y,scl,scl);
 snke.move();
 snke.show();
 snke.restart();



}


function write(){
  fill(200);
  rect(-1,height,width+5,-30);
  noStroke();
  fill(0);
  textSize(14);
  textFont('Helvetica');
  text("Batuhan's Game Of Snk",5,height-5);
  text('Score: ', width-100,height-5);
  text(snke.tail.length,width-25,height-5);
          }





function keyPressed(){
 if (keyCode===RIGHT_ARROW){
  snke.dir(1,0);
  }else if (keyCode===LEFT_ARROW){
   snke.dir(-1,0);

  } else if (keyCode===UP_ARROW){
  snke.dir(0,-1)
  } else if (keyCode===DOWN_ARROW){
   snke.dir(0,1)
 } 
}

function picklocation(){
 var col=floor(width/scl);
 var lin=floor((height-30)/scl);
 bait=createVector(floor(random(col)),floor(random(lin)));
 bait.mult(scl);
}

function Snk (){
 this.x=0;
 this.y=0;
 this.xspeed=1;
 this.yspeed=0;
 this.total=0;
 this.tail=[];

 this.dir=function (x,y) {
 this.xspeed=x;
 this.yspeed=y;
  }
 this.move=function(){
  for (var i=0;i<this.tail.length-1;i++){
   this.tail[i]=this.tail[i+1];
  }
  if (this.total>=1){
   this.tail[this.total-1]=createVector(this.x,this.y);
  }

  this.x+=this.xspeed*scl;
  this.y+=this.yspeed*scl;
  this.x=constrain(this.x,0,width-scl);
  this.y=constrain(this.y,0,height-scl-30);

  }
 this.show=function(){
  fill(255);
    for (var i=0;i<this.tail.length;i++){
    rect(this.tail[i].x,this.tail[i].y,scl,scl);
   }

  rect(this.x,this.y,scl,scl);
 }


  this.restart=function(){
   for (var i=0;i<this.tail.length;i++){
    var pos=this.tail[i];
    var d=dist(this.x,this.y,pos.x,pos.y)
    if (d<1) {
     this.total=0;
     this.tail=[];
    }
   }
  }
  this.eatbait=function(pos){
   var d=dist(this.x,this.y,pos.x,pos.y);

   if (d<2){
    this.total++;
    return true
   } else {
    return false
   }
  }
 }
