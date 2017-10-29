//Declaring and resizing our canvas
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
canvas.width=1200;
canvas.height=600;

// Function for 
const rand = function(num) {
	return Math.floor(Math.random() * num) + 1;
};

// Images
const background = new Image();
background.src="http://read.pudn.com/downloads142/sourcecode/delphi_control/615827/Example/Mouse%20Event/Background.jpg"
const heroModel = new Image();
heroModel.src = "https://s-media-cache-ak0.pinimg.com/originals/80/25/23/802523384fedff9c4fb8b63eee2ca311.png";
const badModel = new Image();
badModel.src="https://opengameart.org/sites/default/files/idle_12.gif"

// Character's objects
hero={
	x:500,
	y:200,
	width:40,
	height:100,
	xDelta:0.1,
	yDelta:0.1
}
bad = [];
const pushBad = function(i){
	if(i===0){
		return;
	}
	bad.push({
		x:rand(300),
		y:rand(500),
		width:70,
		height:110,
		xDelta:2.5,
		yDelta:2.5
	})
	pushBad(i-1)
}
pushBad(4)

// Some numbers we'll need
const num = hero.width/2 + bad[0].width/2
const leftKey = 37;
const upKey = 38;
const rightKey = 39;
const downKey = 40;

// Drawing functions
const draw = function(){
	context.drawImage(background,0,0,canvas.width,canvas.height);
	context.drawImage(heroModel,hero.x,hero.y,100,hero.height);
	drawBad(3);
}
const drawBad = function(i){
	if(i<0){
		return;
	}
	context.drawImage(badModel,bad[i].x,bad[i].y,bad[i].width,bad[i].height);
	drawBad(i-1)
}


// Function for collision check
const colCheck = function(i){
	if(i<0){
		return;
	}
	distance = {
		x:Math.pow(bad[i].x - hero.x , 2),
		y:Math.pow(bad[i].y - hero.y , 2),
	}
	result = Math.sqrt(distance.x + distance.y)
	if(result < num){
			alert("Nazi ninjas killed you! Press ctrl + r to restart.");
	}
	colCheck(i-1)
}

// Function for moving bad guys
const badGuysMoveToo = function(i){
	if(i<0){
		return;
	}
	if(bad[i].y <= 0){
		bad[i].yDelta = - bad[i].yDelta;
	}
	if(bad[i].y >= canvas.height - bad[i].height){
		bad[i].yDelta = - bad[i].yDelta;
	}
	if(bad[i].x <= 0){
		bad[i].xDelta = - bad[i].xDelta;
	}
	if(bad[i].x >= canvas.width-bad[i].width){
		bad[i].xDelta = - bad[i].xDelta;
	}
	bad[i].x += bad[i].xDelta;
	bad[i].y += bad[i].yDelta;	
	badGuysMoveToo(i-1);
}

// Function for updating coodrinate information
const update = function(){
  	badGuysMoveToo(3);
	colCheck(3);
	document.addEventListener('keydown', function(event) {
		console.log(event.keyCode)
		if(event.keyCode === upKey){
    		if(hero.y >= -18 ){
    			hero.y = hero.y - hero.yDelta;
    		}    
    	}
  		if(event.keyCode === downKey){
    	   if(hero.y <= canvas.height - 90){
    	   		hero.y = hero.y + hero.yDelta;
    	   }
    	}
  		if(event.keyCode === leftKey){
    	    if(hero.x >= -27){
        		hero.x = hero.x - hero.xDelta;
    	    }
  		}
  		if(event.keyCode === rightKey){
        	if(hero.x <= canvas.width - 70){
        		hero.x = hero.x + hero.xDelta;
        	}
  		}
	}, false);
}

// Animation loop
const loop = function(){
	draw();
	update();
	requestAnimationFrame(loop);
}
loop()