const cellsNodeList = document.querySelectorAll(".cell");
const cells = Array.apply("null", cellsNodeList);
const feedback = document.querySelector("#feedback");
const restartBtn = document.querySelector("#restartBtn");
let char = "X";
let count;
let won = false;
let draw = false;
let winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

feedback.textContent = "Vez do X";
restartBtn.style.visibility = "hidden";

cells.forEach((element) => element.addEventListener("click", () => {
    if (!won) {
        let valid = putChar(element);
        checkWinCondition();
        if (valid && !won && !draw) {
            pcChoice();
            checkWinCondition();
            if (valid && !won && !draw) {
                changeChar();
            }
        }
    }
}));

restartBtn.onclick = () => {
    location.reload();
}

function putChar(element) {
    if (element.textContent == "") {
        element.textContent = char;
        return true;
    } else {
        return false;
    }
}

function changeChar() {
    if (char == "X") {
        char = "O";
    } else {
        char = "X";
    }

    feedback.textContent = `Vez do ${char}`;
}

function pcChoice() {
    changeChar();
    let valid = false;
    do {
        let randomNumber = Math.floor(Math.random() * 9);
        console.log(randomNumber);
        console.log(draw);
        valid = putChar(cells[randomNumber]);
    } while (!valid);
}

function checkWinCondition() {
    winCondition.forEach(list => {
        count = 0;

        for (let i = 0; i <= 2; i++) {
            if (cells[list[i]].textContent == char) {
                count++;
            }
        }

        if (count >= 3) {
            won = true;

            feedback.textContent = `O ${char} venceu!`;
            restartBtn.style.visibility = "visible";
        }
    });

    checkDrawCondition(feedback);
}

function checkDrawCondition() {
    if (!won) {
        const whiteSpaces = cells.filter(element => {
            return element.textContent === "";
        });

        if (whiteSpaces.length !== 0) {
            draw = false;
        } else {
            draw = true;
            feedback.textContent = `O jogo empatou`;
            restartBtn.style.visibility = "visible";
        }
    }
}
