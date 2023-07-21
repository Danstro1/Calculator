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
const display = document.querySelector('.display .main-screen');
display.dataset.value = '';
const subScreen = document.querySelector('.display .sub-screen')
const operations = document.querySelectorAll('.fourth button');
const equals = document.querySelector('.equality');
const buttonClearAll = document.querySelector('.clear-all');
const buttonClearOne = document.querySelector('.clear-one')
const decimal = document.querySelector('.decimal');
const sign = document.querySelector('.sign')

numbers.forEach(number => number.addEventListener('click',() => addNumber(number.textContent)));
operations.forEach(operation => operation.addEventListener('click',() => oper(operation.textContent)));
equals.addEventListener('click', equal);
buttonClearAll.addEventListener('click',clearAll);
buttonClearOne.addEventListener('click', clearOne);
decimal.addEventListener('click',typeDecimal);
sign.addEventListener('click',changeSing);
window.addEventListener('keydown',keyboardInput);

function equal(){
    if(firstNumber === null || op === true) return;
    secondNumber = +display.dataset.value;
    display.dataset.value = operate(operator,firstNumber,secondNumber);
    display.textContent = display.dataset.value;
    subScreen.textContent += ` = `;
    eq = true;
    op = false;
    firstNumber = null;
    secondNumber = null;
    operator = null;
}

function oper(o){
    if(op !== false){
        operator = o;
        return;
    }
    if(firstNumber !== null){
        secondNumber = +display.dataset.value;
        display.dataset.value = operate(operator,firstNumber,secondNumber);
        display.textContent = display.dataset.value;
        subScreen.textContent += display.textContent;
        secondNumber = null;
        operator = null;
    }
    op = true;
    firstNumber = +display.dataset.value;
    operator = o;
    subScreen.textContent = `${display.dataset.value} ${o} `;
    display.dataset.value = '';

}

function addNumber(number){
    if(eq == true){
        display.dataset.value = '';
        display.textContent = '0';
        eq = false;
    }
    if(display.dataset.value === '' && number === '0') return;
    display.dataset.value += number;
    subScreen.textContent += number;
    op = false;
    display.textContent = display.dataset.value;
}

function clearAll(){
    display.textContent = '0';
    subScreen.textContent = '';
    firstNumber = null;
    operator = null;
    secondNumber = null;
    eq = false;
    op = false;
    display.dataset.value = '';
}

function clearOne(){
    display.dataset.value = display.dataset.value.slice(0,display.dataset.value.length - 1);
    if(display.dataset.value.length === 0) display.textContent = '0';
    else display.textContent = display.dataset.value;
}

function typeDecimal(){
    if (secondNumber !== null) return;
    if(display.dataset.value.split('').includes('.')) return;
    if(display.dataset.value === '') display.dataset.value = '0';
    display.dataset.value += '.';
    display.textContent = display.dataset.value;
}

function changeSing(){
    display.dataset.value = -display.dataset.value;
    display.textContent = display.dataset.value;
}   

function keyboardInput(e){
    if(e.key >= 0 && e.key <= 9) addNumber(e.key);
    if('/*-+'.includes(e.key)) oper(e.key);
    if(e.key === "Backspace") clearOne();
    if(e.key === 'Escape') clearAll();
    if(e.key === '=' || e.key === 'Enter') equal();
    if(e.key === '.') typeDecimal();
}