


// function startScreen()
// {
// var screen = document.getElementsByClassName('image')[0];
// 	setTimeout(function()
// 	{

// 	screen.style.right =  1000 +'px';
// 	console.log("from vitra");
// 	console.log(screen.style.left);
// 	},2000)

// 	game();
// }


function game(){


var canvas = document.getElementsByTagName('canvas')[0];
var scoreText = document.getElementsByTagName('P')[0];	
var c = canvas.getContext('2d');
var width = canvas.width;
var height = canvas.height;
var speed = 5;
var numberOfCircles = 20 ;
var maxRadius = 15;
var minRadius = 10;
var circleArray = [];
var score = 0;
	scoreText.style.fontSize = "large";

var mouse = {
	xPos : null,
	yPos : null
}

var colorArray = [
	'#105187',
	'#2C8693',
	'#F0F1D5',
	'#F19722',
	'#C33325'
];



function scoreChanger()
{
	score++;
	document.getElementById('p').innerHTML = 'Score : '  + score;
	// console.log(circleArray)
	if (circleArray.length == 0)
	{
		alert("CONGRATULATION YOU WIN!!!"); 

	}
}

function distance(x1,y1,x2,y2)
{
	const xDist = x2 - x1 ;
	const yDist = y2 - y1 ;

	return Math.sqrt(Math.pow(xDist,2) + Math.pow(yDist,2));
}

function destroyCircle(index)
{
circleArray.splice(index,1);
scoreChanger();
}

function Circle(x,y,dx,dy,radius)
{	
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

	this.draw = function ()
	{
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI ,false);
		c.fillStyle = 'black';
		// c.fillRect(0,0,width,height);
		// c.s trokeStyle = 'black';
		// c.stroke();
		c.fillStyle = this.color;
		c.fill();
		// console.log('inside circle');
	}

	this.update = function ()
	{
		if (this.x + radius > width || this.x - radius < 0){this.dx = -this.dx;}
		if (this.y + radius > height || this.y - radius < 0){this.dy = -this.dy;}
		
		this.x += this.dx;
		this.y += this.dy;
		this.draw();

		for(i=0; i<circleArray.length; i++)
			{

				if(this === circleArray[i]) continue;
				if (distance(this.x,this.y,circleArray[i].x,circleArray[i].y) -  (this.radius + circleArray[i].radius)<= 0)
				{
					this.dx = -this.dx;
					this.dy = -this.dy;
				}
			}





	}

}


for (var i = 0; i < numberOfCircles; i++ )
{
// var radius = 10;
	var radius = Math.random() * maxRadius + minRadius;
	
	var xRand = Math.random();
	var xVal = xRand * (width - 2 * radius) + radius
	var x = Math.floor(xVal);
	
	var	y = Math.floor(Math.random() * (height - 2 * radius) + radius);
	var dx = (Math.random() - 0.5) * speed;
	var dy = (Math.random() - 0.5) * speed;
	// console.log( x + ' from outer loop');



	// DOESN'T ALLOW SPAWNING ON TOP OF EACH OTHER

	if(i!==0) {
		for (let j =0; j < circleArray.length; j++ ) {
			if (distance(x,y,circleArray[j].x,circleArray[j].y) - 2 * radius < 0) {	
				x = Math.floor(Math.random() * (width - 2 * radius) + radius);
				y = Math.floor(Math.random() * (height - 2 * radius) + radius);	
				    // console.log(i + 'from inner loop');
				    j = -1 ;
				}
			}
	}


	circleArray.push(new Circle (x , y, dx, dy,radius));
}

//circle gets destroyed

canvas.addEventListener('click', function(e){
	console.log('j garey pani');

	const pos = {
		x: e.clientX,
		y: e.clientY
	};
	mouse = pos;

	// console.log(mouse);
	
	for (var i = 0 ; i < circleArray.length; i++ )
	{
		if ( mouse.x && mouse.y && circleArray[i].x && circleArray[i].y)
		{
			var mouseDistance = distance(circleArray[i].x,circleArray[i].y,mouse.x,mouse.y);
			if (mouseDistance < circleArray[i].radius)
			{
			destroyCircle(i);
			}
				
		}
		
	}


})



function animate()
{
	c.clearRect(0,0,width,height);

	for(var i = 0 ; i < circleArray.length; i++)
	{
		circleArray[i].update();
	}


	requestAnimationFrame(animate);
}

animate();

};

window.onload = function() {
game();
};
