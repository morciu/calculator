// Get screen node
const screen = document.querySelector("#screen");

// Get all number buttons
const nr_buttons = document.querySelectorAll(".nr");

// Get the dot button for floats
const floatDot = document.querySelector("#floatDot");

// Get all operators
const operators = document.querySelectorAll(".operator");
// Operator Array
const operatorArray = ['+', '-', '*', '/'];

// Equal Button
const equal = document.querySelector('#equals');

// Get Clear button
const clearBtn = document.querySelector('#clearBtn');

// Get Edit button
const editBtn = document.querySelector('#editBtn'); 

// Flag to stop adding an operator after another operator
let operatorBlock = false;

// Variables to store calculations
let a = 0;
let b = 0;
let currentOperator;

// Number clicks
nr_buttons.forEach(button => {
    button.addEventListener('click', function() {
        printOnDisplay(button.dataset.value);
    });
});

// Float dot clicks
floatDot.addEventListener('click', () => {
    // Check if the number already has a dot
    if (!screen.innerText.includes('.')) {
        screen.innerText += ".";
    }
});

// Operator clicks
operators.forEach(operator => {
    operator.addEventListener('click', () => {
        addOperator(operator.dataset.value);
    });
});

// Clear click
clearBtn.addEventListener('click', () => {clear()});

// Function to print nr on calculator display
function printOnDisplay(btn) {
    if (screen.innerText === '0') {
        screen.innerText = btn;
    }
    else {
        screen.innerText += btn;
    }
    operatorBlock = false;
}

// Clear all entries
function clear() {
    a = 0;
    b = 0;
    screen.innerText = '0';
}

// Edit click
editBtn.addEventListener('click', () => {
    editInput()
});

// Equals click
equal.addEventListener('click', () => {
    equals();
});


function addOperator(operator) {
    a, b = getNumbers();
    if (screen.innerText != '0' && (!operatorBlock)) {
        if (checkIfOperator(screen.innerText)) {
            screen.innerText = `${calculate(currentOperator)} ${operator}`
        }
        else {
            screen.innerText += ` ${operator}`;
            operatorBlock = true;
        }
        
    }

    currentOperator = operator;
}

function calculate(operator) {
    if (operator == '+') {
        return a + b;
    }
    else if (operator == '-') {
        return a - b;
    }
    else if (operator == '*') {
        return a * b;
    }
    else if (operator == '/') {
        if (a/b == Infinity) {
            return 0;
        }
        else {
            return a / b;
        }
    }
}

function getNumbers() {
    a = parseFloat(screen.innerText.split(` ${currentOperator}`)[0]);
    b = parseFloat(screen.innerText.split(` ${currentOperator}`)[1]);

    a = (Number.isNaN(a)) ? 0 : a;
    b = (Number.isNaN(b)) ? 0 : b;

    return a, b;
}

function checkIfOperator(string) {
    for (operator in operatorArray) {
        if (string.includes(operatorArray[operator])) {
            return true;
        }
    }
    return false;
}

function editInput() {
    screen.innerText = screen.innerText.substring(0, screen.innerText.length - 1);
}

function equals() {
    a, b = getNumbers();
    screen.innerText = calculate(currentOperator);
}

// Keyboard Shortcuts
document.addEventListener('keydown', (event) => {
    if (!isNaN(event.key.charAt(event.key.length - 1))) {
        printOnDisplay(event.key.charAt(event.key.length - 1));
    }
    else if (operatorArray.includes(event.key)) {
        addOperator(event.key);
    }
    else if (event.key == "Backspace") {
        editInput()
    }
    else if (event.key == "Enter") {
        equals();
    }
    else if (event.key == "Escape") {
        clear();
    }
});