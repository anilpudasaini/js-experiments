

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

//image load

var bg = new Image();
var fg = new Image();
var bird = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

//variables

var gap = 75;
var constant = pipeNorth.height + gap;
var birdX = 10;
var birdY = 15; 
var GRAVITY = 1.5;	
var pipe = [];

pipe[0] = {
	x : canvas.width,
	y : 0
}





console.log(constant);


bg.src = "images/bg.png";
fg.src = "images/fg.png";
bird.src = "images/bird.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";


console.log(pipeNorth);

document.addEventListener('keydown',moveUp);
moveUp = () => {birdY -= 20};


// drawing image
 
function draw()
{
	ctx.drawImage(bg, 0, 0);
	ctx.drawImage(bird, 15, 70);
	ctx.drawImage(fg,0,canvas.height-fg.height);

	for (var i = 0; i < pipe.length; i++)
	{
		ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
		ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y+constant);

		pipe[i].x --;

		if (pipe[i].x < 150)
			{
				pipe.push({

					x : canvas.width,
					y : Math.floor(Math.random() * pipeNorth.height ) - pipeNorth.height
				})
			}

	}
		
	requestAnimationFrame(draw);
 }


draw();


