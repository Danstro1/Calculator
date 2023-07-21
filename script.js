function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    if(b === 0) return "ERROR Division by 0"
    return a / b;
}


function operate(operator, a, b){
    switch(operator){
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
    }
}
let firstNumber = null;
let operator = null;
let secondNumber = null;
let eq = false;
let op = false;


const numbers = document.querySelectorAll('.number');
const display = document.querySelector('.display div');
display.dataset.value = '';
const operations = document.querySelectorAll('.fourth button');
const equals = document.querySelector('.equality');
const clearAll = document.querySelector('.clear');

numbers.forEach(number => number.addEventListener('click',addNumber));
operations.forEach(operation => operation.addEventListener('click',oper));
equals.addEventListener('click', equal);
clearAll.addEventListener('click',clear);

function equal(){
    if(firstNumber === null || op === true) return;
    secondNumber = +display.dataset.value;
    display.dataset.value = operate(operator,firstNumber,secondNumber);
    display.textContent = display.dataset.value;
    eq = true;
    op = false;
    firstNumber = null;
    secondNumber = null;
    operator = null;
}

function oper(){
    if(op !== false){
        operator = this.textContent;
        return;
    }
    if(firstNumber !== null){
        secondNumber = +display.dataset.value;
        display.dataset.value = operate(operator,firstNumber,secondNumber);
        display.textContent = display.dataset.value;
        operator = null;
    }
    op = true;
    firstNumber = +display.dataset.value;
    display.dataset.value = '';
    operator = this.textContent;
}

function addNumber(){
    if(eq == true){
        display.dataset.value = '';
        display.textContent = '0';
        eq = false;
    }
    if(display.dataset.value === '' && this.textContent === '0') return;
    display.dataset.value += this.textContent;
    op = false;
    display.textContent = display.dataset.value;
}

function clear(){
    display.textContent = '0';
    firstNumber = null;
    operator = null;
    secondNumber = null;
    eq = false;
    op = false;
    display.dataset.value = '';
}