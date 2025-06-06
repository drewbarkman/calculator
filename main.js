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
    if (b === 0) return 'bruh...';
    return a / b;
}

function operate(num1, operator, num2) {
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '–':
            return subtract(num1, num2);
        case 'x':
            return multiply(num1, num2);
        case '÷':
            return divide(num1, num2);
    } 
    return 'error';
}

function updateDisplay(numString) {
    display.textContent = parseFloat(display.textContent + numString).toString();
}

function clearDisplay() {
    display.textContent = '';
}

function checkForSelected(nodeList, className) {
    for (let n = 0; n < nodeList.length; n++) {
        if (nodeList[n].classList.contains(className)) {
            return true;
        }
    }
    return false;
}

let operator = '';
let num1 = '';
let num2 = '';
let answer = '';
let clear = false;

const display = document.querySelector('#display');
const num_buttons = document.querySelectorAll('.num');
const clear_button = document.querySelector('#clear');
const operator_buttons = document.querySelectorAll('.operator');
const solve_button = document.querySelector('#solve');
const decimal_button = document.querySelector('#decimal');
const negative_button = document.querySelector('#neg');

num_buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if (clear) clearDisplay();
        clear = false;
        updateDisplay(button.textContent);
    })
});

clear_button.addEventListener('click', () => {
    clearDisplay();
    num1 = operator = num2 = '';
    operator_buttons.forEach((button) => {button.classList.remove('selected')})
});

operator_buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if (!checkForSelected(operator_buttons, 'selected')) {
            num1 = parseFloat(display.textContent);
            operator = button.textContent;
            button.classList.add('selected');
            clear = true;
        } else {
            num2 = parseFloat(display.textContent);
            // console.log(num1, operator, num2);
            answer = operate(num1, operator, num2);
            operator_buttons.forEach((button) => {button.classList.remove('selected')})
            display.textContent = num1 = answer;

            operator = num2 = '';
            operator = button.textContent;
            button.classList.add('selected');
            clear = true;
        }
    });
});

solve_button.addEventListener('click', () => {
    num2 = parseFloat(display.textContent);
    answer = operate(num1, operator, num2);
    operator_buttons.forEach((button) => {button.classList.remove('selected')})
    display.textContent = answer;
    clear = true;
});

decimal_button.addEventListener('click', () => {
    if (display.textContent.includes('.')) return;
    display.textContent += '.';
});

negative_button.addEventListener('click', () => {
    if (display.textContent.charAt(0) !== '-') {
        display.textContent = '-' + display.textContent;
    } else {
        display.textContent = display.textContent.slice(1);
    }
})