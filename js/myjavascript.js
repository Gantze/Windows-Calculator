let memoryGreyButtons = document.getElementsByClassName('grey-memory-buttons');
let digits = document.querySelectorAll('.digits');
let operators = document.querySelectorAll('.operators');
let equals = document.getElementById('equals');
let displayValue = document.getElementById('display');
let clear = document.querySelectorAll('.clear');
let erase = document.getElementById('delete');
let point = document.getElementById('point');
let opposite = document.getElementById('plus-minus');
let oneDivX = document.getElementById('one-divided');
let exponential = document.getElementById('exponential');
let squareRoot = document.getElementById('square-root');

let calculator = {
    firstNumber: null,
    operator: null,
    secondNumber: null,
    result: null,
    constantNumber: null,
    constantOperator: null
}

let mathSigns = {
    '+': (x, y) => Number(x) + Number(y),
    '-': (x, y) => Number(x) - Number(y),
    'x':  (x, y) => Number(x) * Number(y),
    '/':  (x, y) => Number(x) / Number(y)
}

function addMemory() {   
    for (let i = 0; i < memoryGreyButtons.length; i++) {
        memoryGreyButtons[i].style.color = "black";
        memoryGreyButtons[i].style.cursor = "pointer";
        memoryGreyButtons[i].onmouseover = function() {
            memoryGreyButtons[i].style.backgroundColor = "hsl(0, 0%, 83%)";
            memoryGreyButtons[i].style.borderColor = "darkgrey";
        }
        memoryGreyButtons[i].onmouseout = function() {
            memoryGreyButtons[i].style.backgroundColor = "hsl(0, 0%, 90%)";
            memoryGreyButtons[i].style.borderColor = "hsl(0, 0%, 90%)";
        }
    }
    memoryGreyButtons[0].title = "Clear all memory (Ctrl+L)";
    memoryGreyButtons[1].title = "Memory recall (Ctrl+R)";
    memoryGreyButtons[2].title = "Memory";
}

function clearMemory() {
    for (let i = 0; i < memoryGreyButtons.length; i++) {
        memoryGreyButtons[i].style.color = "hsl(0, 0%, 80%)";
        memoryGreyButtons[i].style.cursor = "default";
        memoryGreyButtons[i].onmouseover = function() {
            memoryGreyButtons[i].style.backgroundColor = "hsl(0, 0%, 90%)";
            memoryGreyButtons[i].style.borderColor = "hsl(0, 0%, 90%)";
        }
        memoryGreyButtons[i].removeAttribute("title");
    }
}

digits.forEach( (digit) => {
    digit.addEventListener('click', (event) => digitClick(event));
});

function digitClick(event) {
    if(calculator.operator) {
        if(!calculator.secondNumber || displayValue.innerHTML === '0') {
            calculator.secondNumber = event.target.textContent;
            displayValue.innerHTML = Number(event.target.textContent);
        } else {
            calculator.secondNumber += event.target.textContent;
            displayValue.innerHTML += Number(event.target.textContent);
        }
    } else {
        if(!calculator.firstNumber || displayValue.innerHTML === '0') {
            calculator.firstNumber = event.target.textContent;
            displayValue.innerHTML = Number(event.target.textContent);
        } else {
            calculator.firstNumber += event.target.textContent;
            displayValue.innerHTML += Number(event.target.textContent);
        }
    }
}

operators.forEach( (operator) => {
    operator.addEventListener('click', (event) => operatorClick(event));
});

function operatorClick(event) {
    if(!calculator.operator) {
        calculator.operator = event.target.textContent;
    } else {
        if(calculator.operator === '/' && calculator.secondNumber == 0) {
            displayValue.innerHTML = 'Cannot divide by zero';
        } else {
            let calculate = mathSigns[calculator.operator];
            calculator.result = calculate(calculator.firstNumber, calculator.secondNumber);
            displayValue.innerHTML = calculator.result;
            calculator.firstNumber = calculator.result;
            calculator.operator = event.target.textContent;
            calculator.secondNumber = null;
            calculator.constantNumber = null;
            calculator.constantOperator = null;
        }    
    }
}

equals.addEventListener('click', () => equalsClick());

function equalsClick() {
    if(calculator.operator === '/' && calculator.secondNumber == 0) {
        displayValue.innerHTML = 'Cannot divide by zero';
    } else {  
        if(calculator.secondNumber) {
            let calculate = mathSigns[calculator.operator]; 
            calculator.result = calculate(calculator.firstNumber, calculator.secondNumber);
            displayValue.innerHTML = calculator.result;
            calculator.firstNumber = calculator.result;
            calculator.constantOperator = calculator.operator;
            calculator.constantNumber = calculator.secondNumber;
            calculator.operator = null;
            calculator.secondNumber = null;
        } else {
            let calculate = mathSigns[calculator.constantOperator]; 
            calculator.result = calculate(calculator.firstNumber, calculator.constantNumber);
            displayValue.innerHTML = calculator.result;
            calculator.firstNumber = calculator.result;
        }
    } 
}

clear.forEach( (button) => {
    button.addEventListener('click', () => clearDisplay());
});

function clearDisplay() {
    displayValue.innerHTML = 0;
    calculator.firstNumber = null;
    calculator.operator = null;
    calculator.secondNumber = null;
    calculator.result = null;
    calculator.constantOperator = null;
    calculator.constantNumber = null;
}

erase.addEventListener('click', () => deleteLast());

function deleteLast() {
    if(!calculator.secondNumber) {
        if(calculator.operator || calculator.result) {
            return;
        }
        else if(displayValue.innerHTML.length === 1) {
            calculator.firstNumber = null;
            displayValue.innerHTML = 0;
        } else {
            let arrayOfDigits = calculator.firstNumber.split('');
            arrayOfDigits.pop();
            calculator.firstNumber = arrayOfDigits.join('');
            displayValue.innerHTML = calculator.firstNumber;
        }
    } else {
        if(displayValue.innerHTML.length === 1) {
            calculator.secondNumber = null;
            displayValue.innerHTML = 0;
        } else {
            let arrayOfDigits = calculator.secondNumber.split('');
            arrayOfDigits.pop();
            calculator.secondNumber = arrayOfDigits.join('');
            displayValue.innerHTML = calculator.secondNumber;
        }
    }
}

point.addEventListener('click', () => decimalNumber());

function decimalNumber() {
    if(displayValue.innerHTML.includes('.')) {
        return;
    } else {
        if(calculator.operator) {
            if(!calculator.secondNumber) {
                calculator.secondNumber = '0.';
                displayValue.innerHTML = calculator.secondNumber;
            } else {
                calculator.secondNumber = `${calculator.secondNumber}.`;
                displayValue.innerHTML = calculator.secondNumber;
            }          
        } else {
            if(!calculator.firstNumber) {
                calculator.firstNumber = '0.';
                displayValue.innerHTML = calculator.firstNumber;
            } else {
                calculator.firstNumber = `${calculator.firstNumber}.`;
                displayValue.innerHTML = calculator.firstNumber;
            } 
        }
    }
}

opposite.addEventListener('click', () => oppositeNumber());

function oppositeNumber() {
    if(calculator.operator) {
        if(!calculator.secondNumber) {
            calculator.secondNumber = calculator.firstNumber * -1;
            displayValue.innerHTML = calculator.secondNumber;
        } else {
            calculator.secondNumber = calculator.secondNumber * -1;
            displayValue.innerHTML = calculator.secondNumber;
        }
    } else {
        calculator.firstNumber = calculator.firstNumber * -1;
        displayValue.innerHTML = calculator.firstNumber;
    }
}

oneDivX.addEventListener('click', () => oneDivided());

function oneDivided() {
    if(calculator.operator) {
        if(!calculator.secondNumber) {
            calculator.secondNumber = 1 / calculator.firstNumber;
            displayValue.innerHTML = calculator.secondNumber;
        } else {
            calculator.secondNumber = 1 / calculator.secondNumber;
            displayValue.innerHTML = calculator.secondNumber;
        }
    } else {
        calculator.firstNumber = 1 / calculator.firstNumber;
        displayValue.innerHTML = calculator.firstNumber;
    }
}

exponential.addEventListener('click', () => calculateExponential());

function calculateExponential() {
    if(calculator.operator) {
        if(!calculator.secondNumber) {
            calculator.secondNumber = Math.pow(calculator.firstNumber, 2);
            displayValue.innerHTML = calculator.secondNumber;
        } else {
            calculator.secondNumber = Math.pow(calculator.secondNumber, 2);
            displayValue.innerHTML = calculator.secondNumber;
        }
    } else {
        calculator.firstNumber = Math.pow(calculator.firstNumber, 2);
        displayValue.innerHTML = calculator.firstNumber;
    }
}

squareRoot.addEventListener('click', () => calculateSquareRoot());

function calculateSquareRoot() {
    if(calculator.operator) {
        if(!calculator.secondNumber) {
            calculator.secondNumber = Math.sqrt(calculator.firstNumber);
            displayValue.innerHTML = calculator.secondNumber;
        } else {
            calculator.secondNumber = Math.sqrt(calculator.secondNumber);
            displayValue.innerHTML = calculator.secondNumber;
        }
    } else {
        calculator.firstNumber = Math.sqrt(calculator.firstNumber);
        displayValue.innerHTML = calculator.firstNumber;
    }
}










