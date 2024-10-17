console.log('Main loaded');

let playerScore = 0;
let computerScore = 0;
let playerCredits = 0;
let computerCredits = 0;
let currentDiceSum = 0;
let computerDiceSum = 0;
let timer;
let timeLeft = 60;  
let playerChoice = null; 

const goButton = document.querySelector("#go-button");
const lowerButton = document.querySelector("#lower-button");
const higherButton = document.querySelector("#higher-button");
const diceButton = document.querySelector("#dice-button");
const resultDisplay = document.querySelector("#result-display");
const playerCreditsDisplay = document.querySelector(".player-credits");
const computerCreditsDisplay = document.querySelector('.computer-credits');
const timerDisplay = document.querySelector(".timer-display");

const playerDiceOne = document.querySelector('.player-dice-one');
const playerDiceTwo = document.querySelector('.player-dice-two');
const computerDiceOne = document.querySelector('.computer-dice-one');
const computerDiceTwo = document.querySelector('.computer-dice-two');

goButton.addEventListener('click', function() {
    console.log('Go button clicked');
    goButton.remove();  
    document.querySelector(".message-box").remove(); 

    resetGame(); 
    startTimer(); 

    lowerButton.disabled = false;
    higherButton.disabled = false;
    diceButton.disabled = true; 
});

lowerButton.addEventListener('click', function() {
    console.log('Lower button clicked');
    playerChoice = 'lower'; 
    enableDiceButton(); 
});

higherButton.addEventListener('click', function() {
    console.log('Higher button clicked');
    playerChoice = 'higher'; 
    enableDiceButton(); 
});

function enableDiceButton() {
    if (playerChoice) {
        diceButton.disabled = false; 
        lowerButton.disabled = true; 
        higherButton.disabled = true;
    }
}

// Functie om een waarde voor de dobbelsteen te kiezen met Math.random
function rollDiceValue() {
    return Math.floor(Math.random() * 6) + 1; // Genereert een getal tussen 1 en 6
}

diceButton.addEventListener('click', rollDice);

function rollDice() {
    currentDiceSum = 0;
    computerDiceSum = 0;

    // Rol de dobbelstenen voor de speler
    playerDiceOne.classList.add('roll');
    playerDiceTwo.classList.add('roll');

    setTimeout(() => {
        const playerRoll1 = rollDiceValue();
        const playerRoll2 = rollDiceValue();
        currentDiceSum = playerRoll1 + playerRoll2;
        playerDiceOne.textContent = playerRoll1; // Toon waarde van de eerste dobbelsteen
        playerDiceTwo.textContent = playerRoll2; // Toon waarde van de tweede dobbelsteen

        // Wacht 2 seconden voordat de computer zijn dobbelstenen gooit
        setTimeout(() => {
            simulateDiceRollForComputer();
        }, 500);

    }, 500);
}

function simulateDiceRollForComputer() {
    computerDiceSum = 0;

    computerDiceOne.classList.add('roll');
    computerDiceTwo.classList.add('roll');

    setTimeout(() => {
        const computerRoll1 = rollDiceValue();
        const computerRoll2 = rollDiceValue();
        computerDiceSum = computerRoll1 + computerRoll2;
        computerDiceOne.textContent = computerRoll1; // Toon waarde van de eerste dobbelsteen
        computerDiceTwo.textContent = computerRoll2; // Toon waarde van de tweede dobbelsteen

        checkGuess(playerChoice);
    }, 500); // Dit geeft tijd om de animatie te laten zien
}

function checkGuess(playerGuess) {
    console.log("Speler Gok:", playerGuess, "Speler Totaal:", currentDiceSum, "Computer Totaal:", computerDiceSum);

    // Controleer de gok van de speler
    if (currentDiceSum === computerDiceSum) {
        resultDisplay.textContent = `Gelijkspel! Beide gooiden ${currentDiceSum}. Geen credits voor niemand.`;
    } else if (playerGuess === 'lower' && currentDiceSum < computerDiceSum) {
        playerCredits++;
        resultDisplay.textContent = `Je hebt gewonnen! Totaal: ${currentDiceSum} (lager dan ${computerDiceSum})`;
    } else if (playerGuess === 'higher' && currentDiceSum > computerDiceSum) {
        playerCredits++;
        resultDisplay.textContent = `Je hebt gewonnen! Totaal: ${currentDiceSum} (hoger dan ${computerDiceSum})`;
    } else {
        computerCredits++; // Computer krijgt een credit als de speler niet goed gokt
        resultDisplay.textContent = `Je hebt verloren! Totaal: ${currentDiceSum} (was ${computerDiceSum})`;
    }

    playerCreditsDisplay.textContent = playerCredits;
    computerCreditsDisplay.textContent = computerCredits;

    resetGameForNextRound();
}

function resetGameForNextRound() {
    currentDiceSum = 0;
    computerDiceSum = 0;
    playerChoice = null; 
    lowerButton.disabled = false;
    higherButton.disabled = false;
    diceButton.disabled = true; 
}

function startTimer() {
    timerDisplay.textContent = `Tijd over: ${timeLeft} seconden`;
    timer = setInterval(function() {
        timeLeft--;
        timerDisplay.textContent = `Tijd over: ${timeLeft} seconden`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            resultDisplay.textContent += ' Tijd is op!';
            endGame();  
        }
    }, 1000);
}

function endGame() {
    lowerButton.disabled = true;
    higherButton.disabled = true;
    diceButton.disabled = true;

    showWinner();

    const restartButton = document.createElement('button');
    restartButton.textContent = 'Herstart het spel';
    restartButton.addEventListener('click', function() {
        location.reload(); 
    });
    document.body.appendChild(restartButton);
}

function showWinner() {
    if (playerCredits > computerCredits) {
        resultDisplay.textContent += ' Je hebt gewonnen!';
    } else if (playerCredits < computerCredits) {
        resultDisplay.textContent += ' De computer heeft gewonnen!';
    } else {
        resultDisplay.textContent += ' Het is gelijkspel!';
    }
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerCredits = 0;
    computerCredits = 0;
    currentDiceSum = 0;
    computerDiceSum = 0;
    timeLeft = 60;
    resultDisplay.textContent = '';
    playerCreditsDisplay.textContent = playerCredits;
    computerCreditsDisplay.textContent = computerCredits;
}




