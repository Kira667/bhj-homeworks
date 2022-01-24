class Rotator {

  #node = null;
  #rotatorCaseActiveItem = {
    node: null,
    index: null,
    dataItem: null
  };

  get node() {
    return this.#node; // это слайдер в дереве
  }

  get rotatorCaseActiveClass() {
    return 'rotator__case_active';
  }

  get rotatorCaseClass() {
    return 'rotator__case';
  }

  get rotatorCaseActiveItem() {
    return this.#rotatorCaseActiveItem;
  }


/**
 * @constructor
 * @param {Object[]} rotatorData Массив изображений
 * @param {number} rotatorData[].speed скорость смены рекламы
 * @param {string} rotatorData[].color цвет рекламы
 * @param {string} rotatorData[].text текст рекламы
 * @param {boolean} rotatorData[].active активный элемент по умолчанию
 * @param {string | undefined} rotatorData[].audio секретное аудио
 * @param {string} selector селектор, куда вставим rotator
 */
  constructor(rotatorData, selector) {
    this.#node = document.querySelector(selector);
    const arrNodes = this.#createRotatorCaseArrNodes(rotatorData);
    this.#insertChildIntoParent(arrNodes, this.#node);
    this.#drawCycle(arrNodes, rotatorData);
  }

/**
 * @param {Object[]} rotatorData Массив изображений
 * @param {number} rotatorData[].speed скорость смены рекламы
 * @param {string} rotatorData[].color цвет рекламы
 * @param {string} rotatorData[].text текст рекламы
 * @param {boolean} rotatorData[].active активный элемент по умолчанию
 * @param {string | undefined} rotatorData[].audio секретное аудио
 */
  #createRotatorCaseArrNodes(rotatorData) {
    const rotatorCaseArrNodes = [];

    for (let i = 0; i < rotatorData.length; i++) {
      const rotatorCaseNode = document.createElement('span');
      rotatorCaseArrNodes.push(rotatorCaseNode);
      rotatorCaseNode.classList.add(this.rotatorCaseClass);

      if (rotatorData[i].active === true) {
        this.#setRotatorCaseActive(rotatorCaseArrNodes, i, rotatorData[i]);
      }

      rotatorCaseNode.setAttribute('data-color', rotatorData[i].color);
      rotatorCaseNode.setAttribute('data-speed', rotatorData[i].speed);
      
      if (typeof rotatorData[i].audio === 'string') {
        rotatorCaseNode.setAttribute('data-audio', rotatorData[i].audio);
      }

      rotatorCaseNode.textContent = rotatorData[i].text;

    }
    
    return rotatorCaseArrNodes;
  }

  #insertChildIntoParent(child, parent) {
    parent.innerText = '';
    if (Array.isArray(child)) { // если это массив
      parent.append(...child);
    } else { // иначе
      parent.append(child);
    }
  }

  #setRotatorCaseActive(arrNodes, index, rotatorDataItem) {
    const rotatorCaseNode = arrNodes[index];

    rotatorCaseNode.classList.add(this.rotatorCaseActiveClass);
    rotatorCaseNode.textContent = rotatorDataItem.text;
    rotatorCaseNode.style.color = rotatorDataItem.color;
    this.#rotatorCaseActiveItem = {
        node: rotatorCaseNode,
        index: index,
        dataItem: rotatorDataItem
    };

  }

  #nextActiveItem(arrNodes, rotatorData) {
    const activeItem = this.#rotatorCaseActiveItem;
    const lastNode = activeItem.node;
    const lastIndex = activeItem.index;
    lastNode.classList.remove(this.rotatorCaseActiveClass);

    if (lastIndex + 1 === rotatorData.length) { // если это последний элемент массива, то переходить к нулевому элементу
      const newIndex = 0;
      this.#setRotatorCaseActive(arrNodes, newIndex, rotatorData[newIndex]);
    } else {
      const newIndex = lastIndex + 1;
      this.#setRotatorCaseActive(arrNodes, newIndex, rotatorData[newIndex]);
    }
  }

  #drawCycle(arrNodes, rotatorData) { // цикл отрисовки слов
    // const activeItem = this.#rotatorCaseActiveItem;
    // console.log(activeItem);
    // setTimeout(() => {
    //   this.#nextActiveItem(arrNodes, rotatorData);
    //   this.#drawCycle(arrNodes, rotatorData);
    // }, activeItem.dataItem.speed);

    const activeItem = this.#rotatorCaseActiveItem;
    const dataItemSpeed = activeItem.dataItem.speed;
    const activeItemNode = activeItem.node;
  
    let prescenceAudio = false;    

    if ('audio' in activeItem.dataItem) {
      prescenceAudio = true;
      activeItemNode.addEventListener('mousemove', this.#eventHoverRotatorCase);
    }

    animate({
      timing(timeFraction) {
        return timeFraction;
      },
      duration: dataItemSpeed,
      draw: (progress, currentTime) => {
        
        this.#setPercentInRotatorCaseNode(activeItemNode, progress);
        
        return true;
      },
      finallyDraw: (progress, currentTime) => {

        if (prescenceAudio === true) {
          activeItemNode.removeEventListener('mousemove', this.#eventHoverRotatorCase);
        }

        this.#nextActiveItem(arrNodes, rotatorData);
        this.#drawCycle(arrNodes, rotatorData);
      }
    });

  }

  #setPercentInRotatorCaseNode(node, percent) { // percent от 0 до 1
    const percentRound = Math.round(percent * 100);
    node.style.setProperty('--percent', percent);
    node.style.setProperty('--percentText', JSON.stringify(`${percentRound} %`));
  }

  #eventHoverRotatorCase = (event) => {
    console.log('наведение на аудио');

  };

}

const rotatorData = [
  { speed: 2000, color: 'blue', text: 'Бог JS', active: true },
  { speed: 2000, color: 'green', text: 'Бог JS' },
  { speed: 2000, color: 'tomato', text: 'Бог JS' },
  { speed: 2000, color: 'cyan', text: 'Бог JS' },
  { speed: 5000, color: 'red', text: 'счастливый как никто', audio: 'ya_schastliviy.mp3' },
  { speed: 2000, color: 'orange', text: 'Бог JS' }
];

const rotator = new Rotator(rotatorData, '.rotator');

function animate({timing, draw, duration, finallyDraw}) {

  let start = performance.now();

  requestAnimationFrame(function animate(time) {

    let currentTime = time - start;
    // timeFraction изменяется от 0 до 1
    if (currentTime < 0) currentTime = 0;
    let timeFraction = currentTime / duration;
    if (timeFraction > 1) timeFraction = 1;

    // вычисление текущего состояния анимации
    let progress = timing(timeFraction);

    const drawBoolean = draw(progress, currentTime); // отрисовать её

    if (drawBoolean === false || timeFraction === 1) {
      finallyDraw(progress, currentTime);
    }

    if (timeFraction < 1 && drawBoolean === true) {
      requestAnimationFrame(animate);
    }
  });
}

// let start = null;
// const element = document.getElementById('superId');

// function step(timestamp) {
  
//   if (start === null) {
//     start = timestamp;
//   };
//   const progress = timestamp - start;
//   console.log(progress);
//   element.style.transform = 'translateX(' + progress / 10 + 'px)';
//   if (progress < 2000) {
//     requestAnimationFrame(step);
//   }

// }

// requestAnimationFrame(step);

