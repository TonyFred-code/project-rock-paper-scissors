// Get computer choice
function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    return choices[Math.floor(Math.random() * 3)];
    // "Rock" or "Paper" or "Scissors"
}


// Get player choice
function getPlayerChoice() {
    // Use prompts to get prompt; make choice case-insensitive
    const choice = prompt(`Choose your weapon: "Rock" | "Paper" | "Scissors"`, "");

    //Create guards against edge cases
    //When user cancels prompts
    //Ask user whether to wish to remake a choice or lose round or forfeit game.
    if (choice === null) {
        let chooseAgain = confirm("You didn't make a choice. Would you like to choose again?")
        if (chooseAgain) {
            return getPlayerChoice();
        } else {
            alert("You just forfeit this round")
            return "forfeit";
        }
        //when user leaves prompt empty or enter space character(s) only
        // ask whether to choose again or forfeit round.
    } else if (choice.trim() === "") {
        let chooseAgain = confirm("You entered an empty choice. Would you like to choose again?");
        if (chooseAgain) {
            return getPlayerChoice();
        } else {
            alert("You just forfeit this round")
            return "forfeit"
        }
        // If user uses wrong word
        // Create a way to show user valid options
        // Prompt user about remaking a valid choice
    } else if (choice.toLowerCase() !== "rock" && choice.toLowerCase() !== "paper" && choice.toLowerCase() !== "scissors") {
        let chooseAgain = confirm(`${choice} is invalid. Would you like to choose again?`);
        if (chooseAgain) {
            return getPlayerChoice();
        } else {
            alert("You just forfeit this round");
            return "forfeit";
        }
    }
    return choice.toLowerCase();
}

// Use player's and computer choices to play round
// Inform user of winner of the round
function playRound(playerChoice, computerChoice) {
    if (playerChoice === "rock") {
        if (computerChoice === "scissors") {
            return `You Win! Rock beats Scissors`;
        } else if (computerChoice === "paper") {
            return `You Lose! Paper beats Rock`;
        } else {
            return `Its a Tie!`;
        }
    } else if (playerChoice === "scissors") {
        if (computerChoice === "rock") {
            return `You Lose! Rock beats Scissors`;
        } else if (computerChoice === "paper") {
            return `You Win! Scissors beat Paper`;
        } else {
            return `It's a Tie!`;
        }
    } else if (playerChoice === "paper") {
        if (computerChoice === "rock") {
            return `You Win! Paper beats Rock`;
        } else if (computerChoice === "scissors") {
            return `You Lose! Scissors beats Paper`;
        } else {
            return `It's a Tie!`;
        }
    }
}

const playerChoice = getPlayerChoice();
const computerChoice = getComputerChoice();
console.log(playRound(playerChoice, computerChoice));
// Make game run through 5 rounds to determine winner
// Inform user of winner of game after every 5 rounds
// Give option to restart playing game