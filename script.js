// Get screen node
const screen = document.querySelector("#screen");

// Get all number buttons
const nr_buttons = document.querySelectorAll(".nr");

// Get all operators
const operators = document.querySelectorAll(".operator");

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
    if (screen.innerText != '0' && (!operatorBlock)) {
        screen.innerText += ` ${operator}`;
        operatorBlock = true;
        a, b = getNumbers();
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
    a = parseInt(screen.innerText.split(` ${currentOperator}`)[0]);
    b = parseInt(screen.innerText.split(` ${currentOperator}`)[1]);

    a = (Number.isNaN(a)) ? 0 : a;
    b = (Number.isNaN(b)) ? 0 : b;

    return a, b;
}