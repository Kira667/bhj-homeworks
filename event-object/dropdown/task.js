NodeList.prototype.addEventListener = function(type, listener, options = false) {
  for (let i = 0; i < this.length; i++) {
    this[i].addEventListener(type, listener, options);
  }
};

const dropdownNodes = document.querySelectorAll('.dropdown__item');
const dropdownValueNode = document.querySelector('.dropdown__value');
const dropdownListNode = document.querySelector('.dropdown__list');

dropdownValueNode.addEventListener('click', function(event) {
  dropdownListNode.classList.toggle('dropdown__list_active');
})

dropdownNodes.addEventListener('click', (event) => { // ЭТО ЦИКЛОМ ВСЕМ ПОСТАВИЛИ СЛУШАТЕЛЬ СОБЫТИЯ
  event.preventDefault();
  const target = event.target; // ЭТО ЭЛЕМЕНТ ИТЫЙ
  const textTarget = target.innerText;
  dropdownValueNode.innerText = textTarget;
  dropdownListNode.classList.remove('dropdown__list_active');
});

