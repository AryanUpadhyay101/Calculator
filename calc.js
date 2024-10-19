// Select elements
const screen = document.getElementById('screen');
const keys = document.querySelector('.calc-keys');

let currentInput = '';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

// Function to update screen
function updateScreen(value) {
    screen.value = value;
}

// Function to handle number input
function inputNumber(number) {
    if (waitingForSecondOperand) {
        currentInput = number;
        waitingForSecondOperand = false;
    } else {
        currentInput = currentInput === '0' ? number : currentInput + number;
    }
    updateScreen(currentInput);
}

// Function to handle operator input
function handleOperator(nextOperator) {
    const inputValue = parseFloat(currentInput);

    if (operator && waitingForSecondOperand) {
        operator = nextOperator;
        return;
    }

    if (firstOperand === null && !isNaN(inputValue)) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);
        currentInput = `${result}`;
        updateScreen(currentInput);
        firstOperand = result;
    }

    waitingForSecondOperand = true;
    operator = nextOperator;
}

// Function to perform calculation
function calculate(first, second, operator) {
    if (operator === '+') return first + second;
    if (operator === '-') return first - second;
    if (operator === '*') return first * second;
    if (operator === '/') return first / second;
    return second;
}

// Function to handle decimal input
function inputDecimal(dot) {
    if (!currentInput.includes(dot)) {
        currentInput += dot;
    }
    updateScreen(currentInput);
}

// Function to reset the calculator
function resetCalculator() {
    currentInput = '0';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    updateScreen(currentInput);
}

// Add event listener to keys
keys.addEventListener('click', (event) => {
    const { target } = event;
    const value = target.value;

    if (!target.matches('button')) return;

    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
            handleOperator(value);
            break;
        case '.':
            inputDecimal(value);
            break;
        case '=':
            handleOperator(value);
            break;
        case 'all-clear':
            resetCalculator();
            break;
        default:
            if (Number.isInteger(parseFloat(value))) {
                inputNumber(value);
            }
    }
});
