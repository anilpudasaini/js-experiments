/* 

COMMON FUNCTIONS:

function getRandomNumber(n)
function Ball(x,y)
function setBgimage()
function gameOver()
function loadImages()
function setRemoveFlag()
function fall()
function checkColour(x,y,c)
function myMouseDown(e)
function myMouseUp(e)

*/


function getRandomNumber(n)
{
return Math.floor(Math.random() * n);
}

function loadImages() 
{

	for(var i =0 ; i < 5 ; i++)
	{
	image = new Image();
	image.src  = `images2/${ i + 1 }.png`;
	images.push(image);

	}

}



class GameSound {
  constructor()
  {
    this.swap = new Audio('sound/swap.wav');
    this.blastSound = new Audio('sound/blastSound.wav');
    this.warning = new Audio('sound/warning.wav');
    this.sweet = new Audio('sound/sweet.wav');
    this.bgm = new Audio('sound/cheerful.mp3');
    this.gameOver = new Audio('sound/gameOver.wav');
    this.divine = new Audio('sound/divine.wav');
    this.button_press = new Audio('sound/button_press.wav');
    this.highScore = new Audio('sound/highScore.wav');
    this.bgm.volume = 0.6;
    this.blastSound.volume = 0.7;
    this.sweet.volume = 0.9;

  }

 	play(element){
    if (element == 'swap') {
      this.swap.currentTime = 0;
      this.swap.play();
    } else if (element == 'blastSound') {
      this.blastSound.currentTime = 0;
      this.blastSound.play();
    }else if (element == 'warning') {
      this.warning.play();
    }else if (element == 'sweet') {
      this.sweet.currentTime = 0;
      this.sweet.play();
    }else if (element == 'bgm') {
      this.bgm.currentTime = 0;
      this.bgm.play();
    }else if (element == 'gameOver') {
      this.bgm.play();
    }else if (element == 'divine') {
      this.divine.play();
  	}else if (element == 'button_press') {
      this.button_press.play();
    }else if (element == 'highScore') {
      this.highScore.play();
    }
  }

  pause(element){
  	if(element == 'bgm')
  	{
  		this.bgm.currentTime = 0;
  		this.bgm.pause();
  	}
  }
  
}



function ball(x,y)
{
this.x1 = x;
this.y1 = y;
this.x2 = x;
this.y2 = y;
this.gapCount = 0;
this.color;


this.getY = function()
{
//moving y gradually
return (this.y1 + (this.y2 - this.y1) * (this.gapCount) / 20) * 60 + 100;
}

this.getX = function()
{
//moving x gradually
return (this.x1 + (this.x2 - this.x1) * (this.gapCount) / 20) * 60;
}

this.moveBall = function(x2, y2, color)
{
	this.x2 = x2;
	this.y2 = y2;
	this.color = color;
	this.moving = true;
	this.gapCount = 20;
	moves.push(this);

}

this.update = function()
{
	this.gapCount--;

	if(this.gapCount <= 0)
	{
		this.moving = false;
	}

}

}



function checkColor(i, j, c)
{


	var flag = true;

	if ( i > 1)
	{
		var c0 = balls[i-2][j].color;
		var c1 = balls[i-1][j].color;
		if (c0 === c1 && c1 === c)
		{
			flag = false;
		}

	}

	if ( j > 1)
	{
		var c0 = balls[i][j-2].color;
		var c1 = balls[i][j-1].color;
		if (c0 === c1 && c1 === c)
		{
			flag = false;
		}
	}


	return flag;

}



function gameOver()
{
sound.pause('bgm');
sound.play('gameOver');
cxt.clearRect(0,0,width,height);
tryAgainBtn.innerText = 'Try Again';
tryAgainBtn.style.display = 'inline';
cxt.font = "60px candyFont";
cxt.fillStyle = '#d6fc13';
cxt.fillText('Score : '+ score, 110, 250);
localStorage[highScore] = highScore;

}


function setRemoveFlag()
{
for (var x = 0; x < 10; x++) //for comparing candies along y-axis
{
var c0 = balls[x][0].color;
var count = 1;
for ( var y = 1; y < 10; y++)
{	
	var c1 = balls[x][y].color;
	if (c0 == c1)
	{
		count++;

		if (count >= 3)
		{
			balls[x][y-2].remove = true;
			balls[x][y-1].remove = true;
			balls[x][y].remove = true;
			
			if (count === 4)
				{
				sweet = true; //for new music
			    }
		    else if (count >= 5)
			    {	
			    	sweet = false;
			    	divine = true;
			    }
		
	}


}
else
{
	c0 = c1;
	count = 1;

}
}
}

for (var y = 0; y < 10; y++) //for comparing candies along x-axis
{
var c0 = balls[0][y].color;
var count = 1;
for (var x = 1; x<10; x++)
{
	var c1 = balls[x][y].color;
	if (c0 == c1)
	{
		count++;

		if (count >= 3)
		{
			balls[x-2][y].remove = true;
			balls[x-1][y].remove = true;
			balls[x][y].remove = true;

			if (count === 4)
				{
				sweet = true; //for sweet music
			    }
		     else if (count >= 5)
			    {		
			    	sweet = false;
			    	divine = true;
			    }
	}
}
else
{
	c0 = c1;
	count = 1;
} 
}
}

}

function fall()   //eliminates balls with same colour
{
	for (var x = 0; x < 10; x++)
	{
		for(var y = 9, z = 9; y >= 0; y--, z--)
		{
	// debugger;
	while (z >= 0)
	{
		if (balls[x][z].remove)
		{
			z--;

		}
		else
		{
			break;
		}
	}
	if (y != z)
	{
		var colorNum = (z >= 0) ? balls[x][z].color : getRandomNumber(5);
		balls[x][y].moveBall(x, z, colorNum);
	}
}
}

//Updates remove flag & add score & play different sounds
var blastSoundFlag = true;


for (var x = 0; x < 10; x++)
{
for(var y = 0; y < 10; y++)
{
	if (balls[x][y].remove)
	{
		balls[x][y].remove = false;


		if (blastSoundFlag)
		{
			score +=100;
			sound.play('blastSound');			
			blastSoundFlag = false;
			console.log('lineBlast');
			highScore = (score>highScore) ? score:highScore;
			sound.play('highScore');

		} 	


		if (sweet)
		{
			score +=100;
			sound.pause('blastSound');
			sound.play('sweet');
			sweet = false;
			console.log('sweet');
			var ref = setInterval(function(){

				sweetImage.style.display  = 'inline';
			 }
				,20);
			setTimeout(function(){

				clearInterval(ref);
				sweetImage.style.display = 'none';
			}
			,520);
			highScore = (score>highScore) ? score:highScore;
			sound.play('highScore');
		}

		if (divine)
		{	
			score +=200;
			sound.pause('blastSound');
			sound.pause('sweet');
			sound.play('divine');
			divine = false;
			console.log('divine');

			 var ref1 = setInterval(function(){
				sweetImage.style.display = 'none';
				divineImage.style.display = 'inline';
			 }
				,20);
			setTimeout(function(){

				clearInterval(ref1);
				divineImage.style.display = 'none';
			}
			,520);
		
			highScore = (score>highScore) ? score:highScore;
			sound.play('highScore');
		}
	}
	  

	}
  }
}


function onMouseDown(e)
{
	mouseDownX = e.offsetX;
	mouseDownY = e.offsetY;
	sound.play('button_press');
}

function onMouseUp(e) //magic happens here
{
	var ballX1 = Math.floor(mouseDownX/60);
	var ballY1 = Math.floor((mouseDownY-100)/60);	

	var ballX2 = ballX1;
	var ballY2 = ballY1;

	var mouseUpX = e.offsetX;
	var mouseUpY = e.offsetY;

	//movement : up down left right
	if(Math.abs( mouseUpX - mouseDownX) == 0 && Math.abs(mouseUpY - mouseDownY) == 0 ){
		return;
	}
	else if (Math.abs(mouseUpX - mouseDownX) > Math.abs(mouseUpY - mouseDownY))
	{
		ballX2 += ((mouseUpX - mouseDownX) > 0) ? 1 : -1; 
		console.log("horizontal-move");
	}
	else
	{
		ballY2 += ((mouseUpY - mouseDownY) > 0) ? 1 : -1; 
		console.log("vertical-move");
	}

	if(balls[ballX2][ballY2] != undefined)
	if (balls[ballX1][ballY1].moving || balls[ballX2][ballY2].moving || timer == null)
	{
		return ;
	}



	//switching ball colors
	if(balls[ballX2][ballY2] !== undefined)
	{
	var ballColor = balls[ballX1][ballY1].color;
	balls[ballX1][ballY1].moveBall(ballX2,ballY2, balls[ballX2][ballY2].color);
	balls[ballX2][ballY2].moveBall(ballX1,ballY1, ballColor);
	moveCount--;
	}


	//swap candies sound
	var swapSoundFlag = true;

	if (swapSoundFlag)
	{
		sound.play('swap');
	} 

	//decrease move Count


	drawCanvas();


}
