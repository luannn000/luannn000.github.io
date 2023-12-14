let mediaHTML = document.getElementById("media");
let submitHTML = document.getElementById("submit");
let feedbackHTML = document.getElementById("feedback");
let finalHTML = document.getElementById("final");

submitHTML.addEventListener('click', calculate);
window.addEventListener('keypress', (event) => {
    if (event.key == "Enter") {
        calculate();
    }
})

function calculate() {
    let media = mediaHTML.value;
    let final = false;

    if (media === "") {
        feedbackHTML.textContent = "Por favor, insira um número";
        feedbackHTML.style.color = "rgb(180, 180, 180)";
        feedbackHTML.style.visibility = "visible";
    }
    else if (media >= 7 && media <= 10) {
        feedbackHTML.textContent = "Parabéns! Você foi aprovado!";
        feedbackHTML.style.color = "rgb(0, 255, 0)";
        feedbackHTML.style.visibility = "visible";
    }
    else if (media >= 2.5 && media < 7) {
        feedbackHTML.textContent = "Você está na prova final";
        feedbackHTML.style.color = "rgb(180, 180, 180)";
        feedbackHTML.style.visibility = "visible";
        final = true;
    }
    else if (media < 2.5 && media >= 0) {
        feedbackHTML.textContent = "Infelizmente, você foi reprovado";
        feedbackHTML.style.color = "rgb(255, 0, 0)";
        feedbackHTML.style.visibility = "visible";
    }
    else {
        feedbackHTML.textContent = "Por favor, coloque um número válido";
        feedbackHTML.style.color = "rgb(180, 180, 180)";
        feedbackHTML.style.visibility = "visible";
    }

    if (final) {
        let finalScore = 15 - (media * 2);

        finalHTML.textContent = `Você precisa tirar ${finalScore} na final`;
        finalHTML.style.color = "rgb(180, 180, 180)";
        finalHTML.style.visibility = "visible";
    }
    else {
        finalHTML.style.visibility = "hidden";
    }
}
