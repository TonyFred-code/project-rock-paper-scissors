const choices = document.querySelectorAll(".choice");
const startGameBtn = document.querySelector(".new-game");
const quitGameBtn = document.querySelector(".quit-game");
const quitRoundBtn = document.querySelector(".quit-round");
const nextRoundBtn = document.querySelector(".next-round");
const choiceHeader = document.querySelector(".choice-header");
const decisionSummary = document.querySelector(".decision-summary");
const playerChoiceText = document.querySelector(".player-choice");
const computerChoiceText = document.querySelector(".computer-choice");
const gameSummaryText = document.querySelector(".game-summary");
const playerScoreContainer = document.querySelector(".player-score .score");
const computerScoreContainer = document.querySelector(".computer-score .score");

choices.forEach((choice) => {
  choice.addEventListener("click", startRound);
});

startGameBtn.addEventListener("click", startGame);
nextRoundBtn.addEventListener("click", startNextRound);

const gameState = {
  gameStarted: false,
  gameEnded: false,
  roundStarted: false,
  allowedToStartNextRound: false,
  roundEnded: false,
  playerChoice: null,
  computerChoice: null,
  playerScore: 0,
  computerScore: 0,
  gameRound: 0,
  roundWinner: null,
  gameWinner: null,
};

// Get computer choice
function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * 3)];
}

// Get player choice
function getPlayerChoice(button) {
  return button.getAttribute("data-choice");
}

function hideElements(...elements) {
  elements.forEach((element) => {
    if (element.classList.contains("hidden")) {
      return;
    } else {
      element.classList.add("hidden");
    }
  });
}

function updateScore() {
  if (gameState.playerScore === 5) {
    gameState.gameWinner = "player";
    displayGameWinner();
    endRound();
    endGame();
    return;
  } else if (gameState.computerScore === 5) {
    gameState.gameWinner = "computer";
    displayGameWinner();
    endRound();
    endGame();
    return;
  }

  if (gameState.roundWinner === "player") {
    gameState.playerScore++;
  } else if (gameState.roundWinner === "computer") {
    gameState.computerScore++;
  } else {
    return;
  }
}

function displayGameWinner() {
  if (gameState.gameWinner === "player") {
  addContentToElement("YOU WIN THIS GAME!", gameSummaryText);
  } else if (gameState.gameWinner === "computer") {
    addContentToElement("YOU LOSE THIS GAME!", gameSummaryText);
  }
}

function endGame() {
  gameState.gameEnded = true;
  gameState.gameStarted = false;
}

function displayScore() {
  addContentToElement(gameState.playerScore, playerScoreContainer);
  addContentToElement(gameState.computerScore, computerScoreContainer);
}

function startNextRound() {
  hideElements(
    computerChoiceText,
    playerChoiceText,
    gameSummaryText,
    decisionSummary,
    nextRoundBtn
  );
  addContentToElement(
    `CHOOSE YOUR WEAPON FOR ROUND ${gameState.gameRound + 1}`,
    choiceHeader
  );
  gameState.allowedToStartNextRound = true;
}

function showElements(...elements) {
  elements.forEach((element) => {
    if (!element.classList.contains("hidden")) {
      return;
    } else {
      element.classList.remove("hidden");
    }
  });
}

function addContentToElement(content = "Empty", element = null) {
  if (!element) {
    return;
  }

  element.textContent = content;
}

function displayChoice(chooser, choice, element) {
  if (chooser === "player") {
    addContentToElement(`YOU CHOSE ${choice.toUpperCase()}`, element);
  } else {
    addContentToElement(`COMPUTER CHOSE ${choice.toUpperCase()}`, element);
  }
  showElements(element);
}

function displayRoundSummary(element) {
  let roundWinner = gameState.roundWinner;
  if (roundWinner === "player") {
    addContentToElement(`YOU WIN!`, element);
  } else if (roundWinner === "computer") {
    addContentToElement(`YOU LOSE!`, element);
  } else {
    addContentToElement("IT'S A TIE!", element);
  }

  showElements(element);
}

function startRound() {
  if (!gameState.gameStarted) {
    addContentToElement("CLICK START BUTTON TO START GAME", choiceHeader);
    return;
  }

  if (!gameState.allowedToStartNextRound) {
    addContentToElement(
      "CLICK NEXT ROUND BUTTON TO START NEXT ROUND",
      choiceHeader
    );
    return;
  }

  if (gameState.playerChoice) {
    return;
  }

  const buttonClicked = this;
  gameState.playerChoice = getPlayerChoice(buttonClicked);
  gameState.computerChoice = getComputerChoice();
  gameState.roundStarted = true;
  gameState.roundEnded = false;
  gameState.allowedToStartNextRound = false;
  playRound();
}

function decideRoundWinner(playerChoice, computerChoice) {
  if (playerChoice === "rock") {
    if (computerChoice === "scissors") {
      gameState.roundWinner = "player";
      return;
    } else if (computerChoice === "paper") {
      gameState.roundWinner = "computer";
      return false;
    } else {
      gameState.roundWinner = "tie";
      return;
    }
  } else if (playerChoice === "scissors") {
    if (computerChoice === "rock") {
      gameState.roundWinner = "computer";
      return;
    } else if (computerChoice === "paper") {
      gameState.roundWinner = "player";
      return;
    } else {
      gameState.roundWinner = "tie";
      return;
    }
  } else if (playerChoice === "paper") {
    if (computerChoice === "rock") {
      gameState.roundWinner = "player";
      return;
    } else if (computerChoice === "scissors") {
      gameState.roundWinner = "computer";
      return;
    } else {
      gameState.roundWinner = "tie";
      return;
    }
  } else if (playerChoice === "forfeit") {
    return "You Lose! Forfeiting gives computer the win";
  }
}

function playRound() {
  displayChoice("player", gameState.playerChoice, playerChoiceText);
  displayChoice("computer", gameState.computerChoice, computerChoiceText);
  decideRoundWinner(gameState.playerChoice, gameState.computerChoice);
  displayRoundSummary(decisionSummary);
  gameState.gameRound++;
  addContentToElement(`ROUND ${gameState.gameRound} RESULTS`, choiceHeader);
  updateScore();
  displayScore();
  setTimeout(endRound, 2000);
}

function quitGame() {}

function endRound() {
  gameState.playerChoice = null;
  gameState.computerChoice = null;
  gameState.roundWinner = null;
  gameState.roundEnded = true;
  gameState.roundStarted = false;
  showElements(nextRoundBtn);
  console.log(gameState);
}

function startGame() {
  if (!gameState.gameStarted) {
    gameState.gameStarted = true;
  } else {
    return;
  }

  addContentToElement(
    `CHOOSE YOUR WEAPON FOR ROUND ${gameState.gameRound + 1}`,
    choiceHeader
  );
  hideElements(startGameBtn);
  showElements(quitRoundBtn, quitGameBtn);
  gameState.allowedToStartNextRound = true;
  console.log(gameState);
}
