

canvas = document.getElementById('canvas'); 
tryAgainBtn = document.getElementById('tryAgainBtn');
var sweetImage = document.getElementById('sweetImage');
var divineImage = document.getElementById('divineImage');
var cxt =  canvas.getContext('2d');
var images = [];
var balls = [[]];
var moves = [];
var height = canvas.height;
var width = canvas.width;	
var mouseDownX = null;
var mouseDownY = null;
var moveCount = 0;
var timeCount = 0;
var score = 0;
var sweet = false;
var divine = false;
var sound = new GameSound();
var highScore = 0;

//initialize Canvas
var canvas = document.getElementById('canvas'); 
var cxt =  canvas.getContext('2d');





function playHoverSound()
{
	hoverSound.currentTime = 0;
	hoverSound.play();
}


function setBgImage()
{
	cxt.drawImage(bgImage,0,0);
}



function setJS(fileName)
{
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = fileName;
	document.body.appendChild(script);


	setTimeout(function(){
		setup();
	},200)
}
















