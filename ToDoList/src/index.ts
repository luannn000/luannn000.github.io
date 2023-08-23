// Declara variáveis

const inputHTML = document.querySelector("#input") as HTMLInputElement;
const submitHTML = document.querySelector("#submit") as HTMLButtonElement;
const toDoHTML = document.querySelector("#to-do") as HTMLDivElement;
const showStatusArray = Array.from(
    document.getElementsByClassName("showStatus") as HTMLCollectionOf<HTMLInputElement>
);
let checkboxArray = Array.from(
    document.getElementsByClassName("checkbox") as HTMLCollectionOf<HTMLInputElement>
);

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

    let input : string = inputHTML.value;
    const mainDivHTML = document.createElement("div") as HTMLDivElement;
    const listDivHTML = document.createElement("div") as HTMLDivElement;
    const addToDo = document.createElement("p") as HTMLParagraphElement;
    const checkbox = document.createElement("input") as HTMLInputElement;

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

        checkboxArray = Array.from(
            document.getElementsByClassName("checkbox") as HTMLCollectionOf<HTMLInputElement>
        );

        // checkbox ao clicar

        checkboxArray.forEach(element => {
            element.addEventListener("click", event => {
                const target = event.target as HTMLInputElement;
                const parentElement = target.parentElement;

                console.log(parentElement?.classList);

                // Adiciona e remove classes

                if (target.checked == true) {
                    parentElement?.classList.remove("incomplete");
                    parentElement?.classList.add("complete");
                    console.log(parentElement?.classList);
                } else if (target.checked == false) {
                    parentElement?.classList.remove("complete");
                    parentElement?.classList.add("incomplete");
                    console.log(parentElement?.classList);
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
    })
}

function showStatusFunction(element : HTMLInputElement) {
    const completesArray = Array.from(
        document.getElementsByClassName("complete") as HTMLCollectionOf<HTMLDivElement>
    );
    const incompletesArray = Array.from(
        document.getElementsByClassName("incomplete") as HTMLCollectionOf<HTMLDivElement>
    );

    if (element.checked) {
        switch (element.id) {
            case "all":
                completesArray.forEach(element => {
                    element.removeAttribute("hidden");
                });
                incompletesArray.forEach(element => {
                    element.removeAttribute("hidden");
                })
                break;
            case "completes":
                completesArray.forEach(element => {
                    element.removeAttribute("hidden");
                });
                incompletesArray.forEach(element => {
                    element.setAttribute("hidden", "");
                })
                break;
            case "incompletes":
                completesArray.forEach(element => {
                    element.setAttribute("hidden", "");
                });
                incompletesArray.forEach(element => {
                    element.removeAttribute("hidden");
                })
                break;
            default:
                break;
        }
    }
}
