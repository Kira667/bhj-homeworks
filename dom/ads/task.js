class Rotator {

  #node = null;
  #rotatorCaseActiveItem = null;
  #hoveredAudio = false;
  #timeToEndAnimation = null;
  #arrNodes = null;
  #rotatorData = null;
  #audio = new Audio();

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

    try {

      this.#node = document.querySelector(selector);
      this.#arrNodes = this.#createRotatorCaseArrNodes(rotatorData);
      this.#rotatorData = rotatorData;
      this.#insertChildIntoParent(this.#arrNodes, this.#node);
      this.#drawCycle(this.#arrNodes, rotatorData, null);

    } catch(err) {
      console.error(err);
    }
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

    if (this.#rotatorCaseActiveItem === null) {
      throw new Error('необходимо передавать в массиве один объект с ключом "active"');
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
    rotatorCaseNode.style.setProperty('--color', rotatorDataItem.color);
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

  #drawCycle(arrNodes, rotatorData, duration = null) { // цикл отрисовки слов
    const activeItem = this.#rotatorCaseActiveItem;
    const dataItemSpeed = duration === null ? activeItem.dataItem.speed : duration; // если duration === null, то выбрать время из activeItem, иначе взять время duration
    const activeItemNode = activeItem.node;
    let prescenceAudio = false;    

    if ('audio' in activeItem.dataItem) {
      prescenceAudio = true;
      activeItemNode.onmouseover = this.#eventMouseOverRotatorCase.bind(this);
      activeItemNode.onmouseout = this.#eventMouseOutRotatorCase.bind(this);
      activeItemNode.onclick = this.#eventMouseClickRotatorCase.bind(this);
    }

    animate({
      timing(timeFraction) {
        return timeFraction;
      },
      duration: dataItemSpeed,
      draw: (progress, currentTime, timeToEnd) => {
        
        if (this.#hoveredAudio) { // если наведено на аудио
          this.#timeToEndAnimation = timeToEnd;
          return false;
        }

        if (progress === 1) {
          this.#nextActiveItem(arrNodes, rotatorData);
          this.#drawCycle(arrNodes, rotatorData, null);
        }

        this.#setPercentInRotatorCaseNode(activeItemNode, progress);
        
        return true;
      },
      finallyDraw: (progress, currentTime, timeToEnd) => {
      }
    });

  }

  #setPercentInRotatorCaseNode(node, percent) { // percent от 0 до 1
    const percentRound = Math.round(percent * 100);
    node.style.setProperty('--percent', percent);
    node.style.setProperty('--percentText', JSON.stringify(`${percentRound} %`));
  }

  #eventMouseOverRotatorCase(event) {
    
    this.#hoveredAudio = true;
  };

  #eventMouseOutRotatorCase(event) {
    this.#hoveredAudio = false;
    const srcAudio = this.#rotatorCaseActiveItem.dataItem.audio;
    this.#stopAudio(srcAudio);
    this.#drawCycle(this.#arrNodes, this.#rotatorData, this.#timeToEndAnimation);
  };

  #eventMouseClickRotatorCase(event) {
    console.log(this);
    const srcAudio = this.#rotatorCaseActiveItem.dataItem.audio;
    this.#playAudio(srcAudio);
  }

  #playAudio(src) {
    this.#audio.muted = true;
    this.#audio.pause();
    this.#audio.src = src;
    this.#audio.currentTime = 0;
    this.#audio.play();
    this.#audio.muted = false;
  }

  #stopAudio(src) {
    this.#audio.pause();
    this.#audio.muted = true;
    this.#audio.currentTime = 0;
  }

}

const rotatorData = [
  { speed: 1000, color: 'blue', text: 'Бог JS', active: true },
  { speed: 2000, color: 'green', text: 'Лучший программист на земле' },
  { speed: 1000, color: 'tomato', text: 'покорю этот мир' },
  { speed: 1000, color: 'cyan', text: 'учусь в Нетологии' },
  { speed: 5000, color: 'red', text: 'счастливый как никто', audio: 'ya_schastliviy.mp3' },
  { speed: 1000, color: 'red', text: 'радуюсь жизни' },
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

    const timeToEnd = duration - currentTime;

    // вычисление текущего состояния анимации
    let progress = timing(timeFraction);

    const drawBoolean = draw(progress, currentTime, timeToEnd); // отрисовать её

    if (drawBoolean === false || timeFraction === 1) {
      finallyDraw(progress, currentTime, timeToEnd);
    }

    if (timeFraction < 1 && drawBoolean === true) {
      requestAnimationFrame(animate);
    }
  });
}

