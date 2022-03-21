const hasTooltipNodes = Array.from(document.querySelectorAll('.has-tooltip'));
const tooltipNode = document.querySelector('.tooltip');

for (const hasTooltipNode of hasTooltipNodes) {
	hasTooltipNode.addEventListener('click', (e) => {
		e.preventDefault();
		showTooltip(e, hasTooltipNode, tooltipNode);
	});
}

function showTooltip(event, hasTooltipNode, tooltipNode) {
	const text = hasTooltipNode.getAttribute('title');

	tooltipNode.textContent = text;
	tooltipNode.classList.add('tooltip_active');

	const coords = getCoordinates(hasTooltipNode);
	const position = tooltipNode.getAttribute('data-position');
	const widthTooltip = tooltipNode.scrollWidth;
	const heightTooltip = tooltipNode.scrollHeight;

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
