const input = document.querySelector("#input") as HTMLInputElement;
const submit = document.querySelector("#submit") as HTMLButtonElement;

let userResponse : number = 100;

submit.addEventListener("click", () => {
    userResponse = Number(input.value);
})

export let user = userResponse;
