class Slider {

  #node = null;
  allNodes = null;
  activeItem = {
    sliderItemNode: null,
    sliderDotNode: null,
    i: null
  };

  get sliderItemActiveClass() {
    return 'slider__item_active';
  }
  get sliderDotActiveClass() {
    return 'slider__dot_active';
  }
  get node() {
    return this.#node; // это слайдер в дереве
  }
/**
 * @constructor
 * @param {Object[]} images Массив изображений
 * @param {string} images[].url url картинки
 * @param {string} images[].alt alt картинки
 * @param {string} selector селектор, куда вставим slider
 */
  constructor(images, selector, activeIndex) {

    if (activeIndex > images.length - 1) {
      throw new Error('activeIndex больше, чем возможный индекс элемента в массиве images');
    }
    
    this.#node = document.querySelector(selector);

    this.allNodes = this.#createSliderNode(images, activeIndex);
    this.#insertChildIntoParent(this.allNodes.resultNode, this.#node);

  }

  #createSliderNode(images, activeIndex) {
    const resultNode = document.createElement('div');

    const sliderNavigationNode = this.#createNode('div', ['slider__navigation']);
    const sliderArrowsWrapperNode = this.#createNode('div', ['slider__arrows']);
    const sliderArrowPrevNode = this.#createNode('div', ['slider__arrow', 'slider__arrow_prev']);
    const sliderArrowNextNode = this.#createNode('div', ['slider__arrow', 'slider__arrow_next']);

    sliderArrowPrevNode.innerText = '<';
    sliderArrowNextNode.innerText = '>';

    sliderArrowsWrapperNode.append(sliderArrowPrevNode, sliderArrowNextNode);
    sliderNavigationNode.append(sliderArrowsWrapperNode);

    const sliderDotsWrapperNode = this.#createNode('div', ['slider__dots']);
    const sliderItemsWrapperNode = this.#createNode('div', ['slider__items']);

    const sliderDotsArrNodes = [];
    const sliderItemArrNodes = [];
    const sliderImageArrNodes = [];

    for (let i = 0; i < images.length; i++) {
      const sliderItemNode = this.#createNode('div', ['slider__item']);
      const sliderDotNode = this.#createNode('div', ['slider__dot']);
      const sliderImageNode = this.#createNode('img', ['slider__image'], [{name: 'src', value: images[i].url}, {name: 'alt', value: images[i].alt}]);

      if (i === activeIndex) {
        sliderItemNode.classList.add(this.sliderItemActiveClass);
        sliderDotNode.classList.add(this.sliderDotActiveClass);
        this.activeItem = {
          sliderItemNode,
          sliderDotNode,
          i
        };
      }

      sliderItemArrNodes.push(sliderItemNode);
      sliderDotsArrNodes.push(sliderDotNode);
      sliderImageArrNodes.push(sliderImageNode);

      sliderItemNode.append(sliderImageNode);
      sliderItemsWrapperNode.append(sliderItemNode);
      sliderDotsWrapperNode.append(sliderDotNode);
    }
    
    sliderNavigationNode.append(sliderDotsWrapperNode);
    resultNode.append(sliderItemsWrapperNode);
    resultNode.append(sliderNavigationNode);

    sliderArrowNextNode.addEventListener('click', (e) => this.#eventClickArrow(1, sliderItemArrNodes, sliderDotsArrNodes));
    sliderArrowPrevNode.addEventListener('click', (e) => this.#eventClickArrow(-1, sliderItemArrNodes, sliderDotsArrNodes));

    return {
      resultNode,
      sliderNavigationNode,
      sliderArrowsWrapperNode,
      sliderArrowPrevNode,
      sliderArrowNextNode,
      sliderDotsArrNodes,
      sliderItemArrNodes,
      sliderDotsWrapperNode,
      sliderItemsWrapperNode,
      sliderImageArrNodes
    };
  }

  #insertChildIntoParent(child, parent) {
    parent.innerText = '';
    parent.append(child);
  }

  #createNode(nodeName, cssClassesArray = [], attributes = []) {
    const node = document.createElement(nodeName);
    node.classList.add(...cssClassesArray);
    for (const attribute of attributes) {
      node.setAttribute(attribute.name, attribute.value);
    }
    return node;
  }

  #eventClickArrow(dir, sliderItems, sliderDots) {
    for (let i = 0; i < sliderItems.length; i++) {
      if (sliderItems[i].classList.contains(this.sliderItemActiveClass)) {
        sliderItems[i].classList.remove(this.sliderItemActiveClass);
        sliderDots[i].classList.remove(this.sliderDotActiveClass);

        const nextIndex = (i + dir + sliderItems.length) % sliderItems.length;
        const nextSliderItem = sliderItems[nextIndex];
        const nextSliderDot = sliderDots[nextIndex];

        nextSliderItem.classList.add(this.sliderItemActiveClass);
        nextSliderDot.classList.add(this.sliderDotActiveClass);

        this.activeItem = {
          sliderItemNode: nextSliderItem,
          sliderDotNode: nextSliderDot,
          i: nextIndex
        };

        break;
      }
    }

  }
}

const images = [
  { url: 'https://i.postimg.cc/Gpp6ryr0/180103-ufo-illustration-mn-1015-0758c11fb1637ed3431613cef06cd246.jpg', alt: 'картинка-1' },
  { url: 'https://i.postimg.cc/rwj7v9BC/8ea2eb98-6cce-4f9f-96f0-60652623cf8e-large16x9-MGNgraphic-UFO-7.jpg', alt: 'картинка-2' },
  { url: 'https://i.postimg.cc/YqKcg0Ng/baa78e55168b70c08147f44f0d66cd0e.jpg', alt: 'картинка-3' },
  { url: 'https://i.postimg.cc/DwntjNMw/HV-UFO-1983-ftr.jpg', alt: 'картинка-4' },
  { url: 'https://i.postimg.cc/yNrtN8YD/istock-611295678.jpg', alt: 'картинка-5' }
];

const slider1 = new Slider(images, '.slider', 0);
// console.log(slider1);
