// const menuLinks = document.querySelectorAll(".menu__link"); // NodeList коллекция DOM элементов по селектору ".menu__link"

// for (let i = 0; i < menuLinks.length; i++) {
//   // цикл по коллекции элементов с классом ".menu__link"
//   // console.log(menuLinks[i]);
//   menuLinks[i].addEventListener("click", (e) => {
//     // добавляет слушатель события на каждый элемент с классом ".menu__link"

//     const menu = findMenu(menuLinks, i); // нашли меню

//     if (menu !== null) {
//       // если меню найдено в дереве
//       e.preventDefault(); // отменяет действие браузера по умолчанию (в данном случае: по ссылкам нельзя перейти)
//       openMenu(menuLinks, i);
//     }
//   });
// }

// /**
//  * Функция для открытия меню
//  * @param {NodeListOf<Element>} menuLinks - NodeList коллекция DOM элементов по селектору ".menu__link"
//  * @param {number} i - индекс menuLinks ссылки, на которую кликнули
//  */
// function openMenu(menuLinks, i) {
//   const menu = findMenu(menuLinks, i);
//   const allMenuFind = Array.from(menuLinks).map((item, i) => {
//     return findMenu(menuLinks, i);
//   }); // тут были ссылки, пропустили через функцию map, если нашли меню, то там меню, если не нашли, то null
//   const allMenu = allMenuFind.filter((item) => item !== null); // тут все меню
//   console.log(allMenu);

//   if (menu.classList.contains("menu_active")) {
//     // удаляет класс, если он существует или добавляет, если не существует
//     menu.classList.remove("menu_active");
//   } else {
//     for (let i = 0; i < menuLinks.length; i++) {
//       const findedMenu = findMenu(menuLinks, i);
//       if (findedMenu !== null) {
//         findedMenu.classList.remove("menu_active");
//       }
//     }

//     menu.classList.add("menu_active");
//   }
// }

// /**
//  * Функция для нахождения меню
//  * @param {NodeListOf<Element>} menuLinks - NodeList коллекция DOM элементов по селектору ".menu__link"
//  * @param {number} i - индекс menuLinks ссылки, от которой будем искать menu_sub
//  */
// function findMenu(menuLinks, i) {
//   return menuLinks[i].parentNode.querySelector(".menu_sub");
// }

class Menu {
  #menuLinks = null;

  constructor({selectorMenu, selectorLink}) {
    const menu = document.querySelector(selectorMenu);
    this.#menuLinks = menu.querySelectorAll(selectorLink);
    this.#initialEventListeners(this.#menuLinks);
  }

  #initialEventListeners(menuLinks) {
    for (let i = 0; i < menuLinks.length; i++) {
      // цикл по коллекции элементов с классом ".menu__link"
      menuLinks[i].addEventListener("click", (event) => {
        this.#eventClickMenu(event, menuLinks, i);
      });
    }
  }

  #eventClickMenu(event, menuLinks, i) {
    // добавляет слушатель события на каждый элемент с классом ".menu__link"

    const menu = this.#findMenu(menuLinks, i); // нашли меню

    if (menu !== null) {
      // если меню найдено в дереве
      event.preventDefault(); // отменяет действие браузера по умолчанию (в данном случае: по ссылкам нельзя перейти)

      this.#openMenu(menuLinks, i);
    }
  }

  #openMenu(menuLinks, i) {
    const menu = this.#findMenu(menuLinks, i);
    const allMenuFind = Array.from(menuLinks).map((item, i) => {
      return this.#findMenu(menuLinks, i);
    }); // тут были ссылки, пропустили через функцию map, если нашли меню, то там меню, если не нашли, то null
    const allMenu = allMenuFind.filter((item) => item !== null); // тут все меню

    if (menu.classList.contains("menu_active")) {
      // удаляет класс, если он существует или добавляет, если не существует
      menu.classList.remove("menu_active");
    } else {
      for (let i = 0; i < menuLinks.length; i++) {
        const findedMenu = this.#findMenu(menuLinks, i);
        if (findedMenu !== null) {
          findedMenu.classList.remove("menu_active");
        }
      }

      menu.classList.add("menu_active");
    }
  }

  #findMenu(menuLinks, i) {
    return menuLinks[i].parentNode.querySelector(".menu_sub");
  }
}

const menu = new Menu({
  selectorLink: '.menu__link',
  selectorMenu: '.menu_main'
});

const menu1 = new Menu({
  selectorLink: '.menu__link',
  selectorMenu: '.menu_extra'
});