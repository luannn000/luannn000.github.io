const input = document.querySelector("#input") as HTMLInputElement;
const playButtonPC = document.querySelector("#play-button-pc") as HTMLParagraphElement;
const playButtonMob = document.querySelector("#play-button-mob") as HTMLParagraphElement;

let userResponse : number = 100;

playButtonPC.addEventListener("click", () => {
    userResponse = Number(input.value);
    location.replace(`https://luannn000.github.io/TS/JogoDaCobrinha/out/computer.html?${userResponse}`);
});

playButtonMob.addEventListener("click", () => {
    userResponse = Number(input.value);
    location.replace(`https://luannn000.github.io/TS/JogoDaCobrinha/out/mobile.html?${userResponse}`);
});
