function getInput(value) {
    var userInput = value;
    var display = document.getElementsByClassName("display");
    var currentDisplayValue = display[0].innerText;

    if (currentDisplayValue === "ERROR") {   // if it is error: remove error 
        display[0].innerText = "";
        currentDisplayValue = "";
    }

    if (userInput === 'DEL') {
        deleteLastDigit(display[0]);
        return;
    }
    if (currentDisplayValue === "0" && isOperator(userInput)) { // 0 
        display[0].innerText = currentDisplayValue + userInput;
        return;
    }
    if (userInput === '.' && currentDisplayValue.includes('.')) { // only one dot is there:
        return;
    }

    if (currentDisplayValue.slice(-1) === '.' && isOperator(userInput)) { // last character is .  (.+ .- .* ./) 
        return;
    }

    if (currentDisplayValue === "0" && !isOperator(userInput) && userInput !== '.') { 
        display[0].innerText = userInput;
        return;
    }

    if (currentDisplayValue === "" && userInput === '0') {
        display[0].innerText = userInput;
        return;
    }

    if (currentDisplayValue === "" && isOperator(userInput)) { // if it is empty then no operations should not be allowed
        return;
    }

    if (currentDisplayValue.length < 12) {
        if (currentDisplayValue === "0" && isOperator(userInput)) {
            return;
        } else if (isOperator(userInput) && isOperator(currentDisplayValue.slice(-1))) {
            display[0].innerText = currentDisplayValue.slice(0, -1) + userInput; // replacing the operator1 to operator2
        } else if (isOperator(userInput) && currentDisplayValue.length > 0 && !isOperator(currentDisplayValue.slice(-1))) {
            display[0].innerText += userInput;
        }else {
            display[0].innerText += userInput;
        }
    }
}

function isOperator(value) {
    return value === '+' || value === '-' || value === 'x' || value === '/';
}

function deleteLastDigit(display) {
    var display = document.getElementsByClassName("display");
    var currentDisplayValue = display[0].innerText;
    var newDisplayValue = currentDisplayValue.slice(0, -1);
    if (newDisplayValue === "" || newDisplayValue === "-") {
        display[0].innerText = "0";
    } else if(currentDisplayValue=='ERROR'){
        display[0].innerText = "0";
    }
    else {
        display[0].innerText = newDisplayValue;
    }
}

function appendDecimal() {
    var display = document.getElementsByClassName("display");
    var currentDisplayValue = display[0].innerText;
    if (!currentDisplayValue.includes('.')) {
        display[0].innerText += '.';
    }
}

function resetAll(value){
    var display = document.getElementsByClassName("display");
    display[0].innerText = value;
}

function result() {
    var display = document.getElementsByClassName("display");
    var expression = display[0].innerText;
    var correctedExpression = expression.replace(/x/g, "*");

    try {
        var result = eval(correctedExpression);
        if (typeof result === "number" && isFinite(result)) {
            var formattedResult = parseFloat(result.toPrecision(12));
            display[0].innerText = formattedResult;
        } else {
            display[0].innerText = "ERROR";
        }
    } catch (error) {
        display[0].innerText = "ERROR";
    }
}
