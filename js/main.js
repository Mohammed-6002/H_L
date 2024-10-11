console.log('Main loaded'); 

// Variabelen voor het bijhouden van scores en game-status 
let playerScore = 0; 
let computerScore = 0; 
let playerCredits = 0; 
let computerCredits = 0; 
let currentDiceSum = 0; 
let computerDiceSum = 0; 
let timer; 
let timeLeft = 120;  // Timer van 2 minuten 
let playerChoice = null; // Houdt bij of speler 'hoger' of 'lager' kiest 

// Knoppen en display-elementen 
const goButton = document.getElementById("go-button"); 
const lowerButton = document.getElementById("lower-button"); 
const higherButton = document.getElementById("higher-button"); 
const diceButton = document.getElementById("dice-button"); 
const resultDisplay = document.getElementById("result-display"); 
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
    }, 500); 

    // Computer gooit de dobbelstenen na 2 seconden 
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
            playerDiceOne.classList.remove('roll'); 
            playerDiceTwo.classList.remove('roll'); 
            computerDiceOne.classList.remove('roll'); 
            computerDiceTwo.classList.remove('roll'); 
        }, 500); 

        // Check of speler juist heeft gegokt na het gooien 
        checkGuess(playerChoice); 
    }, 2000); 
} 

// Functie om te controleren of de speler juist heeft gegokt 
function checkGuess(guess) { 
    const randomNumber = Math.floor(Math.random() * 12) + 1; 
    console.log("Gok:", guess, "Totaal:", currentDiceSum); 

    if (guess === 'lower' && randomNumber < currentDiceSum) { 
        playerScore++; 
        playerCredits++; 
        resultDisplay.textContent = `Je hebt gewonnen! Totaal: ${randomNumber}`; 
    } else if (guess === 'higher' && randomNumber > currentDiceSum) { 
        playerScore++; 
        playerCredits++; 
        resultDisplay.textContent = `Je hebt gewonnen! Totaal: ${randomNumber}`; 
    } else { 
        computerScore++; 
        computerCredits++; 
        resultDisplay.textContent = `Je hebt verloren! Totaal: ${randomNumber}`; 
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
    timeLeft = 120; 
    resultDisplay.textContent = ''; 
} 
