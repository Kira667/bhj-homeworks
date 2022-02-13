


class Tab {
  constructor(containerTabNode) {
		this.initTab(containerTabNode);
  }

	initTab(containerTabNode) {
		const tabNodes = containerTabNode.querySelectorAll('.tab');
		const tabContentNodes = containerTabNode.querySelectorAll('.tab__content');
		
		for (let i = 0; i < tabNodes.length; i++) {
		
			tabNodes[i].addEventListener('click', (event) => {
				this.addClassActive(tabContentNodes, tabContentNodes[i], 'tab__content_active');
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
}

const tabContainerNodes = document.querySelectorAll('.tabs');

for (const tabContainerNode of tabContainerNodes) {
	const tab = new Tab(tabContainerNode);
}
