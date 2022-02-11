// Get screen node
const screen = document.querySelector("#screen");

// Get all number buttons
const nr_buttons = document.querySelectorAll(".nr");

// Add click event to all number buttons
nr_buttons.forEach(button => {
    button.addEventListener('click', function() {
        printOnDisplay(button);
    });
});

// Function to print nr on calculator display
function printOnDisplay(btn) {
    if (screen.innerText === '0') {
        screen.innerText = btn.dataset.value;
    }
    else {
        screen.innerText += btn.dataset.value;
    }
}