var balloon,balloonImage1,balloonImage2;
var database,position
// create database and position variable here

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {

  database = firebase.database();
  var locNode = database.ref('balloon/height');
  locNode.on("value",readOp,showErr);


  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.velocityX = -2;
    
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=balloon.scale-0.3;

  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.velocityX = 2
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale = balloon.scale+0.3;
  }
  else if(keyDown(UP_ARROW)){
    balloon.velocityX = 2
    balloon.velocityY = -2
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale = balloon.scale+0.2;
  }
  else if(keyDown(DOWN_ARROW)){
    
    balloon.velocityY = 2
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale = balloon.scale-0.2;

  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x' :height.x + x,
    'y' :height.y + y

  });
}

function readOp(data){
  height = data.val()
balloon.x = height.x;
balloon.y = height.y;

}

function showErr(){
  console.log("error");
}