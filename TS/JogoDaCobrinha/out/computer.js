"use strict";
const gameBoard = document.querySelector("#game-board");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#score");
const resetButton = document.querySelector("#reset-button");
gameBoard.width = 300;
gameBoard.height = 300;
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "white";
const snakeColor = "lightgreen";
const foodColor = "red";
const unitSize = 15;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
    { x: 0, y: 0 },
    { x: unitSize, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 4, y: 0 },
];
let foodExists = false;
window.addEventListener("keydown", changeDirection);
resetButton.addEventListener("click", resetGame);
gameStart();
function gameStart() {
    const interval = setInterval(nextTick, 100);
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
    ctx === null || ctx === void 0 ? void 0 : ctx.beginPath();
    ctx.fillStyle = boardBackground;
    ctx === null || ctx === void 0 ? void 0 : ctx.moveTo(0, 0);
    ctx === null || ctx === void 0 ? void 0 : ctx.lineTo(gameWidth, 0);
    ctx === null || ctx === void 0 ? void 0 : ctx.lineTo(gameWidth, gameHeight);
    ctx === null || ctx === void 0 ? void 0 : ctx.lineTo(0, gameHeight);
    ctx === null || ctx === void 0 ? void 0 : ctx.fill();
}
function createFood() {
    let valid;
    if (!foodExists) {
        do {
            foodX = Math.floor(Math.random() * (gameWidth / unitSize)) * unitSize;
            foodY = Math.floor(Math.random() * (gameHeight / unitSize)) * unitSize;
            valid = true;
            snake.forEach((element) => {
                if (element.x == foodX && element.y == foodY) {
                    valid = false;
                }
            });
        } while (!valid);
        foodExists = true;
    }
    // Eat the food + Score
    if (snake[snake.length - 1].x == foodX && snake[snake.length - 1].y == foodY) {
        foodExists = false;
        score++;
        scoreText.textContent = String(score);
        snake.unshift({ x: snake[0].x, y: snake[0].y });
    }
}
function drawFood() {
    ctx.lineWidth = 2;
    ctx.fillStyle = foodColor;
    ctx === null || ctx === void 0 ? void 0 : ctx.beginPath();
    ctx === null || ctx === void 0 ? void 0 : ctx.moveTo(foodX, foodY);
    ctx === null || ctx === void 0 ? void 0 : ctx.lineTo(foodX + unitSize, foodY);
    ctx === null || ctx === void 0 ? void 0 : ctx.lineTo(foodX + unitSize, foodY + unitSize);
    ctx === null || ctx === void 0 ? void 0 : ctx.lineTo(foodX, foodY + unitSize);
    ctx === null || ctx === void 0 ? void 0 : ctx.fill();
}
function moveSnake() {
    snake.forEach((element, index) => {
        // Copy next snake index
        if (index != snake.length - 1 && element != snake[index + 1]) {
            element.x = snake[index + 1].x;
            element.y = snake[index + 1].y;
        }
        else {
            // Horizontal movement
            if (xVelocity != 0) {
                snake[snake.length - 1].x += xVelocity;
                if (snake[snake.length - 1].x > gameWidth - unitSize) {
                    snake[snake.length - 1].x -= gameWidth;
                }
                else if (snake[snake.length - 1].x < 0) {
                    snake[snake.length - 1].x += gameWidth;
                }
            }
            // Vertical movement
            else {
                snake[snake.length - 1].y += yVelocity;
                if (snake[snake.length - 1].y > gameHeight - unitSize) {
                    snake[snake.length - 1].y -= gameHeight;
                }
                else if (snake[snake.length - 1].y < 0) {
                    snake[snake.length - 1].y += gameHeight;
                }
            }
        }
    });
    console.log(snake);
}
function drawSnake() {
    snake.forEach((element) => {
        ctx === null || ctx === void 0 ? void 0 : ctx.beginPath();
        ctx.fillStyle = snakeColor;
        ctx === null || ctx === void 0 ? void 0 : ctx.moveTo(element.x, element.y);
        ctx === null || ctx === void 0 ? void 0 : ctx.lineTo(element.x + unitSize, element.y);
        ctx === null || ctx === void 0 ? void 0 : ctx.lineTo(element.x + unitSize, element.y + unitSize);
        ctx === null || ctx === void 0 ? void 0 : ctx.lineTo(element.x, element.y + unitSize);
        ctx === null || ctx === void 0 ? void 0 : ctx.fill();
    });
}
function changeDirection(event) {
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
    snake.forEach((element, index) => {
        if (element.x == snake[snake.length - 1].x && element.y == snake[snake.length - 1].y && index != snake.length - 1) {
            clearInterval(1);
            displayGameOver();
        }
    });
}
function displayGameOver() {
    scoreText.textContent = `Você perdeu! Você fez ${score} pontos!`;
    scoreText.style.fontSize = '40px';
}
function resetGame() {
    location.reload();
}
