function setup() 
{

	//Initialize moveCount and score
	 moveCount = 10;
	 score = 0;

	 //Hide button
	 tryAgainBtn.style.display = 'none';
	 timeBtn.style.display = 'none';



	loadImages();
  	//creating ball objects
  	for(var i = 0 ; i < 10 ; i++ )
  	{
	 	balls[i] = []; //this is required else this throws exception at i = 1 and j = 0;
	 	for(var j = 0 ; j < 10 ; j++)
	 	{
	 		balls[i][j] = new ball(i,j);
	 	}
	 }

	 //setting color
	 for(var i = 0 ; i < 10 ; i++ )
	 {
	 	for(var j = 0 ; j < 10 ; j++)
	 	{
	 		while(true)
	 		{
	 			var colorNum  = Math.floor(Math.random() * 5);
	 			if (checkColor(i, j, colorNum))
	 			{
	 				balls[i][j].color =  colorNum;
	 				break;
	 			}

	 		}
	 	}
	 }

	//locating position
	canvas.onmousedown = onMouseDown;
	canvas.onmouseup = onMouseUp;
	
	//start Timer
	timer = setInterval(checkBallStatus, 20);
	sound.play('bgm');

}



function drawCanvas()
{
	//clear canvas
	cxt.clearRect(0, 0, width, height);


	for(var i = 0; i < 10; i++)
	{
		for(var j = 0; j < 10 ; j++)
		{
			if(balls[i][j].getY() > 80)
			cxt.drawImage(images[balls[i][j].color], balls[i][j].getX(),balls[i][j].getY(), 60, 60);
		}
	}


cxt.font="21px candyFont "
cxt.fillStyle = '#f27cf4';
cxt.fillText("Moves Left : " + moveCount,10,50);
cxt.fillStyle = '#E38720';
cxt.fillText("Score : " + score,445,50);
cxt.fillStyle = '#950ff0';
cxt.font="23px candyFont "
cxt.fillText("HighScore : " + highScore,210,50);
cxt.fill();

}

function checkBallStatus()
{



if (moves.length > 0)
{
//Decrease Counter
for(var i = 0; i < moves.length; i++)
{
	moves[i].update();
}

// console.log('moves length before', + moves.length);
// console.log('moves before', + moves);

//if the gapCount remains, putting it back
moves = moves.filter(
	function (ball)
	{
		return ball.gapCount != 0;
	}
	);

// console.log('moves after', + moves);
// console.log('moves length after', + moves.length);

//moving complete
if (moves.length == 0)
{
	// console.log('moves.length is zero');
	setRemoveFlag();  
	fall();
}



}

//Gameover


if (moves.length == 0 && moveCount <= 0)
{		

	console.log('GAME RUNNING?');
	clearInterval(timer);
	timer = null;
	sound.pause('bgm');
	localStorage[highScore] = highScore;
	setTimeout(gameOver, 500);

}



	drawCanvas();




}