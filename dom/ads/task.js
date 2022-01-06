class Rotator {

  #node = null;

  /**
 * @constructor
 * @param {Object[]} rotatorData Массив изображений
 * @param {number} rotatorData[].speed скорость смены рекламы
 * @param {string} rotatorData[].color цвет рекламы
 * @param {string} rotatorData[].text текст рекламы
 * @param {string | undefined} rotatorData[].audio alt картинки
 * @param {string} selector селектор, куда вставим rotator
 * @param {number} activeIndex активный индекс при старте в rotator
 */
  constructor(rotatorData, selector, activeIndex) {
    this.#node = document.querySelector(selector);
    
  }
}

const rotatorData = [
  { speed: 1000, color: 'red', text: 'Бог JS' },
  { speed: 1000, color: 'red', text: 'Бог JS' },
  { speed: 1000, color: 'red', text: 'Бог JS' },
  { speed: 1000, color: 'red', text: 'Бог JS' },
  { speed: 500, color: 'blue', text: 'счастливый как никто', audio: 'ya_schastliviy.mp3' },
  { speed: 1000, color: 'red', text: 'Бог JS' }
];

const rotator = new Rotator(rotatorData, '.rotator', 0);

