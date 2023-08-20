// Get computer choice
function getComputerChoice() {
    const choices = ["Rock", "Paper", "Scissors"];
    return choices[Math.floor(Math.random() * 3)];
    // "Rock" or "Paper" or "Scissors"
}


// Get player choice
// Use prompts and make choice case-insensitive
function getPlayerChoice() {
    const choice = prompt("Choose your weapon:", "");
    return choice.toLowerCase();
}

// Use player's and computer choices to play round
// Inform user of winner of the round
// Make game run through 5 rounds to determine winner
// Inform user of winner of game after every 5 rounds
// Give option to restart playing game