const timeDisplay = document.querySelector("#timeDisplay");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");
const resetButton = document.querySelector("#reset");

let hours = 0;
let minutes = 0;
let seconds = 0;

let timer = null;
let activated = false;

startButton.onclick = startTimer;
pauseButton.onclick = pauseTimer;
resetButton.onclick = reset;

function startTimer() {
    if (!activated) {
        activated = true;

        timer = setInterval(() => {
            seconds += 1;
            minutes = Math.floor(seconds / 60);
            hours = Math.floor(minutes / 60);

            timeDisplay.textContent = `${hours}:${formatZeroes(minutes % 60)}:${formatZeroes(seconds % 60)}`;
        }, 1000);
    }

    function formatZeroes(time) {
        time = time.toString();
        return time.length < 2 ? "0" + time : time;
    }
}

function pauseTimer() {
    clearInterval(timer);
    activated = false;
}

function reset() {
    seconds = 0;
    minutes = 0;
    hours = 0;

    timeDisplay.textContent = `0:00:00`;
}
