let slidePosition = 0; //index of current viewed slide
const slides = document.getElementsByClassName('carousel__item');
const totalSlides = slides.length;

document.
  getElementById('carousel__button--next')
  .addEventListener("click", function() { //onclick move to next slide
    document.getElementById('carousel__button--prev').style.backgroundColor = "#D3D3D3"
    document.getElementById('carousel__button--next').style.backgroundColor = "orange"
    moveToNextSlide();
  });
document.
  getElementById('carousel__button--prev')
  .addEventListener("click", function() {
    document.getElementById('carousel__button--next').style.backgroundColor = "#D3D3D3"
    document.getElementById('carousel__button--prev').style.backgroundColor = "orange"
    moveToPrevSlide(); //onclick listener for move to prev function
  });

/*set all slides to have class of hidden,
finally set slide at slidePosition to be of class visible*/ 
function updateSlidePosition() {
  for (let slide of slides) {
    slide.classList.remove('carousel__item--visible');
    slide.classList.add('carousel__item--hidden');
  }

  slides[slidePosition].classList.add('carousel__item--visible');
}

function moveToNextSlide() {
  if (slidePosition === totalSlides - 1) {
    slidePosition = 0;
  } else {
    slidePosition++;
  }

  updateSlidePosition();
}

function moveToPrevSlide() {
  if (slidePosition === 0) {
    slidePosition = totalSlides - 1;
  } else {
    slidePosition--;
  }

  updateSlidePosition();
}