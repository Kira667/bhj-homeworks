const hasTooltipNodes = Array.from(document.querySelectorAll('.has-tooltip'));
const tooltipNode = document.querySelector('.tooltip');

for (const hasTooltipNode of hasTooltipNodes) {
	hasTooltipNode.addEventListener('click', (e) => {
		e.preventDefault();
		showTooltip(hasTooltipNode, hasTooltipNodes, tooltipNode);
	});
}

function showTooltip(hasTooltipNode, hasTooltipNodes, tooltipNode) {

	for (const itemNode of hasTooltipNodes) {
		if (itemNode !== hasTooltipNode) {
			itemNode.classList.remove('has-tooltip_active');
		}
	}

	if (hasTooltipNode.classList.contains('has-tooltip_active')) {
		hasTooltipNode.classList.remove('has-tooltip_active');
		hideTooltipNode(tooltipNode);
	} else {
		hasTooltipNode.classList.add('has-tooltip_active');
		renderTooltipNode(hasTooltipNode, tooltipNode);
	}
}

function renderTooltipNode(hasTooltipNode, tooltipNode) {
	const text = hasTooltipNode.getAttribute('title');

	tooltipNode.textContent = text;

	const coords = getCoordinates(hasTooltipNode);
	const position = tooltipNode.getAttribute('data-position');
	const widthTooltip = tooltipNode.scrollWidth;
	const heightTooltip = tooltipNode.scrollHeight;

	tooltipNode.classList.add('tooltip_active');

	console.log(widthTooltip);

	if (position === 'left') {
		tooltipNode.style.left = `${coords.left - widthTooltip}px`
		tooltipNode.style.top = `${coords.top}px`;
	} else if (position === 'top') {
		tooltipNode.style.left = `${coords.left}px`;
		tooltipNode.style.top = `${coords.top - heightTooltip}px`;
	} else if (position === 'right') {
		tooltipNode.style.left = `${coords.right}px`;
		tooltipNode.style.top = `${coords.top}px`;
	} else if (position === 'bottom') {
		tooltipNode.style.left = `${coords.left}px`;
		tooltipNode.style.top = `${coords.bottom}px`;
	}
}

function hideTooltipNode(tooltipNode) {
	tooltipNode.classList.remove('tooltip_active');
}

function getCoordinates(node) {
	const rect = node.getBoundingClientRect();

	// return {
  //   left: rect.left + window.pageXOffset,
	// 	right: rect.left + window.pageXOffset + rect.width,
	// 	top: rect.top + window.pageYOffset,
	// 	bottom: rect.top + window.pageYOffset + rect.height
	// };

  return {
    top: rect.top + window.pageYOffset,
    right: rect.right + window.pageXOffset,
    bottom: rect.bottom + window.pageYOffset,
    left: rect.left + window.pageXOffset
  };
}
