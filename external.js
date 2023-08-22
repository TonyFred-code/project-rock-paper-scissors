const choices = document.querySelectorAll(".choice");
const startGameBtn = document.querySelector(".new-game");
const quitGameBtn = document.querySelector(".quit-game");
const quitRoundBtn = document.querySelector(".quit-round");
const nextRoundBtn = document.querySelector(".next-round");
const choiceHeader = document.querySelector(".choice-header");

choices.forEach((choice) => {
    choice.addEventListener("click", startRound);
});

startGameBtn.addEventListener("click", startGame);

const gameState = {
    gameStarted: false,
    playerChoice: null,
    computerChoice: null,
    playerScore: 0,
    computerScore: 0,
    gamePaused: false,
}

// Get computer choice
function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    return choices[Math.floor(Math.random() * 3)];
    // "Rock" or "Paper" or "Scissors"
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
    })
}

function showElements(...elements) {
    elements.forEach((element) => {
        if (!element.classList.contains("hidden")) {
            return;
        } else {
            element.classList.remove("hidden");
        }
    })
}

function addContentToElement(content = "Empty", element = null) {
    if (!element) {
        return;
    }

    element.textContent = content;
}

function displayChoice() {}
function displayRoundSummary() {}

// Use player's and computer choices to play round
// Inform user of winner of the round

function startRound() {
    if(gameState.playerChoice || !gameState.gameStarted) {
        return;
    }
    const buttonClicked = this;
    gameState.playerChoice = getPlayerChoice(buttonClicked);
    gameState.computerChoice = getComputerChoice();
    console.log(gameState);
}

function decideRoundWinner() {

}

function playRound() {
    // if (playerChoice === "rock") {
    //     if (computerChoice === "scissors") {
    //         return `You Win! Rock beats Scissors`;
    //     } else if (computerChoice === "paper") {
    //         return `You Lose! Paper beats Rock`;
    //     } else {
    //         return `Its a Tie!`;
    //     }
    // } else if (playerChoice === "scissors") {
    //     if (computerChoice === "rock") {
    //         return `You Lose! Rock beats Scissors`;
    //     } else if (computerChoice === "paper") {
    //         return `You Win! Scissors beat Paper`;
    //     } else {
    //         return `It's a Tie!`;
    //     }
    // } else if (playerChoice === "paper") {
    //     if (computerChoice === "rock") {
    //         return `You Win! Paper beats Rock`;
    //     } else if (computerChoice === "scissors") {
    //         return `You Lose! Scissors beats Paper`;
    //     } else {
    //         return `It's a Tie!`;
    //     }
    // } else if (playerChoice === "forfeit") {
    //     return "You Lose! Forfeiting gives computer the win"
    // }
}

function quitGame() {

}

function endGame() {

}

function startGame() {
    if (!gameState.gameStarted) {
        gameState.gameStarted = true;
    } else {
        return;
    }

    addContentToElement("CHOOSE YOUR WEAPON!", choiceHeader);
    hideElements(startGameBtn);
    showElements(quitRoundBtn, quitGameBtn);
    console.log(gameState);
}