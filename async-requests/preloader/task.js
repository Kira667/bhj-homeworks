
function getValutes() {
	return fetch('https://netology-slow-rest.herokuapp.com')
	.then(res => {
		return res.json();
	})
	.catch(err => {
		console.error(err);
	});
}

function renderListValutes(data, itemsNode, loaderNode) {
	const valutesObj = data.Valute;

	loaderNode.classList.add('loader_hidden');

	for (const key in valutesObj) {
		const valutesObjItem = valutesObj[key];
		const itemNode = createItemNode(valutesObjItem);
		itemsNode.append(itemNode);
	}
}

function createItemNode(valutesObjItem) {
	const itemNode = document.createElement('div');

	itemNode.classList.add('item');

	itemNode.innerHTML =`
		<div class="item">
			<div class="item__code">
				${valutesObjItem.CharCode}
			</div>
			<div class="item__value">
				${valutesObjItem.Value}
			</div>
			<div class="item__currency">
				руб.
			</div>
		</div>
	`;

	return itemNode;
}

function initLocalStorage(itemsNode, loaderNode) {
	const dataLocalStorage = localStorage.getItem('data');

	if (dataLocalStorage !== null) { // если в локальном хранилище не пусто

		const data = JSON.parse(dataLocalStorage);
		renderListValutes(data, itemsNode, loaderNode);

	} else { // если в локальном хранилище пусто

		getValutes()
		.then(res => {
			const data = res.response;
			localStorage.setItem('data', JSON.stringify(data));
			renderListValutes(data, itemsNode, loaderNode);
		});

	}

}

const itemsNode = document.querySelector('#items');
const loaderNode = document.querySelector('#loader');

initLocalStorage(itemsNode, loaderNode);
