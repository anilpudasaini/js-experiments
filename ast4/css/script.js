 
 init();

var container = document.getElementsByClassName('container')[0];
var buttonR = document.createElement('span');
var buttonL = document.createElement('span');


buttonR.style.width='100px';
buttonR.style.height='110px';
buttonR.style.position='absolute';
// buttonR.innerHTML='>';
buttonR.style.top ='45%';
buttonR.style.marginTop ='-25px';
buttonR.style.right ='0px';
buttonR.style.opacity = '0.5';
buttonR.style.backgroundImage = "url('images/right-arrow.png')";


buttonL.style.width='100px';
buttonL.style.height='110px';
buttonL.style.position='absolute';
// buttonL.innerHTML='<';
buttonL.style.top ='45%';
buttonL.style.marginTop ='-25px';
buttonL.style.opacity ='0.5';
buttonL.style.backgroundImage = "url('images/left-arrow.png')";


container.appendChild(buttonR);
container.appendChild(buttonL);



	




var imageWrapper = document.getElementsByClassName('image-wrapper')[0];
var index = 0,
	currentIndex = 0,
	imgWidth = 1000,
	noPictures = 4;
var images = document.getElementsByTagName('img');
var maxMargin = (noPictures+1) * imgWidth - imgWidth;


console.log(images);

   function gotoImage(index)
   {	
   	return (imageWrapper.style.left = - index * imgWidth + 'px');
   }



   function indexExplorer(noPictures)
   {
   	if( index < noPictures )
   	{	
   		index++;
   		gotoImage(index);
   		console.log(index);
   		currentIndex = index;

   	}
   	else if ( index >= noPictures )
   	{
   		index = 0;
   		gotoImage (index);
   		currentIndex = index;

   	}


   }

	// setInterval(function()
 //   {

 //   	indexExplorer(noPictures);
 //   	console.log ('i am here');
 //   },2000);	





var direction = -1;
var frames = 0;

   function transition()
   {
   		frames += direction * 5;
   		imageWrapper.style.left = frames + 'px'; 

   		if (frames > 0)
   		{
   			direction = -1;
   			// console.log(direction);
   		}
   		else if(frames <= -maxMargin){
   			direction = 1;
   			// console.log(direction);
   		}
   		console.log(frames);

       if(frames % 1000 === 0){
       	// console.log('from here :D');
   			ref2 = setTimeout(function()
   			{
   			clearInterval(ref);
   			setTimeout(function(){
   				init();
   			},1000);	
   			},0);
   		}
   	}

   	function init()
   		{
			// clearInterval(ref2);
			ref = setInterval(transition,10);
   		}

   
   buttonL.onclick = function()
   {	
   	clearInterval(ref);
   	// clearInterval(ref2);

   	 console.log(currentIndex);
   	 if (currentIndex <= 0)
   	 {
   	 	gotoImage(noPictures);
   	 	currentIndex = noPictures;
   	 }
   	 else
   	 {
   	 	currentIndex--;
   	 	gotoImage(currentIndex);
   	 }

   }


   buttonR.onclick = function()
   {	
   	clearInterval(ref);

   	// clearInterval(ref2);
   	 currentIndex++;
   	 console.log(currentIndex + 'outside');
   	 if (currentIndex > noPictures)
   	 {
   	 	gotoImage(0);
   	 	currentIndex = 0;

   	 }
   	 else
   	 {	
   	 	gotoImage(currentIndex);
   	 	console.log('inside');
   	 }

   }
