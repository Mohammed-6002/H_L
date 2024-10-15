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
let computerChoice = null; 

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

function computerMakesChoice() {
    const choices = ['higher', 'lower'];
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    console.log('Computer heeft gekozen:', randomChoice);
    return randomChoice;
}

diceButton.addEventListener('click', rollDice);

function rollDice() {
    currentDiceSum = 0;
    computerDiceSum = 0;

    playerDiceOne.classList.add('roll');
    playerDiceTwo.classList.add('roll');
    computerDiceOne.classList.add('roll');
    computerDiceTwo.classList.add('roll');

    setTimeout(() => {
        for (let i = 0; i < 2; i++) {
            const diceValue = Math.floor(Math.random() * 6) + 1;
            currentDiceSum += diceValue;

            if (i === 0) playerDiceOne.textContent = diceValue;
            else playerDiceTwo.textContent = diceValue;
        }
        console.log("Speler Totaal:", currentDiceSum);
    }, 100);

    computerChoice = computerMakesChoice();

    setTimeout(() => {
        simulateDiceRollForComputer();
    }, 1000);
}

function simulateDiceRollForComputer() {
    computerDiceSum = 0;

    computerDiceOne.classList.add('roll');
    computerDiceTwo.classList.add('roll');

    setTimeout(() => {
        for (let i = 0; i < 2; i++) {
            const computerDiceValue = Math.floor(Math.random() * 6) + 1;
            computerDiceSum += computerDiceValue;

            if (i === 0) computerDiceOne.textContent = computerDiceValue;
            else computerDiceTwo.textContent = computerDiceValue;
        }
        console.log("Computer Totaal:", computerDiceSum);

        setTimeout(() => {
            computerDiceOne.classList.remove('roll');
            computerDiceTwo.classList.remove('roll');
        }, 100);

        checkGuess(playerChoice, computerChoice);
    }, 1000);
}
function checkGuess(playerGuess, computerGuess) {
    const randomNumber = Math.floor(Math.random() * 12) + 1;
    console.log("Speler Gok:", playerGuess, "Totaal:", currentDiceSum);
    console.log("Computer Gok:", computerGuess, "Totaal:", computerDiceSum);

    if (playerGuess === 'lower' && randomNumber < currentDiceSum) {
        playerScore++;
        playerCredits++;
        resultDisplay.textContent = `Je hebt gewonnen! Totaal: ${randomNumber}`;
    } else if (playerGuess === 'higher' && randomNumber > currentDiceSum) {
        playerScore++;
        playerCredits++;
        resultDisplay.textContent = `Je hebt gewonnen! Totaal: ${randomNumber}`;
    } else {
        computerScore++;
        computerCredits++;
        resultDisplay.textContent = `Je hebt verloren! Totaal: ${randomNumber}`;
    }

    if (computerGuess === 'lower' && randomNumber < computerDiceSum) {
        computerScore++;
        computerCredits++;
    } else if (computerGuess === 'higher' && randomNumber > computerDiceSum) {
        computerScore++;
        computerCredits++;
    }

    playerCreditsDisplay.textContent = playerCredits;
    computerCreditsDisplay.textContent = computerCredits;

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
}

