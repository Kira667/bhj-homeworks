const fontSizeNodes = document.querySelectorAll('.font-size');
const bookNode = document.querySelector('.book');
const colorNodes = document.querySelectorAll('.book__control_color .color');
const backgroundNodes = document.querySelectorAll('.book__control_background .color');

for (let i = 0; i < fontSizeNodes.length; i++) {

  fontSizeNodes[i].addEventListener('click', (event) => {
    event.preventDefault();

    editFontSize(fontSizeNodes[i], bookNode);
    addClassActive(fontSizeNodes, fontSizeNodes[i], 'font-size_active');
  });

}


for (let i = 0; i < colorNodes.length; i++) {

  colorNodes[i].addEventListener('click', (event) => {
    event.preventDefault();

    editColor(colorNodes[i], bookNode);
    addClassActive(colorNodes, colorNodes[i], 'color_active');
  });

}

for (let i = 0; i < backgroundNodes.length; i++) {

  backgroundNodes[i].addEventListener('click', (event) => {
    event.preventDefault();

    editBgColor(backgroundNodes[i], bookNode);
    addClassActive(backgroundNodes, backgroundNodes[i], 'color_active');
    
  });

}



function editBgColor(bgColorNodeActive, bookNode) {
  const conformityBgColor = {
    black: 'book_bg-black',
    gray: 'book_bg-gray',
    white: 'book_bg-white'
  };

  const dataBgColor = bgColorNodeActive.getAttribute('data-bg-color');

  if (dataBgColor === 'black') {
    bookNode.classList.add(conformityBgColor.black);
    bookNode.classList.remove(conformityBgColor.gray);
    bookNode.classList.remove(conformityBgColor.white);
  } else if (dataBgColor === 'gray') {
    bookNode.classList.add(conformityBgColor.gray);
    bookNode.classList.remove(conformityBgColor.black);
    bookNode.classList.remove(conformityBgColor.white);
  } else if (dataBgColor === 'white') {
    bookNode.classList.add(conformityBgColor.white);
    bookNode.classList.remove(conformityBgColor.gray);
    bookNode.classList.remove(conformityBgColor.black);
  }
}








function editColor(colorNodeActive, bookNode) {
  const conformityColor = {
    black: 'book_color-black',
    gray: 'book_color-gray',
    whitesmoke: 'book_color-whitesmoke'
  };

  const dataColor = colorNodeActive.getAttribute('data-text-color');

  if (dataColor === 'black') {
    bookNode.classList.add(conformityColor.black);
    bookNode.classList.remove(conformityColor.gray);
    bookNode.classList.remove(conformityColor.whitesmoke);
  } else if (dataColor === 'gray') {
    bookNode.classList.add(conformityColor.gray);
    bookNode.classList.remove(conformityColor.black);
    bookNode.classList.remove(conformityColor.whitesmoke);
  } else if (dataColor === 'whitesmoke') {
    bookNode.classList.add(conformityColor.whitesmoke);
    bookNode.classList.remove(conformityColor.gray);
    bookNode.classList.remove(conformityColor.black);
  }
}

function editFontSize(fontSizeNodeActive, bookNode) {
  const conformitySize = {
    small: 'book_fs-small',
    big: 'book_fs-big',
    normal: ''
  };

  const dataSize = fontSizeNodeActive.getAttribute('data-size');

  if (dataSize === null) {
    bookNode.classList.remove(conformitySize.big);
    bookNode.classList.remove(conformitySize.small);
  } else if (dataSize === 'big') {
    bookNode.classList.add(conformitySize.big);
    bookNode.classList.remove(conformitySize.small);
  } else if (dataSize === 'small') {
    bookNode.classList.remove(conformitySize.big);
    bookNode.classList.add(conformitySize.small);
  }
}

function addClassActive(nodes, activeNode, cssClassActive) {
  for (let i = 0; i < nodes.length; i++) {
    nodes[i].classList.remove(cssClassActive);
  }

  activeNode.classList.add(cssClassActive);
}