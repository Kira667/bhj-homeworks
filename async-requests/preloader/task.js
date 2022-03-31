
function getValutes() {
	return fetch('https://netology-slow-rest.herokuapp.com')
	.then(res => {
		return res.json();
	})
	.catch(err => {
		console.error(err);
	});
}

const itemsNode = document.querySelector('#items');
const loaderNode = document.querySelector('#loader');

getValutes()
.then(res => {
	startListValutes(res.response, itemsNode, loaderNode);
});

function startListValutes(data, itemsNode, loaderNode) {
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

// .then((res) => {
// 	console.log(res);
// });
