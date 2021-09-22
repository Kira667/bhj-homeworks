const cookieNode = document.querySelector(".clicker__cookie");
const counterNode = document.querySelector("#clicker__counter");
const speedClickNode = document.querySelector('#click__speed');
let count = 0;
let prevClickDate = null;
renderCount(count, counterNode);

cookieNode.addEventListener("click", (event) => {

  if (prevClickDate === null) { // первый клик
    prevClickDate = new Date();
    speedClickNode.textContent = 'Кликайте дальше!';
  } else { // второй клик и дальше
    const currentClickDate = new Date();
    const diffDate = compareDates(currentClickDate, prevClickDate)
    const seconds = diffDate.seconds + diffDate.milliseconds / 1000;
    speedClickNode.textContent = (1 / seconds).toFixed(2);
    prevClickDate = currentClickDate;
  }
  
  count = count + 1;
  renderCount(count, counterNode);

  if (cookieNode.classList.contains("active")) {
    cookieNode.classList.remove("active");
  } else {
    cookieNode.classList.add("active");
  }
});

function renderCount(count, node) {
  node.textContent = count;
}

function compareDates(date1, date2) {

  const nextDate = date1 > date2 ? date1 : date2;
  const prevDate = date1 < date2 ? date1 : date2;

  const diffTime = nextDate - prevDate;
  const milliseconds = Math.floor(diffTime % 1000);
  const seconds = Math.floor((diffTime / 1000) % 60);
  const minutes = Math.floor((diffTime / (1000 * 60)) % 60);
  const hours = Math.floor((diffTime / (1000 * 60 * 60)) % 24);

  return {hours, minutes, seconds, milliseconds};
}
