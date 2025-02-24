// Function to append numbers and operators
function appendNumber(num) {
    document.getElementById("display").value += num;
}

// Function to clear the display
function clearDisplay() {
    document.getElementById("display").value = "";
}

// Function to delete the last character (Backspace)
function backspace() {
    let display = document.getElementById("display");
    display.value = display.value.slice(0, -1);
}

// Function to evaluate the expression
function calculate() {
    try {
        document.getElementById("display").value = eval(document.getElementById("display").value);
    } catch {
        document.getElementById("display").value = "Error";
    }
}

// Keyboard Support
document.addEventListener("keydown", function(event) {
    const key = event.key;
    if ((key >= "0" && key <= "9") || "+-*/.%".includes(key)) {
        appendNumber(key);
    } else if (key === "Enter") {
        calculate();
    } else if (key === "Backspace") {
        backspace();
    } else if (key === "Escape") {
        clearDisplay();
    }
});
