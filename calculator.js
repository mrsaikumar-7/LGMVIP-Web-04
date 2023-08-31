const result = document.getElementById("result");
const buttons = document.querySelectorAll("button");
const calculateButton = document.getElementById("calculate");
const clearButton = document.getElementById("clear");
const historyList = document.getElementById("history-list");

let decimalAdded = false;

buttons.forEach(button => {
    button.addEventListener("click", () => {
        if (button.textContent === "=") {
            try {
                const expression = result.value;
                const resultValue = eval(expression);
                result.value = resultValue;
                addToHistory(expression, resultValue);
            } catch (error) {
                result.value = "Error";
            }
        } else if (button.textContent === "C") {
            result.value = "";
            decimalAdded = false;
        } else if (button.textContent === ".") {
            if (!decimalAdded) {
                result.value += ".";
                decimalAdded = true;
            }
        } else {
            result.value += button.textContent;
        }
    });
});

function addToHistory(expression, resultValue) {
    const historyItem = document.createElement("li");
    historyItem.textContent = `${expression} = ${resultValue}`;
    historyList.appendChild(historyItem);
}

const backspaceButton = document.createElement("button");
backspaceButton.textContent = "⌫";
backspaceButton.addEventListener("click", () => {
    result.value = result.value.slice(0, -1);
    if (result.value.endsWith(".")) {
        decimalAdded = false;
    }
});
buttons[buttons.length - 1].parentNode.appendChild(backspaceButton);

document.addEventListener("keydown", event => {
    const key = event.key;
    if (/^\d$/.test(key) || key === "." || key === "+" || key === "-" || key === "*" || key === "/" || key === "=") {
        event.preventDefault();
        const keyButton = Array.from(buttons).find(button => button.textContent === key);
        if (keyButton) {
            keyButton.click();
        }
    } else if (key === "Backspace") {
        event.preventDefault();
        backspaceButton.click();
    }
});
