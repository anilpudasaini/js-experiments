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
var enemySpawnlocation = [carX,50,355];
var enemyCarX = enemySpawnlocation[Math.floor(Math.random() * enemySpawnlocation.length)];
var enemyCarY = 0;
var collideSound;
var flag = false; 
var ref;

//for controlling loop
// console.log(enemyCarX);



document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


function game()
{
getCanvas();
// moveCanvas();
drawCar();
drawEnemyCar();
updateCarLocation();
moveEnemyCar();
detectCollision();	
}

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




function getCanvas()
{
	var img = new Image();
	img.src = 'images/bg.jpg';
	var pattern = cxt.createPattern(img, 'repeat');
	cxt.fillStyle = pattern;
	cxt.fillRect(0, 0, canvas.width,canvas.height);

}




function drawCar() {
    cxt.beginPath();
    cxt.rect(carX, carY, carWidth, carHeight);
    // cxt.fillStyle = "red";
    // cxt.fill();
    cxt.closePath();
    // console.log('from draw car');
    var imge = new Image();
	imge.src = 'images/main.png';
	cxt.drawImage(imge,carX,carY,carWidth,carHeight);	
}

function drawEnemyCar(){

	cxt.beginPath();
    cxt.rect(enemyCarX,enemyCarY, carWidth, carHeight);
    // cxt.fillStyle = "red";
    // cxt.fill();
    cxt.closePath();
    // console.log('from draw car');
    var imges = new Image();
	imges.src = 'images/car_5.png';
	cxt.drawImage(imges,enemyCarX,enemyCarY,carWidth,carHeight);
}



function keyDownHandler(e) {

	if ( e.keyCode === 13)
	{
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


function updateCarLocation()
{
    if (rightKeyPressed && carWidth+carX < canvas.width ) {
        carX += carSpeed;	
    }
    if (leftKeyPressed && carX > 0) {
        carX -= carSpeed;
    }
}

function moveEnemyCar()
{
	if (true) {
        enemyCarY += 2;	
    }
    
}

function detectCollision()
{
	
	if((carX + carWidth) > enemyCarX && carX < (enemyCarX + carWidth) && (enemyCarY + carHeight) > carY && (carY + carHeight) > enemyCarY)
	{
		flag = true;

		gameOver();
	}
}


function gameOver()
{
collideSound = new sound("sound/1.wav");
collideSound.play()
cxt.fillStyle = 'black';
cxt.fillRect(0,0,canvas.width,canvas.height);
cxt.font="30px Verdana";
var gradient=cxt.createLinearGradient(0,0,canvas.width,0);
gradient.addColorStop("0.3","green");
gradient.addColorStop("0.5","blue");
gradient.addColorStop("1.0","red");
// Fill with gradient
cxt.fillStyle=gradient;
cxt.fillText("Game over !!!!",50,100,200);
cxt.fillText("You Survived for " + survivalTime() + 'seconds' ,40,200);
console.log(survivalTime);
clearInterval(ref);



}

function survivalTime()
{
	var survivalTime = Date.now() - timer;
	return Math.floor(survivalTime/1000);
}

function loop()
{

ref = setInterval(function()
{

	cxt.clearRect(0,0,canvas.width,canvas.height);
	game();
 	// requestAnimationFrame(loop);
	console.log('requestId');	
	
}, 1000/60);

}		


window.onload = function()
{
	loop();
};











