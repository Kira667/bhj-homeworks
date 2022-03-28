const modalMainNode = document.querySelector('#modal_main');
const modalSuccessNode = document.querySelector('#modal_success');
const modalMainInfo = getChildNodes(modalMainNode);
const modalSuccessInfo = getChildNodes(modalSuccessNode);

modalMainInfo.modalNode.classList.add('modal_active');

modalMainInfo.btnContentNode.addEventListener('click', (e) => {
	modalMainInfo.modalNode.classList.remove('modal_active');
	modalSuccessInfo.modalNode.classList.add('modal_active');
});

modalMainInfo.btnCloseNode.addEventListener('click', (e) => {
	modalMainInfo.modalNode.classList.remove('modal_active');
});

modalSuccessInfo.btnCloseNode.addEventListener('click', (e) => {
	modalSuccessInfo.modalNode.classList.remove('modal_active');
});

modalSuccessInfo.btnContentNode.addEventListener('click', (e) => {
	modalSuccessInfo.modalNode.classList.remove('modal_active');
});



function getChildNodes(modalNode) {
	return {
		modalNode: modalNode,
		btnContentNode: modalNode.querySelector('.btn'),
		btnCloseNode: modalNode.querySelector('.modal__close_times')
	};
}
