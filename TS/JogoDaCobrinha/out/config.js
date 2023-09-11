const input = document.querySelector("#input");
const submit = document.querySelector("#submit");
let userResponse = 100;
submit.addEventListener("click", () => {
    userResponse = Number(input.value);
});
export let user = userResponse;
