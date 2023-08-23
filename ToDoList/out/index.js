"use strict";
// Declara variáveis
const inputHTML = document.querySelector("#input");
const submitHTML = document.querySelector("#submit");
const toDoHTML = document.querySelector("#to-do");
const showStatusArray = Array.from(document.getElementsByClassName("showStatus"));
let checkboxArray = Array.from(document.getElementsByClassName("checkbox"));
// Quando clica enter
inputHTML.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        addDoList();
    }
});
// Quando clica em submit
submitHTML.onclick = addDoList;
// Radio inputs
showStatusClick();
function addDoList() {
    // Declara variáveis
    let input = inputHTML.value;
    const mainDivHTML = document.createElement("div");
    const listDivHTML = document.createElement("div");
    const addToDo = document.createElement("p");
    const checkbox = document.createElement("input");
    inputHTML.value = "";
    if (input !== "") {
        addToDo.textContent = input;
        checkbox.type = "checkbox";
        // Adiciona classes
        mainDivHTML.classList.add("mainDiv");
        mainDivHTML.classList.add("incomplete");
        listDivHTML.classList.add("listDiv");
        addToDo.classList.add("listP");
        checkbox.classList.add("checkbox");
        listDivHTML.append(addToDo);
        mainDivHTML.append(listDivHTML);
        mainDivHTML.append(checkbox);
        toDoHTML.append(mainDivHTML);
        checkboxArray = Array.from(document.getElementsByClassName("checkbox"));
        // checkbox ao clicar
        checkboxArray.forEach(element => {
            element.addEventListener("click", event => {
                const target = event.target;
                const parentElement = target.parentElement;
                console.log(parentElement === null || parentElement === void 0 ? void 0 : parentElement.classList);
                // Adiciona e remove classes
                if (target.checked == true) {
                    parentElement === null || parentElement === void 0 ? void 0 : parentElement.classList.remove("incomplete");
                    parentElement === null || parentElement === void 0 ? void 0 : parentElement.classList.add("complete");
                    console.log(parentElement === null || parentElement === void 0 ? void 0 : parentElement.classList);
                }
                else if (target.checked == false) {
                    parentElement === null || parentElement === void 0 ? void 0 : parentElement.classList.remove("complete");
                    parentElement === null || parentElement === void 0 ? void 0 : parentElement.classList.add("incomplete");
                    console.log(parentElement === null || parentElement === void 0 ? void 0 : parentElement.classList);
                }
            });
        });
        showStatusSubmit();
    }
}
function showStatusClick() {
    showStatusArray.forEach(element => {
        element.addEventListener("click", event => {
            showStatusFunction(element);
        });
    });
}
function showStatusSubmit() {
    showStatusArray.forEach(element => {
        showStatusFunction(element);
    });
}
function showStatusFunction(element) {
    const completesArray = Array.from(document.getElementsByClassName("complete"));
    const incompletesArray = Array.from(document.getElementsByClassName("incomplete"));
    if (element.checked) {
        switch (element.id) {
            case "all":
                completesArray.forEach(element => {
                    element.removeAttribute("hidden");
                });
                incompletesArray.forEach(element => {
                    element.removeAttribute("hidden");
                });
                break;
            case "completes":
                completesArray.forEach(element => {
                    element.removeAttribute("hidden");
                });
                incompletesArray.forEach(element => {
                    element.setAttribute("hidden", "");
                });
                break;
            case "incompletes":
                completesArray.forEach(element => {
                    element.setAttribute("hidden", "");
                });
                incompletesArray.forEach(element => {
                    element.removeAttribute("hidden");
                });
                break;
            default:
                break;
        }
    }
}
