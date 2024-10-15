console.log('Main loaded');

// Variabelen voor het bijhouden van scores en game-status
let playerScore = 0;
let computerScore = 0;
let playerCredits = 0;
let computerCredits = 0;
let currentDiceSum = 0;
let computerDiceSum = 0;
let timer;
let timeLeft = 60;  // Timer van 2 minuten
let playerChoice = null; // Houdt bij of speler 'hoger' of 'lager' kiest
let computerChoice = null; // Houdt bij wat de keuze van de computer is

// Knoppen en display-elementen
const goButton = document.querySelector("#go-button");
const lowerButton = document.querySelector("#lower-button");
const higherButton = document.querySelector("#higher-button");
const diceButton = document.querySelector("#dice-button");
const resultDisplay = document.querySelector("#result-display");
const playerCreditsDisplay = document.querySelector(".player-credits");
const computerCreditsDisplay = document.querySelector('.computer-credits');
const timerDisplay = document.querySelector(".timer-display");

// Dobbelsteen elementen
const playerDiceOne = document.querySelector('.player-dice-one');
const playerDiceTwo = document.querySelector('.player-dice-two');
const computerDiceOne = document.querySelector('.computer-dice-one');
const computerDiceTwo = document.querySelector('.computer-dice-two');

// Go-knop start het spel
goButton.addEventListener('click', function() {
    console.log('Go button clicked');
    goButton.remove();  // Verwijder de Go-knop na klikken
    document.querySelector(".message-box").remove(); // Verwijder de welkomsttekst

    resetGame();  // Reset spel variabelen
    startTimer(); // Start de timer

    // Activeer de "Hoger" en "Lager" knoppen, maar de "Gooi dobbelsteen" blijft uit
    lowerButton.disabled = false;
    higherButton.disabled = false;
    diceButton.disabled = true; // "Gooi dobbelsteen" is uitgeschakeld
});

// Lager-knop event
lowerButton.addEventListener('click', function() {
    console.log('Lower button clicked');
    playerChoice = 'lower'; // Speler heeft 'lager' gekozen
    enableDiceButton(); // Activeer de dobbelsteen-knop
});

// Hoger-knop event
higherButton.addEventListener('click', function() {
    console.log('Higher button clicked');
    playerChoice = 'higher'; // Speler heeft 'hoger' gekozen
    enableDiceButton(); // Activeer de dobbelsteen-knop
});

// Activeer de "Gooi dobbelsteen" knop nadat een keuze is gemaakt
function enableDiceButton() {
    if (playerChoice) {
        diceButton.disabled = false; // Schakel "Gooi dobbelsteen" in
        lowerButton.disabled = true; // Schakel "Lager" knop uit
        higherButton.disabled = true; // Schakel "Hoger" knop uit
    }
}

// Functie voor de computer om willekeurig hoger of lager te kiezen
function computerMakesChoice() {
    const choices = ['higher', 'lower'];
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    console.log('Computer heeft gekozen:', randomChoice);
    return randomChoice;
}

// Functie om de dobbelstenen te laten rollen
diceButton.addEventListener('click', rollDice);

function rollDice() {
    currentDiceSum = 0;
    computerDiceSum = 0;

    // Voeg de 'roll' klasse toe voor animatie
    playerDiceOne.classList.add('roll');
    playerDiceTwo.classList.add('roll');
    computerDiceOne.classList.add('roll');
    computerDiceTwo.classList.add('roll');

    // Speler gooit de dobbelstenen
    setTimeout(() => {
        for (let i = 0; i < 2; i++) {
            const diceValue = Math.floor(Math.random() * 6) + 1;
            currentDiceSum += diceValue;

            // Update visueel na 0.5 seconden
            if (i === 0) playerDiceOne.textContent = diceValue;
            else playerDiceTwo.textContent = diceValue;
        }
        console.log("Speler Totaal:", currentDiceSum);
    }, 100);

    // Computer maakt keuze voordat hij gooit
    computerChoice = computerMakesChoice();

    // Simuleer een klik op de dobbelsteenknop voor de computer
    setTimeout(() => {
        simulateDiceRollForComputer();
    }, 1000);
}

// Functie om de computer de dobbelstenen te laten gooien
function simulateDiceRollForComputer() {
    computerDiceSum = 0;

    // Voeg de 'roll' klasse toe voor animatie
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

        // Verwijder de 'roll' klasse na de animatie
        setTimeout(() => {
            computerDiceOne.classList.remove('roll');
            computerDiceTwo.classList.remove('roll');
        }, 100);

        // Check of speler juist heeft gegokt na het gooien
        checkGuess(playerChoice, computerChoice);
    }, 1000);
}

// Functie om te controleren of de speler en computer juist hebben gegokt
function checkGuess(playerGuess, computerGuess) {
    const randomNumber = Math.floor(Math.random() * 12) + 1;
    console.log("Speler Gok:", playerGuess, "Totaal:", currentDiceSum);
    console.log("Computer Gok:", computerGuess, "Totaal:", computerDiceSum);

    // Speler check
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

    // Computer check
    if (computerGuess === 'lower' && randomNumber < computerDiceSum) {
        computerScore++;
        computerCredits++;
    } else if (computerGuess === 'higher' && randomNumber > computerDiceSum) {
        computerScore++;
        computerCredits++;
    }

    // Update de credits
    playerCreditsDisplay.textContent = playerCredits;
    computerCreditsDisplay.textContent = computerCredits;

    // Reset voor een nieuwe beurt
    currentDiceSum = 0;
    computerDiceSum = 0;
    playerChoice = null; // Reset de keuze voor de volgende beurt
    lowerButton.disabled = false;
    higherButton.disabled = false;
    diceButton.disabled = true; // Schakel "Gooi dobbelsteen" weer uit
}

// Functie om de timer te starten
function startTimer() {
    timerDisplay.textContent = `Tijd over: ${timeLeft} seconden`;
    timer = setInterval(function() {
        timeLeft--;
        timerDisplay.textContent = `Tijd over: ${timeLeft} seconden`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            resultDisplay.textContent += ' Tijd is op!';
            endGame();  // Beëindig het spel als de tijd op is
        }
    }, 1000);
}

// Functie om het spel te beëindigen en de winnaar te tonen
function endGame() {
    lowerButton.disabled = true;
    higherButton.disabled = true;
    diceButton.disabled = true;

    showWinner();

    // Toon de herstartknop om opnieuw te beginnen
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Herstart het spel';
    restartButton.addEventListener('click', function() {
        location.reload();  // Herlaad de pagina om opnieuw te starten
    });
    document.body.appendChild(restartButton);
}

// Functie om de winnaar te bepalen
function showWinner() {
    if (playerCredits > computerCredits) {
        resultDisplay.textContent += ' Je hebt gewonnen!';
    } else if (playerCredits < computerCredits) {
        resultDisplay.textContent += ' De computer heeft gewonnen!';
    } else {
        resultDisplay.textContent += ' Het is gelijkspel!';
    }
}

// Functie om het spel te resetten
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

