const modalMain = document.querySelector('#modal_main');
const modalMainCloseBtn = modalMain.querySelector('.modal__close');
const modalMainShowSuccessBtn = modalMain.querySelector('.show-success');
const modalSuccess = document.querySelector("#modal_success");


modalMain.classList.add('modal_active');

modalMainCloseBtn.addEventListener('click', (e) => {
  modalMain.classList.remove('modal_active');
});

modalMainShowSuccessBtn.addEventListener('click', (e) => {
  modalSuccess.classList.add('modal_active');
});