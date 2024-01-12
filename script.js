const display = document.querySelector('.display')
const buttons = document.querySelectorAll('.buttons button')

let currentInput = ''
let operator = ''

buttons.forEach(button => {
    button.addEventListener('click', function () {
        const buttonValue = button.dataset.value;

        if (buttonValue === 'C/A') {
            // Clear or All Clear
            currentInput = ''
            operator = ''
        } else if (buttonValue === 'DEL') {
            // Delete the last character
            currentInput = currentInput.slice(0, -1)
        } else if (buttonValue === '=') {
            // Evaluate the expression
            if (currentInput && operator) {
                currentInput = calculateResult();
                operator = ''
            }
        } else if (button.classList.contains('operator')) {
            // Handle operators
            if (currentInput && !operator) {
                operator = buttonValue;
                currentInput += operator
            }
        } else {
            // Handle numbers and dot
            currentInput += buttonValue
        }

        // Update the display
        display.value = currentInput
    })
})

function calculateResult() {
    const numbers = currentInput.split(/[-+*/%]/)
    const num1 = parseFloat(numbers[0])
    const num2 = parseFloat(numbers[1])

    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            return num1 / num2;
        case '%':
            // Handle percentage separately
            if (num2) {
                return (num1 * num2) / 100;
            } else {
                return num1 / 100;
            }
        default:
            return currentInput;
    }
}


// Add event listener to buttons, call calculate() on click. The forEach() method calls a function for each element in an array. source https://www.w3schools.com/jsref/jsref_foreach.asp
buttons.forEach((button) => {
    // Button click listener calls calculate() with dataset value as an argument.
    button.addEventListener('click', (e) => calculate(e.target.dataset.value,e.target.dataset.type))
})
