const sliderArrowPrevNode = document.querySelector('.slider__arrow_prev');
const sliderArrowNextNode = document.querySelector('.slider__arrow_next');
const sliderItemNodes = Array.from(document.querySelectorAll('.slider__item'));

// (текущий индекс активной картинки + направление(+1 или -1) + длина массива) % длина массива
// это будет следующий индекс

sliderArrowPrevNode.addEventListener('click', () => {
  addAndSubtract(-1, sliderItemNodes);
});

sliderArrowNextNode.addEventListener('click', () => {
  addAndSubtract(1, sliderItemNodes);
});

// есть изначально массив картинок
// надо найти индекс в массиве для текущей активной картинки
// удалить класс slider__item_active у текущей активной картинки
// по формуле, нужной картинке по индексу добавить класс slider__item_active

function addAndSubtract(dir, images) {

  for (let i = 0; i < images.length; i++) {
    if (images[i].classList.contains('slider__item_active')) {
      images[i].classList.remove('slider__item_active');
      const nextIndex = (i + dir + images.length) % images.length;
      images[nextIndex].classList.add('slider__item_active');
      break;
    }
  
  }
}


// let b;
// if (true) {
//   const a = 3 ** 8;
//   b = a;
// }
  
// console.log(b);