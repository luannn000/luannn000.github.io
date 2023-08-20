let submitButton = document.querySelector("#submit");
let responseHTML = document.querySelectorAll(".response");
let averageHTML = document.querySelector("#average");
let average;

console.log(responseHTML);

submitButton.onclick = () => {
    let final = false;

    average = averageHTML.value;
    averageHTML.value = "";

    if (average >= 7 && average <= 10 && average !== "") {
        responseHTML[0].textContent = "Você passou!";
        responseHTML[0].style.visibility = "visible";
    } else if (average >= 2.5 && average < 7 && average !== "") {
        responseHTML[0].textContent = "Você está na final!";
        responseHTML[0].style.visibility = "visible";
        final = true;
    } else if (average < 2.5 && average >= 0 && average !== "") {
        responseHTML[0].textContent = "Você está reprovado!";
        responseHTML[0].style.visibility = "visible";
    } else {
        responseHTML[0].textContent = "Insira um número válido";
        responseHTML[0].style.visibility = "visible";
    }

    if (final) {
        let finalScore = 15 - (2 * average);

        responseHTML[1].textContent = `Você precisa tirar ${finalScore.toFixed(1)} pontos para passar`;
        responseHTML[1].style.visibility = "visible";
    } else {
        responseHTML[1].style.visibility = "hidden";
    }
};
