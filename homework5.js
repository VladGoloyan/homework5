canvas1=document.getElementById("c1")
ctx1=canvas1.getContext("2d")
const colorArray=["orange","purple","navy","black","yellow","green","red","pink","blue","gray"]
const draw = function(i){
	ctx1.clearRect(0,0,document.querySelector("canvas").width,document.querySelector("canvas").height)
	recDraw(i)
}
	const recDraw = function(i){
		if(i+1===0){
			return;
		}
		ctx1.fillStyle=points[i].color
		ctx1.fillRect(points[i].x,points[i].y,points[i].width,points[i].height)
		recDraw(i-1);
	}
const createPoints=function(x,y,c){
	canvas=document.querySelector("canvas");
	canvas.width=x;
	canvas.height=y;
	points=[];
	pushPoints(c);
	draw(c-1);
}
const pushPoints=function(c){
 	if(c===0){
 		return;
 	}
 	points.push({
        x: rand(document.querySelector("canvas").width-30),
        y: rand(document.querySelector("canvas").height-30),
        width: 30,
        height: 30,
        xDelta: 1,
        yDelta: 1,
        color: colorArray[rand(10)-1] // where colorArray could be something like ['red', 'green', 'orange']
    });
 	pushPoints(c-1)
    }

const rand = function(num) {
	return Math.floor(Math.random() * num) + 1;
}

// Function for number 2 is pointBounce
const pointBounce = function(a){
	points=[];
	pushPoints(a);
	loop()
}
const update = function(i){
	if(i<0){
		return;
	}
	if(points[i].x>=document.querySelector("canvas").width-30){
		points[i].xDelta = -points[i].xDelta
	}
	if(points[i].y>=document.querySelector("canvas").height-30){
		points[i].yDelta = -points[i].yDelta
	}
	if(points[i].x<=0){
		points[i].xDelta = -points[i].xDelta
	}
	if(points[i].y<=0){
		points[i].yDelta = -points[i].yDelta
	}
	points[i].x += points[i].xDelta
	points[i].y += points[i].yDelta
	update(i-1)
}
const loop = function(){
	draw(points.length-1);
	update(points.length-1);
	requestAnimationFrame(loop);
}


