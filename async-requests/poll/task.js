function getPoll() {
	return fetch('https://netology-slow-rest.herokuapp.com/poll.php')
	.then(res => res.json())
	.catch(err => console.error(err));
}

function sendPoll(voteIndex, answerIndex) {
	return fetch(`https://netology-slow-rest.herokuapp.com/poll.php?vote=${voteIndex}&answer=${answerIndex}`, {
		method: 'POST',
		headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }
	})
	.then(res => res.json())
	.catch(err => console.error(err));
}

function renderListPoll(res, pollObjNodes) {
	const data = res.data;
	const pollTitleNode = pollObjNodes.pollTitleNode;
	const pollAnswersNode = pollObjNodes.pollAnswersNode;

	pollTitleNode.textContent = data.title;

	for (let i = 0; i < data.answers.length; i++) {
		const answer = data.answers[i];
		const buttonNode = document.createElement('button');

		buttonNode.classList.add('poll__answer');
		buttonNode.textContent = answer;
		buttonNode.addEventListener('click', (event) => {
			clickBtn(res.id, i, pollObjNodes);
		});
		pollAnswersNode.append(buttonNode);
	}

}

function clickBtn(voteIndex, answerIndex, pollObjNodes) {
	// console.log(voteIndex, 'опрос');
	// console.log(answerIndex, 'ответ');
	alert('Спасибо, ваш голос засчитан!');

	sendPoll(voteIndex, answerIndex)
	.then(res => {
		renderStatisticsNode(res.stat, pollObjNodes);
	});

}

function createPollObjNodes() {
	const pollNode = document.querySelector('.poll');
	const pollTitleNode = pollNode.querySelector('.poll__title');
	const pollAnswersNode = pollNode.querySelector('.poll__answers');

	return { pollNode, pollTitleNode, pollAnswersNode };
}

function renderStatisticsNode(stat, pollObjNodes) {
	pollObjNodes.pollAnswersNode.remove();
	delete pollObjNodes.pollAnswersNode;

	const statisticsNode = document.createElement('div');
	statisticsNode.classList.add('poll__statistics');
	pollObjNodes.statisticsNode = statisticsNode;

	console.log(stat);

	let sumVotes = 0;
	for (let i = 0; i < stat.length; i++) {
		sumVotes = sumVotes + stat[i].votes;
	}

	for (let i = 0; i < stat.length; i++) {
		let percent = Math.round( (stat[i].votes / sumVotes) * 100 * 100 ) / 100;
		stat[i].percent = percent;
	}

}

const pollObjNodes = createPollObjNodes();

getPoll()
.then((res) => {
	renderListPoll(res, pollObjNodes);
});


// const arr = [{value: 1}, {value: 2}, {value: 3}, {value: 4}];
// let sum = 0;

// for (let i = 0; i < arr.length; i++) {
// 	console.log(arr[i].value);
// 	sum = sum + arr[i].value;
// }

// console.log(sum);




