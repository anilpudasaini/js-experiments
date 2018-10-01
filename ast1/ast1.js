var counter=0;
var isCounterupgrading= true;
function animate()
{
  if(isCounterupgrading)
  {
  	if (counter<=6)
  	{
  	counter++;
  	console.log(patternPrinter(counter));
  	
  	}
  	else
  	{
  		isCounterupgrading= false;
  		counter = 5;
  	}
  }
  		
  else if (isCounterupgrading  == false)
  {
  	
  	console.log(patternPrinter(counter));
  	counter--;

  	if (counter === 0)
  	{
  		isCounterupgrading=true;
  		counter = 1;
    }
  }
 

}




function patternPrinter(counter)
{
	tempString ='';
	for(i=1;i<=counter;i++)
	{
		tempString += '*';

	}
	return tempString;
}


setInterval(animate,500);