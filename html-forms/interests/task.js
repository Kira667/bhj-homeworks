const interestNodes = document.querySelectorAll('.interest');
const infoLiNodesArr = Array.from(interestNodes).map(getNodesByLi);

for (let i = 0; i < infoLiNodesArr.length; i++) {
	infoLiNodesArr[i].checkboxNode.addEventListener('change', (event) => {
		changeCheckboxEventHandler(infoLiNodesArr[i]);
	});
}


function getNodesByLi(liNode) {
	return {
		liNode: liNode,
		labelNode: liNode.querySelector('.interest > label'),
		checkboxNode: liNode.querySelector('.interest > label > .interest__check')
	};
}

function setState(infoLiNodes, checkedStr) {
	
	if (checkedStr === 'true') {
		infoLiNodes.checkboxNode.checked = true;
		infoLiNodes.checkboxNode.indeterminate = false;
	} else if (checkedStr === 'false') {
		infoLiNodes.checkboxNode.checked = false;
		infoLiNodes.checkboxNode.indeterminate = false;
	} else if (checkedStr === 'indeterminate') {
		infoLiNodes.checkboxNode.indeterminate = true;
	}

}

function getState(infoLiNodes) {
	if (infoLiNodes.checkboxNode.indeterminate === true) {
		return 'indeterminate';
	} else if (infoLiNodes.checkboxNode.checked === true) {
		return 'true';
	} else if (infoLiNodes.checkboxNode.checked === false) {
		return 'false';
	}
}

function getChildrensLi(infoLiNodes) {

	const getChildrenUl = (liNode) => {
		for (let i = 0; i < liNode.children.length; i++) {
			if (
				liNode.children[i].classList.contains('interests')
			) {
				return liNode.children[i];
			}
		}
		return false;
	};
	
	const ulNode = getChildrenUl(infoLiNodes.liNode);

	if (ulNode === false && ulNode.children === undefined) {
		return [];
	}

	return Array.from(ulNode.children).map(li => getNodesByLi(li));
}

function getParentLi(infoLiNodes) {
	const parentUlNode = infoLiNodes.liNode.parentNode.parentNode;

	if (parentUlNode instanceof Element) {
		return parentUlNode;
	}

	return false;
}

function changeCheckboxEventHandler(infoLiNodes) {
	const childrens = getChildrensLi(infoLiNodes);
	const state = getState(infoLiNodes);
	recursiveDownPass(infoLiNodes, childrens, state);
	recursiveUpPass(infoLiNodes);
}

function recursiveDownPass(infoLiNodes, childrens, initialState) {

	if (childrens.length === 0) {
		return false;
	}

	for (const childrenInfoLiNodes of childrens) {

		if (initialState === 'false') {
			setState(childrenInfoLiNodes, 'false');
		} else if (initialState === 'true') {
			setState(childrenInfoLiNodes, 'true');
		}

		const childrensChildrens = getChildrensLi(childrenInfoLiNodes);
		recursiveDownPass(childrenInfoLiNodes, childrensChildrens, initialState);
	}
}

function getStateChildrensLi(infoLiNodes) {
	const childrenLiNodes = getChildrensLi(infoLiNodes);
	const stateChildrensLi = childrenLiNodes.map(li => getState(li));
	return stateChildrensLi;
}

function getStateBasedOnChildrenState(stateChildrens) {
	const counter = {
		false: 0,
		true: 0,
		indeterminate: 0
	};

	for (const state of stateChildrens) {
		if (state === 'true') {
			counter.true += 1;
		} else if (state === 'false') {
			counter.false += 1;
		} else if (state === 'indeterminate') {
			counter.indeterminate += 1;
		}
	}

	if (counter.indeterminate === 0 && counter.false === 0 && counter.true !== 0) {
		return 'true';
	} else if (
		( counter.false !== 0 && counter.true !== 0 ) ||
		( counter.indeterminate !== 0 )
	) {
		return 'indeterminate';
	} else if (counter.false !== 0 && counter.true === 0 && counter.indeterminate === 0) {
		return 'false';
	}


}

function recursiveUpPass(infoLiNodes) {
	const parentLiNode = getParentLi(infoLiNodes);

	if (parentLiNode === false) {
		return false;
	}

	const infoParentLiNodes = getNodesByLi(parentLiNode);
	const stateChildrensLi = getStateChildrensLi(infoParentLiNodes);
	const stateParent = getStateBasedOnChildrenState(stateChildrensLi);
	setState(infoParentLiNodes, stateParent);
	recursiveUpPass(infoParentLiNodes);

}


