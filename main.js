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
    let answer = NaN;
    switch (operator) {
        case '+':
            answer = add(num1, num2);
            break;
        case '–':
            answer = subtract(num1, num2);
            break;
        case 'x':
            answer = multiply(num1, num2);
            break;
        case '÷':
            answer = divide(num1, num2);
            break;
    }
    console.log(`Post calculation ans: ${answer}`)
    if (answer === NaN) return 'error';
    if (!(Number.isInteger(answer))) {
        console.log(`Before rounded answer: ${answer}`)
        decimalCount = 8 - (Math.floor(answer).toString().length + 1);
        answer = answer.toFixed(decimalCount);
    }
    console.log(`After rounded answer: ${answer}`)
    if (answer.toString().length >= 9) return 'too large';
    return answer;
}

function updateDisplay(numString) {
    if (display.textContent.length >= 9) return;
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
const previous_answer_button = document.querySelector('#ans');

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

previous_answer_button.addEventListener('click', () => {
    display.textContent = answer;
})