let buttonsArray = document.querySelectorAll(".myButtons");
let playerChoiceHTML = document.querySelector("#playerChoice");
let computerChoiceHTML = document.querySelector("#computerChoice");
let resultHTML = document.querySelector("#result");
let playerChoice = null;
let pcChoice = null;

buttonsArray.forEach((element, index) => element.onclick = () => buttonClick(index));

function buttonClick(index) {
    // Declaração de variáveis:

    let random = Math.floor(Math.random() * 3);
    playerChoice = buttonsArray[index].textContent;
    pcChoice = buttonsArray[random].textContent;

    // Display

    playerChoiceHTML.textContent = `Jogador: ${playerChoice}`;
    computerChoiceHTML.textContent = `Computador: ${pcChoice}`

    // Condições

    if ((playerChoice == "🪨" && pcChoice == "✂️") ||
    (playerChoice == "📃" && pcChoice == "🪨") ||
    (playerChoice == "✂️" && pcChoice == "📃")) {
        resultHTML.textContent = "VOCÊ VENCEU!";
    }
    else if (playerChoice == pcChoice) {
        resultHTML.textContent = "EMPATOU!";
    } else {
        resultHTML.textContent = "VOCÊ PERDEU!";
    }
}
