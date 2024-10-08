// Variables
let previousRoll = rollDice();
let gameActive = true;

// Function to roll two dice and return their sum
function rollDice() {
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    return dice1 + dice2;
}

// Function to update the result display
function updateResult(message) {
    document.getElementById('result').textContent = message;
}

// Function to handle the player's guess
function makeGuess(isHigher) {
    if (!gameActive) return;

    const currentRoll = rollDice();
    let message = `Vorige worp: ${previousRoll}, Nieuwe worp: ${currentRoll}. `;

    if ((isHigher && currentRoll > previousRoll) || (!isHigher && currentRoll < previousRoll)) {
        message += 'Correct gegokt! Ga door!';
        previousRoll = currentRoll;
    } else {
        message += 'Fout gegokt. Het spel is afgelopen!';
        gameActive = false;
    }

    updateResult(message);
}

// Event listeners for the buttons
document.getElementById('higher').addEventListener('click', function() {
    makeGuess(true);
});

document.getElementById('lower').addEventListener('click', function() {
    makeGuess(false);
});

// Initial display
updateResult(`De eerste worp is: ${previousRoll}`);
