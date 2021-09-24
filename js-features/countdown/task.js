const nodeTimer = document.querySelector('#timer');
// let counter = 59;
// nodeTimer.innerText = counter;

function createNextDate({hours, minutes, seconds}) {
  const currentDate = new Date();
  const nextDate = new Date(currentDate);
  if (hours) {
    nextDate.setHours(currentDate.getHours() + hours || 0);
  }
  if (minutes) {
    nextDate.setMinutes(currentDate.getMinutes() + minutes || 0);
  }
  if (seconds) {
    nextDate.setSeconds(currentDate.getSeconds() + seconds || 0);
  }
  return nextDate;
}

function compareDates(date1, date2) {

  function twoDigits(number) {
    if (number < 10) {
      return `0${number}`;
    }
    return number;
  }

  const nextDate = date1 > date2 ? date1 : date2;
  const prevDate = date1 < date2 ? date1 : date2;

  const diffTime = nextDate - prevDate;
  const seconds = twoDigits(Math.round((diffTime / 1000) % 60));
  const minutes = twoDigits(Math.floor((diffTime / (1000 * 60)) % 60));
  const hours = twoDigits(Math.floor((diffTime / (1000 * 60 * 60)) % 24));
  return {hours, minutes, seconds};
}

function renderTimer(nextDate, node) {
  const currentDate = new Date();
  const diffDate = compareDates(currentDate, nextDate);

  node.textContent = `${diffDate.hours}:${diffDate.minutes}:${diffDate.seconds}`;

  return { stop: currentDate >= nextDate };
}

const nextDate = createNextDate({
  seconds: 5,
});
renderTimer(nextDate, nodeTimer);

const timerId = setInterval(() => {
  const stopObj = renderTimer(nextDate, nodeTimer);
  if (stopObj.stop === true) {
    clearInterval(timerId);
    setTimeout(() => {
      alert('Вы победили в конкурсе!');
    }, 0);
  }
}, 1000);