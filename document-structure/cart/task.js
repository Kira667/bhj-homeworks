const productNodes = Array.from(document.querySelectorAll('.product'));
const productObjArr = productNodes.map(getProductChildNodes);
const cartProductsNode = document.querySelector('.cart__products');

const cartMap = new Map();


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

		addProductToCart({
			id: productObj.id,
			imgSrc: productObj.imageNode.src,
			count: productObj.value,
			cartMap: cartMap,
			cartProductsNode: cartProductsNode
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

function addProductToCart({id, imgSrc, count, cartMap, cartProductsNode}) {

	if (cartMap.get(id)) { // такой элемент существует в структуре Map
		const cartProductObj = cartMap.get(id);
		const cartProductNode = cartProductObj.cartProductNode;
		const lastCount = cartProductObj.count;
		const newCount = lastCount + count;
		cartProductObj.count = newCount;
		setCountToCartProductNode(cartProductNode, newCount);
	} else { // элемента нету в структуре Map
		const cartProductNode = createCartProductNode(id, imgSrc, count);
		const cartItemObj = {
			id: id,
			cartProductNode: cartProductNode,
			count: count
		};
		cartMap.set(id, cartItemObj);
		cartProductsNode.append(cartProductNode);
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


