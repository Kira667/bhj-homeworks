const productNodes = Array.from(document.querySelectorAll('.product'));
const productObjArr = productNodes.map(getProductChildNodes);
const cartProductsNode = document.querySelector('.cart__products');

const cart = [
];


for (const productObj of productObjArr) {


	productObj.incNode.addEventListener('click', (e) => {
		productObj.value += 1;
		productObj.valueNode.innerText = productObj.value;
	});

	productObj.decNode.addEventListener('click', (e) => {

		if (productObj.value >= 2) {
			productObj.value -= 1;
		}

		productObj.valueNode.innerText = productObj.value;
	})

	productObj.addNode.addEventListener('click', (e) => {
		const count = productObj.value;
		const imgSrc = productObj.imageNode.src;
		const id = productObj.id;

		addProductToCart({
			id: productObj.id,
			imgSrc: productObj.imageNode.src,
			count: productObj.value,
			cart: cart
		});
	});

}

function createCartProductNode(id, imgSrc, count) {
	const cartProductNode = document.createElement('div');
	cartProductNode.classList.add('cart__product');
	cartProductNode.setAttribute('data-id', id);

	cartProductNode.innerHTML = `
		<img class="cart__product-image" src="${imgSrc}">
		<div class="cart__product-count">${count}</div>
	`;

	return cartProductNode;
}

function setCountToCartProductNode(cartProductNode, count) {
	const cartProductCountNode = cartProductNode.querySelector('.cart__product-count');
	cartProductCountNode.textContent = count;
}

function addProductToCart({id, imgSrc, count, cart}) {
	const cartFindIdx = cart.findIndex(item => item.id === id);

	if (cartFindIdx === -1) { // элемента нету в массиве
		const cartProductNode = createCartProductNode(id, imgSrc, count);
		cart.push({
			id: id,
			cartProductNode: cartProductNode,
			count: count
		});
		cartProductsNode.append(cartProductNode);
	} else { // элемент есть в массиве
		const cartProductObj = cart[cartFindIdx];
		const cartProductNode = cartProductObj.cartProductNode;
		const lastCount = cartProductObj.count;
		const newCount = lastCount + count;
		cartProductObj.count = newCount;
		setCountToCartProductNode(cartProductNode, newCount);
	}
}















function getProductChildNodes(productNode) {

	const valueNode = productNode.querySelector('.product__quantity-value');

	return {
		imageNode: productNode.querySelector('.product__image'),
		valueNode: valueNode,
		decNode: productNode.querySelector('.product__quantity-control_dec'),
		incNode: productNode.querySelector('.product__quantity-control_inc'),
		addNode: productNode.querySelector('.product__add'),
		id: Number(productNode.getAttribute('data-id')),
		value: Number(valueNode.innerText)
	};
}


