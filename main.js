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
    if (b === 0) return 'error';
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
    // console.log(`Post calculation ans: ${answer}`)
    if (Number.isNaN(answer)) return 'error';
    if (!(Number.isInteger(answer))) {
        // console.log(`Before rounded answer: ${answer}`)
        let decimalCount = 8 - (Math.floor(answer).toString().length + 1);
        answer = answer.toFixed(decimalCount);
    }
    // console.log(`After rounded answer: ${answer}`)
    if (answer.toString().length >= 9) return 'too large';
    return answer;
}

function updateDisplay(numString) {
    if (clear) clearDisplay();
    clear = false;
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

function operatorPressed(button) {
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
const backspace_button = document.querySelector('#backspace');

num_buttons.forEach((button) => {
    button.addEventListener('click', () => {
        updateDisplay(button.textContent);
    })
});

clear_button.addEventListener('click', () => {
    clearDisplay();
    num1 = operator = num2 = '';
    operator_buttons.forEach((button) => {button.classList.remove('selected')})
});

operator_buttons.forEach((button) => {
    button.addEventListener('click', () => operatorPressed(button));
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
    if (answer !== '') {
        display.textContent = answer;
    }
})

backspace_button.addEventListener('click', () => {
    display.textContent = display.textContent.slice(0, -1);
})

const NUMBERS = '1234567890'
const OPERATORS = '+-x/*÷–'

document.addEventListener('keydown', (event) => {
    console.log(event.key);
    if (NUMBERS.includes(event.key)) {
        updateDisplay(event.key)
    } else if (OPERATORS.includes(event.key)) {
        let operatorEquiv = '';
        switch(event.key) {
            case '/':
                operatorEquiv = '÷';
                break;
            case '*':
                operatorEquiv = 'x';
                break;
            case '-':
                operatorEquiv = '–';
                break;
            default:
                operatorEquiv = event.key;
        }

        const matchedButton = [...operator_buttons].find((button) => button.textContent === operatorEquiv);
        operatorPressed(matchedButton);
    } else if (event.key === 'Enter' || event.key === '=') {
        num2 = parseFloat(display.textContent);
        answer = operate(num1, operator, num2);
        operator_buttons.forEach((button) => {button.classList.remove('selected')})
        display.textContent = answer;
        clear = true;
    } else if (event.key === 'Backspace') {
        display.textContent = display.textContent.slice(0, -1);
    } else if (event.key === '.') {
        if (!(display.textContent.includes('.'))) display.textContent += '.';
    }
});