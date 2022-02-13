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

// Equals Button
const equals = document.querySelector('#equals');

// Get Clear button
const clearBtn = document.querySelector('#clearBtn');

// Flag to stop adding an operator after another operator
let operatorBlock = false;

// Variables to store calculations
let a = 0;
let b = 0;
let currentOperator;

// Number clicks
nr_buttons.forEach(button => {
    button.addEventListener('click', function() {
        printOnDisplay(button);
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
        screen.innerText = btn.dataset.value;
    }
    else {
        screen.innerText += btn.dataset.value;
    }
    operatorBlock = false;
}

// Clear all entries
function clear() {
    a = 0;
    b = 0;
    screen.innerText = '0';
}

// Equals click
equals.addEventListener('click', () => {
    a, b = getNumbers();
    screen.innerText = calculate(currentOperator);
})


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
        return a / b;
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