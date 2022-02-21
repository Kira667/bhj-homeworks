const chatWidgetNode = document.querySelector('.chat-widget');
const messagesNode = document.querySelector( '.chat-widget__messages');
const chatWidgetInputNode = document.querySelector('.chat-widget__input');
let focusInput = false;

const phrases = [
	{
		user: 'Ухади',
		robot: 'Сам ухади 😡'
	},
	{
		user: 'Ты дурак?',
		robot: 'Это уже смешно 😂'
	},
	
];

chatWidgetInputNode.addEventListener('focusin', () => focusInput = true);
chatWidgetInputNode.addEventListener('focusout', () => focusInput = false);

chatWidgetNode.addEventListener('click', (event) => {
	chatWidgetNode.classList.add('chat-widget_active');
});

window.addEventListener('keypress', (event) => {
	if (event.key === 'Enter' && focusInput === true) {
		sendMessageUser(chatWidgetInputNode.value, messagesNode, phrases);
		chatWidgetInputNode.value = '';
	}
});

function sendMessageUser(text, messagesNode, phrases) {
	sendMessage(text, messagesNode, true);
	setTimeout(() => {

		for (const phrase of phrases) {
			
			const phraseUser = phrase.user.toLowerCase();
			const textLower = text.toLowerCase();

			if (phraseUser.search(textLower) !== -1) {
				sendMessageRobot(phrase.robot, messagesNode);
				return;
			}
		}

		sendMessageRobot('Ты дурак? (default)', messagesNode); // код ниже цикла будет выполняться, только если не найдена похожая фраза user'a
	}, 1000);
}

function sendMessageRobot(text, messagesNode) {
	sendMessage(text, messagesNode, false);
}

function sendMessage(text, messagesNode, clientBool) {
	const messageUserNode = document.createElement('div');
	const date = new Date();
	const hourses = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
	const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
	const time = `${hourses}:${minutes}`;

	if (clientBool === true) {
		messageUserNode.classList.add('message', 'message_client');
	} else {
		messageUserNode.classList.add('message');
	}

	
	messageUserNode.innerHTML = `
		<div class="message__time">${time}</div>
		<div class="message__text">${text}</div>
	`;
	messagesNode.append(messageUserNode);
}

