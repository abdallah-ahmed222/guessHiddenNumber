"use strict";
const playAgainButton = document.querySelector(".again");
const hiddenNumber = document.querySelector(".number");
const numberInput = document.querySelector(".guess");
const checkButton = document.querySelector(".check");
const message = document.querySelector(".message");
const main = document.querySelector("main");
let playerScore = document.querySelector(".score");
let playerHighScore = document.querySelector(".highscore");
let hiddenSection = document.querySelector(".lost");
let hiddenSectionText = document.querySelector(".lost p");
let shiftingNumber = Math.round(Math.random() * 20);
let topHighScore = document.querySelector(".top-high-score span");

if (localStorage.getItem("top-score")) {
  topHighScore.textContent = localStorage.getItem("top-score");
}
function checkScore(score) {
  if (score === 0) {
    playerHighScore.textContent = "0";
    main.style.display = "none";
    hiddenSection.style.display = "block";
    hiddenSectionText.textContent = `You lost`;
  } else if (+numberInput.value === shiftingNumber) {
    document.querySelector("body").style.backgroundColor = "#60b347";
    playerHighScore.textContent = Number(playerHighScore.textContent) + 1;
    main.style.display = "none";
    hiddenSection.style.display = "block";
    hiddenSectionText.textContent = `Great You WIN with score ${playerHighScore.textContent}`;
    hiddenNumber.textContent = shiftingNumber;
    if (
      Number(localStorage.getItem("top-score")) <
      Number(playerHighScore.textContent)
    ) {
      localStorage.setItem("top-score", playerHighScore.textContent);
    }
  }
}
checkButton.addEventListener("click", () => {
  checkScore();
  if (!numberInput.value) {
    message.textContent = "This can't be empty";
  } else if (+numberInput.value > shiftingNumber) {
    message.textContent = "too high";
    playerScore.textContent = Number((playerScore.textContent -= 1));
    numberInput.value = "";
    numberInput.style.borderColor = "red";
    checkScore(Number(playerScore.textContent));
    numberInput.focus();
  } else if (+numberInput.value < shiftingNumber) {
    message.textContent = "too low";
    playerScore.textContent = Number((playerScore.textContent -= 1));
    numberInput.value = "";
    numberInput.style.borderColor = "red";
    numberInput.focus();
    checkScore(Number(playerScore.textContent));
  }
});
playAgainButton.addEventListener("click", () => {
  shiftingNumber = Math.round(Math.random() * 20);
  main.style.display = "flex";
  message.textContent = "Start guessing...";
  playerScore.textContent = 10;
  document.querySelector("body").style.backgroundColor = "#222";
  numberInput.value = "";
  numberInput.style.borderColor = "white";
  hiddenNumber.textContent = "?";
  hiddenSection.style.display = "none";
  topHighScore.textContent = localStorage.getItem("top-score");
});
