const startButton = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const timeLeft = document.querySelector("#time");
const board = document.querySelector("#board");
const colors = ["#f72a2a", "#f72a80", "#f72ad5", "#ce2af7", "#792af7", "#2a3ff7", "#2a94f7", "#2adff7", "#2af7a2", "#2df72a", "#91f72a", "#dcf72a", "#f7a52a"];
let time = 0;
let score = 0;

startButton.addEventListener("click", (event) => {
  event.preventDefault();
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-btn")) {
    time = parseInt(event.target.getAttribute("data-time"));
    screens[1].classList.add("up");
    startGame();
  }
});

function startGame() {
  setInterval(timer, 1000);
  createRandomCircle();
  setTime(time);
}

function timer() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(timeValue) {
  timeLeft.innerHTML = `00:${timeValue}`;
}

function finishGame() {
  timeLeft.parentNode.classList.add("hide");
  board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`;
}

board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    score++;
    event.target.remove();
    createRandomCircle();
  }
});

function createRandomCircle() {
  const circle = document.createElement("div");

  circle.classList.add("circle");
  const size = getRandomNumber(10, 60);
  const { height, width } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  circle.style.height = `${size}px`;
  circle.style.width = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  circle.style.background = getRandomColor();
  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}
