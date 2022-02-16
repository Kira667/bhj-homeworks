


class Tab {
  constructor(containerTabNode) {
		this.initTab(containerTabNode);
  }

	initTab(containerTabNode) {
		const tabNodes = containerTabNode.querySelectorAll('.tab');
		const tabContentsNode = containerTabNode.querySelector('.tab__contents');
		const tabContentNodes = containerTabNode.querySelectorAll('.tab__content');

		
		for (let i = 0; i < tabNodes.length; i++) {
		
			tabNodes[i].addEventListener('click', (event) => {

				this.selectTabContent(tabNodes[i], tabContentNodes, tabContentsNode);

				// this.addClassActive(tabContentNodes, tabContentNodes[i], 'tab__content_active');
				this.addClassActive(tabNodes, tabNodes[i], 'tab_active');
			});
		
		}
	}

	addClassActive(nodes, activeNode, cssClassActive) {
		for (let i = 0; i < nodes.length; i++) {
			nodes[i].classList.remove(cssClassActive);
		}
	
		activeNode.classList.add(cssClassActive);
	}

	selectTabContent(tabClickNode, tabContentNodes, tabContentsNode) {
		const dataTab = tabClickNode.getAttribute("data-tab");
		const tabActiveContentNode = tabContentsNode.querySelector(`.tab__content[data-content-tab=${dataTab}]`);
		this.addClassActive(tabContentNodes, tabActiveContentNode, 'tab__content_active');
	}
}

const tabContainerNodes = document.querySelectorAll('.tabs');

for (const tabContainerNode of tabContainerNodes) {
	const tab = new Tab(tabContainerNode);
}
