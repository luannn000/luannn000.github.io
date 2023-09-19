const gameBoard = document.querySelector("#game-board") as HTMLCanvasElement;
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#score") as HTMLDivElement;
const resetButton = document.querySelector("#reset-button") as HTMLButtonElement;
gameBoard.width = 300;
gameBoard.height = 300;
const gameWidth : number = gameBoard.width;
const gameHeight : number = gameBoard.height;
const boardBackground : string = "white";
const snakeColor : string = "lightgreen";
const foodColor : string = "red"
const unitSize : number = 15;
let xVelocity : number = unitSize;
let yVelocity : number = 0;
let foodX : number;
let foodY : number;
let score : number = 0;
let snake : Array<{x : number, y : number}> = [
    {x:0, y:0},
    {x:unitSize, y:0},
    {x:unitSize * 2, y:0},
    {x:unitSize * 3, y:0},
    {x:unitSize * 4, y:0},
];
let foodExists : boolean = false;

let userResponseGame : number = 100;

// Config response

if (location.href.indexOf("?") != -1) {
    userResponseGame = Number(location.href.slice(location.href.lastIndexOf("?") + 1));
}

// Mobile

{
    const controls = document.querySelectorAll(".controls") as NodeListOf<HTMLDivElement> | null;

    controls?.forEach((element : HTMLDivElement) => {
        element.addEventListener('click', (event) => {
            const target = event.target as HTMLDivElement;

            switch (target.id) {
                case 'down':
                    if (yVelocity == 0) {
                        xVelocity = 0;
                        yVelocity = unitSize;
                    }
                    break;
                case 'right':
                    if (xVelocity == 0) {
                        xVelocity = unitSize;
                        yVelocity = 0;
                    }
                    break;
                case 'up':
                    if (yVelocity == 0) {
                        xVelocity = 0;
                        yVelocity = -unitSize;
                    }
                    break;
                case 'left':
                    if (xVelocity == 0) {
                        xVelocity = -unitSize;
                        yVelocity = 0;
                    }
                    break;
                default:
                    break;
            }
        });
    })
}

// Fim Mobile

window.addEventListener("keydown", changeDirection);
resetButton.addEventListener("click", resetGame);

gameStart();

function gameStart() {
    const interval = setInterval(nextTick, userResponseGame);
}

function nextTick() {
    clearBoard();
    moveSnake();
    createFood();
    drawFood();
    drawSnake();
    checkGameOver();
}

function clearBoard() {
    ctx?.beginPath();
    ctx!.fillStyle = boardBackground
    ctx?.moveTo(0, 0);
    ctx?.lineTo(gameWidth, 0);
    ctx?.lineTo(gameWidth, gameHeight);
    ctx?.lineTo(0, gameHeight);
    ctx?.fill();
}

function createFood() {
    let valid;
    if (!foodExists) {
        do {
            foodX = Math.floor(Math.random() * (gameWidth / unitSize)) * unitSize;
            foodY = Math.floor(Math.random() * (gameHeight / unitSize)) * unitSize;
            valid = true;
            snake.forEach((element : {x : number, y : number}) => {
                if (element.x == foodX && element.y == foodY) {
                    valid = false;
                }
            })
        } while(!valid);

        foodExists = true;
    }

    // Eat the food + Score

    if (snake[snake.length - 1].x == foodX && snake[snake.length - 1].y == foodY) {
        foodExists = false;
        score++;
        scoreText.textContent = String(score);
        snake.unshift({x: snake[0].x, y: snake[0].y})
    }
}

function drawFood() {
    ctx!.lineWidth = 2;
    ctx!.fillStyle = foodColor;
    ctx?.beginPath();
    ctx?.moveTo(foodX, foodY);
    ctx?.lineTo(foodX + unitSize, foodY);
    ctx?.lineTo(foodX + unitSize, foodY + unitSize);
    ctx?.lineTo(foodX, foodY + unitSize);
    ctx?.fill()
}

function moveSnake() {
    snake.forEach((element : {x : number, y : number}, index : number) => {
        // Copy next snake index

        if (index != snake.length - 1 && element != snake[index + 1]) {
            element.x = snake[index + 1].x;
            element.y = snake[index + 1].y;
        } else {

            // Horizontal movement

            if (xVelocity != 0) {
                snake[snake.length - 1].x += xVelocity;
                if (snake[snake.length - 1].x > gameWidth - unitSize) {
                    snake[snake.length - 1].x -= gameWidth;
                } else if (snake[snake.length - 1].x < 0) {
                    snake[snake.length - 1].x += gameWidth;
                }
            }

            // Vertical movement

            else {
                snake[snake.length - 1].y += yVelocity;
                if (snake[snake.length - 1].y > gameHeight - unitSize) {
                    snake[snake.length - 1].y -= gameHeight;
                } else if (snake[snake.length - 1].y < 0) {
                    snake[snake.length - 1].y += gameHeight;
                }
            }
        }
    })
}

function drawSnake() {
    snake.forEach((element : {x : number, y : number}) => {
        ctx?.beginPath();
        ctx!.fillStyle = snakeColor;
        ctx?.moveTo(element.x, element.y);
        ctx?.lineTo(element.x + unitSize, element.y);
        ctx?.lineTo(element.x + unitSize, element.y + unitSize);
        ctx?.lineTo(element.x, element.y + unitSize);
        ctx?.fill();
    });
}

function changeDirection(event : KeyboardEvent) {
    switch (event.key) {
        case 'ArrowDown':
            if (yVelocity == 0) {
                xVelocity = 0;
                yVelocity = unitSize;
            }
            break;
        case 'ArrowRight':
            if (xVelocity == 0) {
                xVelocity = unitSize;
                yVelocity = 0;
            }
            break;
        case 'ArrowUp':
            if (yVelocity == 0) {
                xVelocity = 0;
                yVelocity = -unitSize;
            }
            break;
        case 'ArrowLeft':
            if (xVelocity == 0) {
                xVelocity = -unitSize;
                yVelocity = 0;
            }
            break;
        default:
            break;
    }
}

function checkGameOver() {
    snake.forEach((element : {x : number, y : number}, index : number) => {
        if (element.x == snake[snake.length - 1].x && element.y == snake[snake.length - 1].y && index != snake.length - 1) {
            clearInterval(1);
            displayGameOver();
        }
    })
}

function displayGameOver() {
    scoreText.textContent = `Você perdeu! Você fez ${score} pontos!`
    scoreText.style.fontSize = '40px';
}

function resetGame() {
    location.reload()
}
