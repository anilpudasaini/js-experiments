
window.onload = function() {
  const canvas = document.getElementById('canvas');
  const cxt = canvas.getContext('2d');
  const GRAVITY = 1.5;
  const width = canvas.width 
  const height = canvas.height
  const bird = new Image();
  const bg = new Image();
  const fg = new Image();
  const pipeNorth = new Image();
  const pipeSouth = new Image();
  let player;
  const pipe = [];
  const gap = 90;
  let score = 0;
  const flyAudio = new Audio();
  const scoreAudio = new Audio();
  let flag = false;

  pipe[0] = {
      x : width,
      y : 0
  }


  
  class flappyBird {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.velY = 2;
      this.liftUp = this.liftUp.bind(this);
      this.gameOver = this.gameOver.bind(this);
    }


    gameOver()
    {
        cxt.fillStyle = "#000";
        cxt.font = "20px Verdana";
        cxt.fillText("Score : "+score,10,height/20);
        
    }
    
    render() 
    {
    bg.src = "images/bg.png";
    fg.src = "images/fg.png";
    bird.src = "images/bird.png";
    pipeNorth.src = "images/pipeNorth.png";
    pipeSouth.src = "images/pipeSouth.png";


    cxt.drawImage(bg,0,0);
    cxt.drawImage(bird,this.x,this.y);

    for(let i = 0; i < pipe.length; i++){
        
         let constant = pipeNorth.height+gap;
             
        pipe[i].x--;
        
        if( pipe[i].x == 125 ){
            pipe.push({
                x : width + 10,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            }); 
      }


    cxt.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
    cxt.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);

        if( this.x + bird.width >= pipe[i].x && this.x <= pipe[i].x + pipeNorth.width && (this.y <= pipe[i].y + pipeNorth.height || this.y+bird.height >= pipe[i].y+constant) || this.y + bird.height >=  height - fg.height){
           
           flag = true;
          location.reload(); // reload the page
        }
        
        if(pipe[i].x == 5){
            score++;
            scoreAudio.play();
        }


    }
    
    cxt.drawImage(fg,0,height-fg.height);

    }
    
    update() {

      document.addEventListener('keydown', this.liftUp)
      this.y += GRAVITY;
       }
      // width --;

 
  

    liftUp()
    {
      this.y -= 40;
      flyAudio.play();
      
    }


    changeScore()
    {
        cxt.fillStyle = "#000";
        cxt.font = "20px Verdana";
        cxt.fillText("Score : "+score,10,height-20);
    }



    }
  
  
  function setup() {
     player = new flappyBird(0,Math.random() * height - (fg.height+20));
     flyAudio.src = "sounds/fly.mp3";
     scoreAudio.src = "sounds/score.mp3";
     // debugger;
  }
  
  function draw() {

      player.render();
      player.update();
      player.changeScore();

  
  }
  
  function _draw() {
    draw();
    // if(flag === true)
    // {
    //   window.cancelAnimationFrame(_draw);
    //   player.gameOver();
    // }
    window.requestAnimationFrame(_draw);
  }
  
  setup();
  _draw();
}