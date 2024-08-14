//gamedata
const gameData = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

//edited player num
let editedPlayer = 0;
//active player
let activePlayer = 0;
//current round checker to check for draw
let currentRound = 1;
//an helper to check if game is ove so we can't click when the game is over
let gameIsOver = false;
//players score
let playerOneScore = 0;
let playerTwoScore = 0;

//creating an array of objects to store player names and symbol
const players = [
  {
    name: "",
    symbol: "X",
  },
  {
    name: "",
    symbol: "O",
  },
];

const configOverlay = document.getElementById("config-overlay");
const backdropElement = document.getElementById("backdrop");
const formElement = document.querySelector("form");
const gameArea = document.getElementById("active-game");
const activePlayerNameElement = document.getElementById("active-player-name");

// getting access to the buttons edit & start game
const editPlayer1Btn = document.getElementById("edit-btn1");
const editPlayer2Btn = document.getElementById("edit-btn2");
const startNewGameBtn = document.getElementById("start-game");
//cancel button for config
const cancelConfigBtn = document.getElementById("cancel-config");
//error
const errorOutput = document.getElementById("config-error");
//access to the X and O BUTTONS
// const gameFieldElements = document.querySelectorAll("#game-board li");
const gameBoard = document.getElementById("game-board");
//access to the game won stuff
const gameOverElement = document.getElementById("game-won");
//access to display score
const score1 = document.getElementById("score1");
const score2 = document.getElementById("score2");

//adding eventlistener that listens to the function defined in config.js
editPlayer1Btn.addEventListener("click", openPlayerConfig);
editPlayer2Btn.addEventListener("click", openPlayerConfig);

cancelConfigBtn.addEventListener("click", closeConfig);
backdropElement.addEventListener("click", closeConfig);

formElement.addEventListener("submit", savePlayerConfig);

startNewGameBtn.addEventListener("click", startNewGame);

//looping through all this list elemnts array and perf the same code to them
// for (const gameFieldElement of gameFieldElements) {
//   gameFieldElement.addEventListener("click", selectGameField);
// }
gameBoard.addEventListener("click", selectGameField);
