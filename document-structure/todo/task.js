const tasksFormNode = document.querySelector('#tasks__form');
const taskInputNode = document.querySelector('#task__input');
const tasksListNode = document.querySelector('#tasks__list');

tasksFormNode.addEventListener('submit', (e) => {
	e.preventDefault();

	const taskNode = document.createElement('div');
	taskNode.classList.add('task');

	const taskTitleNode = document.createElement('div');
	taskTitleNode.classList.add('task__title');
	taskTitleNode.innerText = taskInputNode.value;

	const taskRemoveNode = document.createElement('div');;
	taskRemoveNode.classList.add('task__remove');
	taskRemoveNode.innerHTML = '&times;';

	taskRemoveNode.addEventListener('click', deleteNode);

	taskNode.appendChild(taskTitleNode);
	taskNode.appendChild(taskRemoveNode);

	tasksListNode.prepend(taskNode);

	taskInputNode.value = '';
});

function deleteNode(event) {
	event.target.parentElement.remove();
}

