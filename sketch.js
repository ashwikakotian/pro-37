//Create variables here
var dog ,happyDog,dogImg
var database 
var foodStock,foodObj
var milk
var feed ,addFood
var feedTime,lastFed;
var changeState,readState;

var bedroomI ,gardenI ,washroomI
var gameState


//var count=0


function preload(){
  //load images here
  happyDog=loadImage("im/happy dog.png")
  dogImag=loadImage("im/Dog.png")
  bedroomI=loadImage("im/BedRoom.png")
  gardenI=loadImage("im/Garden.png")
  washroomI=loadImage("im/washRoom.png") 
  sadDog=loadImage("im/Dog.png")

}

function setup() {
  createCanvas(1000, 500);
  database=firebase.database()
  
  
  dog =createSprite(800,300,20,20)
  dog.addImage(sadDog)
  dog.scale=0.2

  feed=createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog)

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods)

   foodObj=new Food();


  
  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val()
  })


  feedTime=database.ref('feedTime');
  feedTime.on("value",function(data){
    lastFed=data.val();
  })





  foodRef=database.ref('food');
  foodRef.on("value",readStock)
  

  
}


function draw() {  
    background(46,139,87);

    currentTime=hour()
    if(currentTime===(lastFed+1)){
      update("Playing")
      foodObj.garden()
    }else if(currentTime===(lastFed+2)){
      update("Sleeping")
      foodObj.bedroom()
    }else if(currentTime>(lastFed+2)&& currentTime<=(lastFed+4)){
      update("Bathing")
      foodObj.washroom()
    }else{
      update("Hungry")
      foodObj.display()
    }

    fill ("white")
    textSize(16)

   

  
    if(lastFed >= 12){
      text("Last Fed : "+ lastFed % 12  +" PM"   ,350,60)
    }else if (lastFed===0){
      text("Last Feed : 12AM",350,60);

    }else{
      text("Last Feed : " + lastFed +" AM",350,60)
    }
    

    
    
    
    if(foodStock !== undefined){
      text("Food Remaning  : "+ foodStock ,800,40)
    }

    if (gameState !="Hungry"){
      feed.hide()
      addFood.hide();
      dog.remove()
    }else{
      feed.show()
      addFood.show()
      
}






  
  drawSprites();
  
 
}

function update(state) {
  database.ref('/').update({
      gameState:state
  })
}




function feedDog(){
  dog.addImage(happyDog);

 foodObj.deductFood(foodStock);
 database.ref('/').update({
   food:foodStock ,
   feedTime: hour(),
   gameState :"Hungry"
   
 })
}


function addFoods(){

  foodStock++;
  database.ref('/').update({
    food:foodStock
  })
}


function readStock (data){
  foodStock=data.val();
  foodObj.updateFoodStock(foodStock)
}