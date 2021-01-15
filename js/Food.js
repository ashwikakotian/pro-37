class Food{
    constructor(){
         this.foodStock=database.ref("food");
        this.foodStock= foodStock;
         this.lastFed = database.ref("feedTime")
         this.image=loadImage("Milk.png");
         
    }
    


    getFoodStock(){
        var foodRef = database.ref("food");
        foodRef.on("value", function(data){
            foodStock = data.val();
        } );

    }
    updateFoodStock(food){

        database.ref("/").update({
            food :food
        })
    }
    

    deductFood(x){

        if(x <=0){
            x=0;
        }
        else{
            x--;
        }
    
        database.ref("/").update({
            food:x 
        })
    }

        bedroom(){
            background(bedroomI,550,500);

        }
        garden(){
            background(gardenI,550,500);

        }
        washroom(){
            background(washroomI,550,500);

        };
        
    
  
   display(){
        var x=80;
        var y=100;
        
        imageMode(CENTER);
        //image(this.image,720,220,70,70);

        if (foodStock!=0){
            for(var i=0; i<foodStock ; i++){
                if (i%10==0){
                    x=80;
                    y=y+50;
                }
                image (this.image,x,y,50,50)
                x=x+30;
            }


       
        }
    }
}

