/**

 * Функция возвращает true , если элемент виден в видимой части экрана
 * @param {HTMLElement} el - Проверяемый DOM элемент
 * @returns {boolean}

 */
function isScrolledIntoView(el) {
  const rect = el.getBoundingClientRect();
  const elemTop = rect.top;
  const elemBottom = rect.bottom;
  
  // Only completely visible elements return true:
  const isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
  // Partially visible elements return true:
  //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
  return isVisible;
}

/**

 * Функция для скролла
 * @param {Event} event - событие скролла
 * @param {NodeListOf<Element>} revealNodes

 */
function handlerEventScroll(event, revealNodes) {
  for (let i = 0; i < revealNodes.length; i++) {
    const revealNode = revealNodes[i]; // это DOM элемент, не массив
    if (isScrolledIntoView(revealNode)) {
      revealNode.classList.add('reveal_active');
    } else {
      revealNode.classList.remove('reveal_active');
    }
  }
}

const revealNodes = document.querySelectorAll('.reveal');

window.addEventListener('scroll', (event) => {
  handlerEventScroll(event, revealNodes);
});

