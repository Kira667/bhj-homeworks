function getPoll() {
	return fetch('https://netology-slow-rest.herokuapp.com/poll.php')
	.then(res => res.json())
	.catch(err => console.error(err));
}

const pollTitleNode = document.querySelector('.poll__title');
const pollAnswersNode = document.querySelector('.poll__answers');

getPoll()
.then((res) => {
	const data = res.data;
	renderListPoll(data, pollTitleNode, pollAnswersNode);
});

function renderListPoll(data, pollTitleNode, pollAnswersNode) {
	pollTitleNode.textContent = data.title;
	console.log(data);

	for (const answer of data.answers) {
		const buttonNode = document.createElement('button');
		buttonNode.classList.add('poll__answer');
		buttonNode.textContent = answer;

		buttonNode.addEventListener('click', clickBtn);

		pollAnswersNode.append(buttonNode);
	}
}

function clickBtn(event) {
	alert('Спасиб, ваш голос засчитан!');
}
