const cells = document.querySelectorAll(".cell");
const feedback = document.querySelector("#feedback");
const restartBtn = document.querySelector("#restartBtn");
let char = "X";
let count;
let won = false;
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
        console.log(won);
        if (valid && !won) {
            changeChar();
        }
    }

    checkDrawCondition();
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
}

function checkDrawCondition() {
    if (!won) {
        for (let i = 0; i <= cells.length - 1; i++) {
            if (cells[i].textContent == "") {
                break;
            } else if (i == 8) {
                feedback.textContent = `O jogo empatou`;
                restartBtn.style.visibility = "visible";
            }
        }
    }
}
