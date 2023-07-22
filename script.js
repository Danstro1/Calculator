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
let cleared = false;


const numbers = document.querySelectorAll('.number');
const display = document.querySelector('.display .main-screen');
display.dataset.value = '';
const subScreen = document.querySelector('.display .sub-screen')
const operations = document.querySelectorAll('.fourth button');
const equals = document.querySelector('.equality');
const buttonClearAll = document.querySelector('.clear-all');
const buttonClearOne = document.querySelector('.clear-one')
const decimal = document.querySelector('.decimal');
const sign = document.querySelector('.sign');

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
        subScreen.textContent = `${subScreen.textContent.slice(0,subScreen.textContent.length - 2)} ${operator} `;
        return;
    }
    if(firstNumber !== null){
        secondNumber = +display.dataset.value;
        display.dataset.value = operate(operator,firstNumber,secondNumber);
        display.textContent = display.dataset.value;
        subScreen.textContent += display.dataset.value;
        secondNumber = null;
        operator = null;
    }
    if(display.dataset.value === '') return;
    op = true;
    firstNumber = +display.dataset.value;
    operator = o;
    subScreen.textContent = `${display.dataset.value} ${operator} `;
    display.dataset.value = '';     
    eq = false;
}

function addNumber(number){
    if(eq === true){
        display.dataset.value = '';
        display.textContent = '0';
        subScreen.textContent = '';
        eq = false;
    }
    if(display.dataset.value === '0' && number === '0') return;
    if(!display.dataset.value.includes('.') && display.dataset.value === '0'){
        display.dataset.value = '';
        subScreen.textContent = subScreen.textContent.slice(0,subScreen.textContent.length - 1);
    }
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
    if(eq === true || op === true){
        clearAll();
        return;
    } 
    display.dataset.value = display.dataset.value.slice(0,display.dataset.value.length - 1);
    if(display.dataset.value.length === 0 && firstNumber !== null){
        display.dataset.value = '';
        display.textContent = '';
        subScreen.textContent = subScreen.textContent.slice(0,subScreen.textContent.length - 1);
        op = true;
    }
    else if(display.dataset.value.length === 0){
        display.dataset.value = '';
        display.textContent = '0';
        subScreen.textContent = subScreen.textContent.slice(0,subScreen.textContent.length - 1);
        op = true;
    }
    else{
        display.textContent = display.dataset.value;
        subScreen.textContent = subScreen.textContent.slice(0,subScreen.textContent.length - 1);
    }
}

function typeDecimal(){
    if (secondNumber !== null) return;
    if(display.dataset.value.split('').includes('.')) return;
    if(display.dataset.value === '') {
        display.dataset.value = '0';
        subScreen.textContent += '0';
    }
    display.dataset.value += '.';
    subScreen.textContent += '.';
    subScreen.textContent += display.dataset.value.slice(display.dataset.value.split('').findIndex(index => index === '.'),display.dataset.value.length - 1);
    display.textContent = display.dataset.value;

}

function changeSing(){
    if(display.dataset.value === '') return;
    if(eq === true){
        display.dataset.value = -display.dataset.value;
        display.textContent = display.dataset.value;
        return;
    }
    subScreen.textContent = subScreen.textContent.slice(0,-display.dataset.value.length);
    display.dataset.value = -display.dataset.value;
    display.textContent = display.dataset.value;
    subScreen.textContent += display.dataset.value;
}   

function keyboardInput(e){
    if(e.key >= 0 && e.key <= 9) addNumber(e.key);
    if('/*-+'.includes(e.key)){
        e.preventDefault();
        oper(e.key);
    }
    if(e.key === "Backspace") clearOne();
    if(e.key === 'Escape') clearAll();
    if(e.key === '=' || e.key === 'Enter'){
        e.preventDefault();
        equal();
    } 
    if(e.key === '.') typeDecimal();
}
