let timeHTML = document.getElementById("time");
let startButtonHTML = document.getElementById("start-button");
let stopButtonHTML = document.getElementById("stop-button");
let resetButtonHTML = document.getElementById("reset-button");

let interval;
let hours = 0;
let minutes = 0;
let seconds = 0;
let active = false;

startButtonHTML.addEventListener('click', startTimer);
stopButtonHTML.addEventListener('click', stopTimer);
resetButtonHTML.addEventListener('click', resetTimer);

function startTimer() {
    if (!active) {
        interval = setInterval(() => {
            seconds++;
            minutes = Math.floor(seconds / 60);
            hours = Math.floor(minutes / 60);

            timeHTML.textContent = `${formatZeroes(hours)}:${formatZeroes(minutes)}:${formatZeroes(seconds)}`
        }, 1000);

        active = true;
    }

    function formatZeroes(time) {
        time = time % 60;
        return time < 10 ? `0${time}` : time;
    }
}

function stopTimer() {
    clearInterval(interval);
    active = false;
}

function resetTimer() {
    clearInterval(interval);
    seconds = 0;
    minutes = 0;
    hours = 0;
    timeHTML.textContent = "00:00:00";
    active = false;
}
