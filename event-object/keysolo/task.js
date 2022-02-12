class Game {

  /** 
   * @type {Element}
   */
  container = null;
  
  /** 
   * @type {Element}
   */
  wordElement = null;

  /** 
   * @type {Element}
   */
  winsElement = null;

  /** 
   * @type {Element}
   */
  lossElement = null;

  /** 
   * @type {string}
   */
  currentSymbol = null;

  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');

    this.reset();

    this.registerEvents();
  }

  reset() {
    this.setNewWord();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
  }

  registerEvents() {

    window.addEventListener('keypress', (event) => {

      /** 
       * @type {string}
       */
      const keyCurrentSymbolNode = this.currentSymbol.innerText.toLowerCase();
      const keyKeyboard = event.key.toLowerCase();

      console.log(keyCurrentSymbolNode, 'keyCurrentSymbolNode');
      console.log(keyKeyboard, 'keyKeyboard');

      console.log(keyCurrentSymbolNode === keyKeyboard);
      if (keyCurrentSymbolNode === keyKeyboard) {
        this.success();
      } else {
        this.fail();
      }

    });

    /*
      TODO:
      Написать обработчик события, который откликается
      на каждый введённый символ.
      В случае правильного ввода слова вызываем this.success()
      При неправильном вводе символа - this.fail();
     */
  }

  success() {
    this.currentSymbol.classList.add('symbol_correct');
    this.currentSymbol = this.currentSymbol.nextElementSibling;
    if (this.currentSymbol !== null) {
      return;
    }

    if (++this.winsElement.textContent === 10) {
      setTimeout(() => {
        alert('Победа');
        this.reset();
      }, 0);
    }
    this.setNewWord();
  }

  fail() {
    if (++this.lossElement.textContent === 5) {
      alert('Вы проиграли!');
      this.reset();
    }
    this.setNewWord();
  }

  setNewWord() {
    const word = this.getWord();

    this.renderWord(word);
  }

  getWord() {
    const words = [
        'Я big baby',
        // 'bob',
        // 'awesome',
        // 'netology',
        // 'hello',
        // 'kitty',
        // 'rock',
        // 'youtube',
        // 'popcorn',
        // 'cinema',
        // 'love',
        // 'javascript'
      ],
      index = Math.floor(Math.random() * words.length);

    return words[index];
  }

  renderWord(word) {
    const html = [...word]
      .map(
        (s, i) =>
          `<span class="symbol ${i === 0 ? 'symbol_current': ''}">${s}</span>`
      )
      .join('');
    this.wordElement.innerHTML = html;

    this.currentSymbol = this.wordElement.querySelector('.symbol_current');
  }
}

new Game(document.getElementById('game'))

