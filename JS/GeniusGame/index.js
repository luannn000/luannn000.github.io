const scoreHTML = document.getElementById("score");
const geniusColorsHTML = Array.from(document.querySelectorAll(".genius-colors"));
const startButtonHTML = document.getElementById("start-button");
const resetButtonHTML = document.getElementById("reset-button");
const gameOverHTML = document.getElementById("game-over");
const numberToColor = {
    0: "red",
    1: "green",
    2: "blue",
    3: "yellow",
}
const colorToNumber = {
    "red": 0,
    "green": 1,
    "blue": 2,
    "yellow": 3,
}
let validStart = true;
let score = 0;
let counter = 0;
let saveChosenColors = [];
let guesses = [];

startButtonHTML.addEventListener("click", () => {
    if (validStart) {
        startGame();
    }
});
geniusColorsHTML.forEach(element => addClickOnDiv(element));

async function startGame() {
    validStart = false;
    gameOverHTML.setAttribute("hidden", true);
    removeEnabledClass();
    chooseColors();
    await showColors();
    addEnabledClass();
}

function removeEnabledClass() {
    geniusColorsHTML.forEach(element => {
        element.classList.remove("enabled");
    });
}

function chooseColors() {
    const randomNumber = Math.floor(Math.random() * 4);
    saveChosenColors.push(numberToColor[randomNumber]);
}

async function showColors() {
    for (let color of saveChosenColors) {
        geniusColorsHTML[colorToNumber[color]].classList.add("show");
        await sleep(1000);
        geniusColorsHTML[colorToNumber[color]].classList.remove("show");
        await sleep(100);
    }
}

function addEnabledClass() {
    geniusColorsHTML.forEach(element => {
        element.classList.add("enabled");
    });
}

function addClickOnDiv(element) {
    element.addEventListener("click", () => {
        if (element.classList.contains("enabled") && saveChosenColors.length > 0) {
            guesses.push(element.id);

            console.log(guesses);
            console.log(saveChosenColors);

            if (guesses[counter] != saveChosenColors[counter]) {
                gameOver();
                console.log("Perdeu");
            }
            else {
                counter++;

                if (guesses.toString() == saveChosenColors.toString()) {
                    guesses = [];
                    counter = 0;
                    score++;

                    console.log("Mais um ponto");

                    scoreHTML.textContent = `Score: ${score}`;
                    startGame();
                }
            }
        }
    });
}

function gameOver() {
    removeEnabledClass();
    gameOverHTML.removeAttribute("hidden", true);
    validStart = true;
    guesses = [];
    score = 0;
    scoreHTML.textContent = `Score: 0`;
    counter = 0;
    saveChosenColors = [];
}

function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}
