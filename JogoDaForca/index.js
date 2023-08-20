// Escolhe a palavra

let wordList = ["MELANCIA", "BANANA", "MACACO", "AGUIA", "PESSOA", "COMPUTADOR", "TECLADO", "VIOLAO", "MAQUINA", "LUZ"];
let randomNumber = Math.floor(Math.random() * wordList.length);
let word = wordList[randomNumber];
let guesses = [];
let tries = 5;

// onclick

document.getElementById("submit").onclick = function() {

    // HTML variables

    let guess = document.getElementById("guess").value.toUpperCase();
    let feedback = document.getElementById("feedback");
    let forca = document.getElementById("forca");

    // Check if it's a number

    if (isNaN(Number(guess))) {
        if (repeated(guess, guesses, feedback)) {
            tries = gotRight(guess, word, tries, feedback);
        }

        forca.innerHTML = "";

        showWords(guesses, word, forca);

        if (checkWinCondition(guesses, word)) {
            feedback.innerHTML = "Parabéns! Você ganhou! 🥳🥳🥳";
            document.getElementById("guess").setAttribute("disabled", true);

            wannaPlayAgain();
        } else if (checkLoseCondition(tries)) {
            feedback.innerHTML = `Infelizmente, você perdeu! A palavra era ${word}`;
            document.getElementById("guess").setAttribute("disabled", true);

            wannaPlayAgain();
        }
    } else {
        feedback.innerHTML = "Por favor, insira uma letra";
    }
}

function repeated(guess, guesses, feedback) {
    let bool = false;

    for (let i = 0; i < guesses.length; i++) {
        if (guesses[i] === guess) {
            bool = true;
        }
    }

    if (!bool) {
        guesses.push(guess);
    } else {
        feedback.innerHTML = `Você já digitou essa letra<p>Você tem mais ${tries} chances<\p>`;
    }

    return !bool;
}

function gotRight(guess, word, tries, feedback) {
    for (let i = 0; i < word.length; i++) {
        if (guess === word[i]) {
            break;
        }
        if (i === word.length - 1) {
            tries--;
        }
    }

    feedback.innerHTML = `Você tem mais ${tries} chances`;

    return tries;
}

function showWords(guesses, word, forca) {
    for (let i = 0; i < word.length; i++) {
        let gotRight = false;
        for (let j = 0; j < guesses.length; j++) {
            if (word[i] === guesses[j]) {
                gotRight = true;
            }
        }
        if (gotRight) {
            forca.append(word[i]);
        } else {
            forca.append(" _ ");
        }
    }
}

function checkWinCondition(guesses, word) {
    let isItsWon = 0;

    for (let i = 0; i < word.length; i++) {
        for (let j = 0; j < guesses.length; j++) {
            if (word[i] === guesses[j]) {
                isItsWon++;
            }
        }
    }

    return isItsWon === word.length;
}

function checkLoseCondition(tries) {
    if (tries <= 0) {
        return true;
    } else {
        return false;
    }
}

function wannaPlayAgain() {
    let playAgain = document.getElementById("playAgain");
    let yesButton = document.getElementById("yesButton");
    let noButton = document.getElementById("noButton");

    playAgain.innerHTML = `Quer jogar de novo?`;
    yesButton.removeAttribute("hidden")
    noButton.removeAttribute("hidden")
    yesButton.setAttribute("visible", true);
    noButton.setAttribute("visible", true);

    yesButton.onclick = () => location.reload();
    noButton.onclick = () => {
        playAgain.innerHTML = "Tchau 😊";
        yesButton.setAttribute("hidden", true);
    noButton.setAttribute("hidden", true);
    }
}
