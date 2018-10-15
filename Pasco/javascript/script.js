var leftArrow = document.getElementsByClassName('left-arrow')[0];
var rightArrow = document.getElementsByClassName('right-arrow')[0];
var sliderContent = document.getElementsByClassName('slider-content');
var noOfSlides = sliderContent.length;
var slideIndex = 1;
var index = 0;



function plusDivs(n){

  showDivs(slideIndex += n);

}

function showDivs(n) {

    var i;
    var x = document.getElementsByClassName("mySlides");
    if (n>x.length) {slideIndex = 1}
    if (n<1) {slideIndex = x.length}
    for(i=0; i<x.length; i++)
      {
        x[i].style.display = 'none';
      }

    x[slideIndex-1].style.display = 'block';
}

function hideOthers(ind) {
  for(var i=0; i<noOfSlides; i++){
    if(i != ind){
      sliderContent[i].style.display = 'none';
    }
  }

}


function gotoDiv(ind){
  // console.log('outside',noOfSlides, ind);
  if(ind >= noOfSlides || ind < 0){

    index = 0;
    sliderContent[index].style.display = 'block';
  }
  else{

    sliderContent[ind].style.display = 'block';
    index = ind;
  }
}


leftArrow.onclick = function(){
  index--;
  hideOthers(index);
  gotoDiv(index);
 

};

rightArrow.onclick = function(){
  index++;
  hideOthers(index);
  gotoDiv(index);

};

hideOthers(index);
showDivs(slideIndex);