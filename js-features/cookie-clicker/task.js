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
    const seconds = compareDateSeconds(currentClickDate, prevClickDate);
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

function compareDateSeconds(date1, date2) {
  const nextDate = date1 > date2 ? date1 : date2;
  const prevDate = date1 < date2 ? date1 : date2;
  const diffTimeMilliSeconds = nextDate - prevDate;
  const seconds = diffTimeMilliSeconds / 1000;
  return seconds;
}