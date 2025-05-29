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