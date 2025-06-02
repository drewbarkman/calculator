function add(a, b) {
  return a + b;
};

function subtract(a, b) {
	return a - b;
};

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) return undefined;
    return a / b;
}

function operate(num1, operator, num2) {
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case 'x':
            return multiply(num1, num2);
        case '÷':
            return divide(num1, num2);
    } 
    return 'error';
}

let operator = '+';
let num1 = '';
let num2 = '';

const display = document.querySelector('#display');
const num_buttons = document.querySelectorAll('.num');
const clear_button = document.querySelector('#clear');
const operator_buttons = document.querySelectorAll('.operator');
const solve = document.querySelector('#solve');

function updateDisplay(numString) {
    display.textContent += numString;
}

function clearDisplay() {
    display.textContent = '';
}

num_buttons.forEach((button) => {
    button.addEventListener('click', () => {
        updateDisplay(button.textContent);
    })
});

clear_button.addEventListener('click', () => {
    clearDisplay();
});

operator_buttons.forEach((button) => {
    button.addEventListener('click', () => {
        num1 = parseFloat(display.textContent);
        operator = button.textContent;
        clearDisplay();
    });
})

solve.addEventListener('click', () => {
    num2 = parseFloat(display.textContent);
    answer = operate(num1, operator, num2);
    display.textContent = answer;
})