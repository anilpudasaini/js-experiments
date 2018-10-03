var canvas = document.getElementById('canvas');
var cxt = canvas.getContext('2d');

var leftKeyPressed = false;
var rightKeyPressed = false;

var requestId = 0 ;
var timer = Date.now();
var carWidth = 50;
var carHeight = 100;
var carX = (canvas.width - carWidth)/2;
var carY = canvas.height - carHeight;
var carSpeed = 10;
var enemySpawnlocation = [carX,50,300];
var enemyCarX = enemySpawnlocation[Math.floor(Math.random() * enemySpawnlocation.length)];
var enemyCarY = 0;

var collideSound;
var flag = false; 
var ref;




var img = new Image();
var playerCar = new Image();
var enemyCar = new Image();

    
img.src = 'images/backg.png';
playerCar.src = 'images/main.png';
enemyCar.src = 'images/car1.png';



document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


function bgDraw(x, y) {
    this.x = x;
    this.y = y;
    this.dy = 5;

    this.drawTrack = function() {
        cxt.drawImage(img, this.x, this.y);
    }

    

    this.updatebgDraw = function() {
        this.drawTrack();
        if (this.y >= 575) {
            this.y = -575;
        }
        this.y += this.dy;
    }
}


var initialBg = new bgDraw(0, 0);
var finalBg = new bgDraw(0, -575);
var enemy1 = new drawEnemyCar();





function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}






function drawCar() {

    cxt.drawImage(playerCar,carX,carY,carWidth,carHeight);   
}

function drawEnemyCar() {
    this.x = enemyCarX;
    console.log(this.x);
    this.y = 0;
    this.dy = 10;


    this.drawEnemy = function() {
        cxt.drawImage(enemyCar, this.x, this.y,carWidth,carHeight);
    }

    this.enemyUpdate = function() {
        this.drawEnemy();
        this.y += this.dy;
        if (this.y >= canvas.height) {
            this.x = enemySpawnlocation[Math.floor(Math.random() * enemySpawnlocation.length)];
            // this.y = enemyCarX;
            console.log('hell');
            console.log()
            this.y = -carHeight - 10;
        }
    }
}

function updateCarLocation()
{
    if (rightKeyPressed && carWidth+carX < canvas.width ) {
        carX += carSpeed;   
    }
    if (leftKeyPressed && carX > 0) {
        carX -= carSpeed;
    }
}

function detectCollision()
{


	    if((carX + carWidth) > enemy1.x && carX < (enemy1.x + carWidth) && (enemy1.y + carHeight) > carY && (carY + carHeight) > enemy1.y)
	    {
	        flag = true;

	        gameOver();
	    }
}

function keyDownHandler(e) {

    if ( e.keyCode === 83)
    {
        clearInterval(ref);
        console.log('doneeeeee');
    }

    if ( e.keyCode === 82)
    {
    	clearInterval(ref);
       	loop();
        console.log('doneeeeee');
    }

    if (e.keyCode === 39) {
        rightKeyPressed = true;


        
    } else if (e.keyCode === 37) {
        leftKeyPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode === 39) {
        rightKeyPressed = false;
        // console.log("notpresssed");
    } else if (e.keyCode === 37) {
        leftKeyPressed = false;
        // console.log("notpresssed");
    }
}





function gameOver()
{
	clearInterval(ref);
	cxt.clearRect(0,0,canvas.width,canvas.height);
	cxt.beginPath();
	console.log(enemy1);
	// clearInterval(ref);
	console.log(enemy1);
	// initialBg.drawTrack();
    collideSound = new sound("sound/1.wav");
    collideSound.play()
    cxt.fillStyle = 'black';
    cxt.fillRect(enemy1.x,enemy1.y,carWidth,carHeight);
    cxt.fillRect(0,0,canvas.width,canvas.height);
    cxt.font="20px Verdana";
    var gradient=cxt.createLinearGradient(0,0,canvas.width,0);
    gradient.addColorStop("0.3","green");
    gradient.addColorStop("0.5","blue");
    gradient.addColorStop("1.0","red");

// Fill with gradient
	cxt.fillStyle=gradient;
	cxt.fillText("Game over !!!!",50,100,200);
	cxt.fillText("You Survived for " + survivalTime() + 'seconds' ,40,200);
	// console.log();
	cxt.closePath();



}

function survivalTime()
{
    var survivalTime = Date.now() - timer;
    return Math.floor(survivalTime/1000);
}



function game()
{
initialBg.updatebgDraw()
finalBg.updatebgDraw();

enemy1.enemyUpdate();
drawCar();

detectCollision();
updateCarLocation();

}



function loop()
	{

		    ref = setInterval(function()
		    {

		        cxt.clearRect(0,0,canvas.width,canvas.height);
		        game();
		    
		    
		}, 1000/60);
	}       


window.onload = function()
{
    loop();
};










