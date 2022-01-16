function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    if (operator == '+') {
        return add(num1, num2);
    } else if (operator == '-') {
        return subtract(num1, num2);
    } else if (operator == '×' || operator == '*' || operator == 'x') {
        return multiply(num1, num2);
    } else if (operator == '÷' || operator == '/') {
        return divide(num1, num2);
    }
}

let operator = null;
let num1 = null;
let num2 = null;
let lastOperation = null;

let lastButton = null;
let lastNumber = null;
let lastAnswers = [];
//let stateHistory = [];

//stateHistory[n] = {num1: 1, operator: '$', num2:};


const calculatorBody = document.querySelector('.calculator');

const digitButtons = document.querySelector('.digit-buttons').children;
const operatorButtons = document.querySelector('.operator-buttons').children; 
const answerButtons = document.querySelector('.answer-buttons').children; 

const display = document.querySelector('.display');
const allButtons = document.querySelectorAll('div.buttons > div > div');

const equalsButton = document.querySelector('.equals-button');
const clearButton = document.querySelector('.clear-button');
const undoButton = document.querySelector('.undo-button');
const backspaceButton = document.querySelector('.backspace-button');
const dotButton = document.querySelector('.dot-button');

//let factor = 1;
//function screenFit() {
//    let numberWidth = display.scrollWidth;
//    let screenWidth = display.offsetWidth;
//    
//    factor = screenWidth / (numberWidth/ factor);
//    console.log(display.scrollWidth + ' x ' + display.offsetWidth + ' + ' + factor);
//    if (numberWidth/factor > screenWidth) {
//        display.style.fontSize = factor*2 + 'em';
//        display.style.padding = 0.25 + ((1 - factor) * 1.5) + 'em 0.25em';
//    } else {
//        display.style.fontSize = '2em';
//    }
//}

function digitButtonPress(e) {
    
    let targetVal = null;
    if (e.type == "keydown") {
        targetVal = e.key;
    } else {
        targetVal = e.target.innerText;
    }

    //display update
    if (lastButton == 'operator' || lastButton == 'equals' || lastButton == 'undo') {
        display.innerHTML = targetVal;
    } else {
        display.innerHTML += targetVal;
    }
    screenFit();
    
    if (num1 != null && operator != null) {
        equalsButton.classList.remove('unselectable');
    }
    
    lastButton = 'digit';
    backspaceButton.classList.remove('unselectable');
}

function dotButtonPress(e) {

    let targetVal = null;
    if (e.type == "keydown") {
        targetVal = e.key;
    } else {
        targetVal = e.target.innerText;
    }

    if (dotButton.classList.contains('unselectable') == false) {
        display.innerHTML += e.target.innerText;
        dotButton.classList.add('unselectable');
    }
    lastButton = 'dot';
}

function operatorButtonPress(e) {
    if (lastOperation == null || lastOperation == 'equals') {
        lastAnswers.push(parseFloat(display.innerText));
//        console.log(lastAnswers + 'operator');
    }
        
    let targetVal = null;
    if (e.type == "keydown") {
        targetVal = e.key;
        if (targetVal == 'x') {targetVal = '×';} 
        if (targetVal == 'p') {targetVal = '+';} 
        if (targetVal == 'm') {targetVal = '-';} 
        if (targetVal == 't') {targetVal = '×';} 
        if (targetVal == 'd') {targetVal = '÷';} 
    } else {
        targetVal = e.target.innerText;
    }
    
    if (lastOperation == 'operator') {
        num2 = parseFloat(display.innerText);
//        console.log(num1, operator, num2);
        let answer = operate(operator, num1, num2);
        display.innerHTML = answer;
            screenFit();
//        stateHistory.push({
//            num1: num1,
//            operator: operator,
//            num2: num2
//        });
        num1 = answer;
        operator = targetVal;
        lastAnswers.push(parseFloat(display.innerText));
        
    } else {
        operator = targetVal;
        num1 = parseFloat(display.innerText);
        display.innerHTML = operator;
            screenFit();
    }
    lastOperation = 'operator';
    lastButton = 'operator';
    backspaceButton.classList.add('unselectable');
    

}

Array.from(digitButtons).forEach(digitButton => {
    if (digitButton.innerText == '.') {
        digitButton.addEventListener('click', dotButtonPress);
    } else {
        digitButton.addEventListener('click', digitButtonPress);
    }
});

Array.from(operatorButtons).forEach(operatorButton => {
    operatorButton.addEventListener('click', operatorButtonPress);
});

function equalsButtonPress() {
    if (equalsButton.classList.contains('unselectable') == false) {
        if (lastOperation != 'equals') {
            num2 = parseFloat(display.innerText);
        }
        
//        console.log(num1, operator, num2);
        let answer = operate(operator, num1, num2);
        display.innerHTML = answer;
            screenFit();
        lastAnswers.push(answer);
        
        num1 = answer;
        
        let id = null;
        let timer = 1;
        clearInterval(id);
        id = setInterval (frame, 15);
        let calcRotate = 0;
        function frame() {
            calculatorBody.style.transform = "rotate("+calcRotate/1.5+"deg)";
            display.style.backgroundColor = "rgba(255,255,"+(255 - (calcRotate*20))+",1)";

            if (timer == 11) {
                clearInterval(id);
                display.style.backgroundColor = 'white';
                display.style.boxShadow = 'inset 0px 1px 2px black';
            } else {
                if (timer < 6) {
                    calcRotate += 1; 
                    display.style.boxShadow = '0px 0px 10px white';
                } else if (timer < 10) {
                    calcRotate -= 1;
                }
                timer++;
            }
        }
    }
    lastOperation = 'equals';
    lastButton = 'equals';
    backspaceButton.classList.add('unselectable');
}

function clearButtonPress() {
    operator = null;
    num1 = null;
    num2 = null;
    lastOperation = null;
    lastButton = null;
    lastAnswers = [];
//    stateHistory = [];
    
    let id = null;
    let timer = 1;
    clearInterval(id);
    id = setInterval (frame, 10);
    let calcRotate = 0;
    function frame() {
        calculatorBody.style.transform = "rotate("+calcRotate/1.2+"deg)";
        display.style.color = "rgba(0,0,0,"+1/timer+")";
        
        if (timer == 31) {
            clearInterval(id);
            display.innerText = '';
            display.style.color = 'black';
            equalsButton.classList.add('unselectable');
            backspaceButton.classList.add('unselectable');
            clearButton.classList.add('unselectable');
            undoButton.classList.add('unselectable');
            dotButton.classList.remove('unselectable');

        } else {
            if (timer < 5) {calcRotate -= 1;}
            else if (timer < 15) {calcRotate += 1;}
            else if (timer < 25) {calcRotate -= 1;}
            else if (timer < 30) {calcRotate += 1;}
            timer++;
        }
    }
    
}

function leftShake(vigor, length) {
    let id = null;
    let timer = 1;
    clearInterval(id);
    id = setInterval (frame, 10);
    let calcRotate = 0;
    function frame() {
        calculatorBody.style.transform = "rotate("+calcRotate/vigor+"deg)";
    
        if (timer == (length*2) + 1) {
            clearInterval(id);
        } else {
            if (timer < length) {calcRotate -= 1;}
            else if (timer < length*2) {calcRotate += 1;}
            timer++;
        }
    }
}

function undoButtonPress() {
    if (undoButton.classList.contains('unselectable') == false) {
        if (lastAnswers.length == 0) {
            display.innerText = '';
            undoButton.classList.add('unselectable');
        } else if (lastButton == 'operator'|| lastButton == 'undo') {
            display.innerText = lastAnswers.pop();
//            stateHisory.pop();
        } else if (lastButton == 'equals') {
            display.innerText = lastAnswers.pop();
            display.innerText = lastAnswers.pop();
//            stateHisory.pop(); stateHisory.pop();
        }
        
        //RISKY
        num2 = null;
        operator = null;
        equalsButton.classList.add('unselectable');

        lastButton = 'undo';
        leftShake(1, 7);
    }
}

function backspaceButtonPress() {
    if (backspaceButton.classList.contains('unselectable') == false) {
        if (display.innerText != '' && lastButton == 'digit') {
            display.innerText = display.innerText.slice(0, -1);
        } 
        if (display.innerText == '') {
            backspaceButton.classList.add('unselectable');
        }

        leftShake(2, 5);
    }
}

equalsButton.addEventListener('click', equalsButtonPress);
clearButton.addEventListener('click', clearButtonPress);
undoButton.addEventListener('click', undoButtonPress);
backspaceButton.addEventListener('click', backspaceButtonPress);


function buttonPressAnim(e, buttonType) {
    let target = null;
    if (e.type == "keydown" && buttonType == 'digit') {
        target = digitButtons[digitKeyArray.indexOf(e.key)];
    } else if (e.type == "keydown" && buttonType == 'altOperator') {
        target = operatorButtons[altOperatorKeyArray.indexOf(e.key == 'x' ? '*' : e.key)];
    } else if (e.type == "keydown") {
        target = operatorButtons[operatorKeyArray.indexOf(e.key == 'x' ? '*' : e.key)];
    } else {
        target = e.target;
    }
    
    if (target.classList.contains('unselectable') == false) {
        let id = null;
        let timer = 0;
        clearInterval(id);
        id = setInterval (frame, 200);
        target.style.top = target.offsetTop += 1;
        function frame() {
            if (timer == 1) {
                clearInterval(id);
            } else {
                target.style.top = target.offsetTop -= 1;
                timer++;
            }
        }
    }
    clearButton.classList.remove('unselectable');
    if (lastButton == 'operator') {
        backspaceButton.classList.add('unselectable');
        equalsButton.classList.add('unselectable');
        undoButton.classList.remove('unselectable');
    }
    
    
}

Array.from(allButtons).forEach(allButton => {
    allButton.addEventListener('click', buttonPressAnim);
});

//display.addEventListener()

const digitKeyArray = ['.','0','1','2','3','4','5','6','7','8','9'];
const operatorKeyArray = ['+', '-', '*', '/', 'x'];
const altOperatorKeyArray = ['p', 'm', 't', 'd'];

document.addEventListener('keydown', function (event) {
    const valid = (element) => element == event.key;
    if (digitKeyArray.some(valid) ){
        digitButtonPress(event);
        buttonPressAnim(event, 'digit');
    } else if (operatorKeyArray.some(valid) ){
        operatorButtonPress(event);
        buttonPressAnim(event, 'operator');
    } else if (altOperatorKeyArray.some(valid) ){
        operatorButtonPress(event);
        buttonPressAnim(event, 'altOperator');
    }
    if (event.key == 'Backspace') { backspaceButtonPress();}
    if (event.key === 'Enter' || event.key === '=') { equalsButtonPress();}
    if (event.key === 'z' | event.key === 'u') {undoButtonPress();}
if (event.key === 'Z' || event.key === 'q') {clearButtonPress();}
});

