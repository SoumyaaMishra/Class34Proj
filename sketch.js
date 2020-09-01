//Create variables here
var database
var item = 0;
function preload()
{
  //load images here
  sadDog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(800, 700);
  database = firebase.database();
  dog = createSprite(400, 350, 200, 40);
  dog.addImage(sadDog);
  dog.scale = 0.5
  var foodLeft = database.ref('Food');
  foodLeft.on("value", readFood, showERR);
}



function draw() {  
  background(0);
  if(keyWentDown(UP_ARROW)){
    dog.addImage(happyDog);
    writeFood(item);
  }
  drawSprites();
  //add styles here
  textSize(20)
  text("Press up arrow to feed Draco milk!", 280, 50);
  text("Food Left: " + item, 380, 100)

}
function readFood(data){
  item = data.val(); 
  console.log(item);
}

function writeFood(x){
  console.log(x);
  if(x <0){
    x = 0;
  }
  else{
  x = x-1}
  database.ref('/').update({
    Food : x
  })
}
function showERR(){
  console.log("Error in reading database");
}

