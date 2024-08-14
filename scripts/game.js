function resetGameStatus() {
  // activePlayer = 1;
  currentRound = 1;
  gameIsOver = false;
  gameOverElement.firstElementChild.innerHTML =
    ' Congratulations <span id="winner-name">PLAYER NAME</span>, You  won!🥳🏆';
  gameOverElement.style.display = "none";

  //nest looping through all the items in game data
  //to reset the gameboard in the UI and JS
  let gameBoardIndex = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameData[i][j] = 0;
      const gameBoardItem = gameBoard.children[gameBoardIndex];
      //gameBoardIndex acts as an index num for the gameBoard.children(li- items)
      gameBoardIndex++;
      //to remove the (X & O) in the UI
      gameBoardItem.textContent = "";
      //to remove the "disabled" class
      gameBoardItem.classList.remove("disabled");
    }
  }
}

function startNewGame() {
  //to display the game field if valid names have been inputed
  if (players[0].name === "" || players[1].name === "") {
    alert("Hii please set both player names to start the game.😉");
    return;
  }

  resetGameStatus();

  activePlayerNameElement.textContent = players[activePlayer].name;
  gameArea.style.display = "block";
}

//func for switching active player

function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {
  //to prevent ol from outputting "X & O"
  //also prevent slecting if game is over
  if (event.target.tagName !== "LI" || gameIsOver) {
    return;
  }

  const selectedField = event.target;
  console.log(selectedField);

  //keeping track of the field selcted in JS background
  const selectedCol = selectedField.dataset.col - 1; //(-1) turns it to an index([0-2]) instead of (1-3)
  const selectedRow = selectedField.dataset.row - 1; //arrays use index num, not (1-3)

  //to make sure same field can't be selcted twice
  if (gameData[selectedRow][selectedCol] > 0) {
    alert("Please select an empty field! 🤦‍♂️");
    return;
  }

  //to output the (X&O symbol)
  selectedField.textContent = players[activePlayer].symbol; //players[0].symbol
  selectedField.classList.add("disabled");

  //keeping track of the gamefield in the background(app.js array)
  gameData[selectedRow][selectedCol] = activePlayer + 1; //to set it to (1/2) instead of (0/1) cause (0 = noplayer) in the gameData
  console.log(gameData);

  //executing the winner logic and shi
  const winnerId = checkForGameOver();

  if (winnerId !== 0) {
    endGame(winnerId);
    score(winnerId);
  }

  console.log(winnerId);

  //incrementing the round function
  currentRound++;
  //switch player function
  switchPlayer();
}

//the game logic=>>
function checkForGameOver() {
  //checking if the entire row is owned by the same player
  //and then returning the id of the particular pllayer
  for (let i = 0; i < 3; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }

  //here we're going through all the col and we keep the rows fixed
  //checking the col for equality
  for (let i = 0; i < 3; i++) {
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[0][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }

  //diagonal top left to bottom right
  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
    return gameData[0][0];
  }

  //diagonal bottom left tp top right
  if (
    gameData[2][0] > 0 &&
    gameData[2][0] === gameData[1][1] &&
    gameData[1][1] === gameData[0][2]
  ) {
    return gameData[2][0];
  }

  // same thing but diagonal top right to bottom left
  // if (
  //   gameData[0][2] > 0 &&
  //   gameData[0][2] === gameData[1][1] &&
  //   gameData[1][1] === gameData[2][0]
  // ) {
  //   return gameData[0][2];
  // }

  //to check for draw using the currentRound var
  if (currentRound === 9) {
    return -1;
  }
  return 0;
}

function endGame(winnerId) {
  gameIsOver = true;
  gameOverElement.style.display = "block";
  if (winnerId > 0) {
    let winnerName = players[winnerId - 1].name;
    gameOverElement.firstElementChild.firstElementChild.textContent =
      winnerName;
  } else {
    gameOverElement.firstElementChild.textContent = "It's a draw!-⚔🔥";
  }
}

function score(winnerId) {
  if (winnerId === 1) {
    playerOneScore++;
  } else if (winnerId === 2) {
    playerTwoScore++;
  }
  score1.textContent = playerOneScore;
  score2.textContent = playerTwoScore;
}
