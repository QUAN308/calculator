let getNumber = document.querySelectorAll('.row_number .number');
let getOperator = document.querySelectorAll('.operator div');
let clear = document.querySelector('.row_number .clear');
let input = document.querySelector('.inputNumber');
let equal = document.querySelector('.btn-equal');
let resultDisplayed = false; 
for(var i=0;i<getNumber.length;i++){
    getNumber[i].addEventListener("click", function(e){
        console.log(e.target.innerHTML);
        let current = input.innerHTML;
        let lastChar = current[current.length - 1];
        if(resultDisplayed == false){
            input.innerHTML += e.target.innerHTML; // lấy số từ ô nhập đưa lên ô input
        }else if(resultDisplayed == true && lastChar === "+" || lastChar === "-" || lastChar === "x" || lastChar === "/"){
            resultDisplayed = false;
            input.innerHTML += e.target.innerHTML;
        }else{
            resultDisplayed = false;
            input.innerHTML = "";
            input.innerHTML += e.target.innerHTML;
        }
    });
}
for (var i=0;i<getOperator.length;i++){
    getOperator[i].addEventListener("click", function(e){
        let currentInput = input.innerHTML;
        let lastChar = currentInput[currentInput.length - 1];
        if(lastChar === "+" || lastChar === "-" ||lastChar === "x" || lastChar === "/" ){
            var newString = currentInput.substring(0, currentInput.length - 1) + e.target.innerHTML;
            currentInput = newString;
        }else if(currentInput.length == ""){
            console.log("Hãy nhập một số");
        }else{
            input.innerHTML += e.target.innerHTML;
        }
    });
}
equal.addEventListener("click", function(e){
    let inputString = input.innerHTML;
    let numbers = inputString.split(/\+|\-|\x|\//g);
    let operators = inputString.replace(/[0-9]|\./g, "").split(" ")
    console.log(numbers)
    console.log(operators);

    let divide = operators.indexOf('/');
    while(divide != -1){
        numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
        operators.splice(divide, 1);
        divide = operators.indexOf("/");
    }
    let add = operators.indexOf('+');
    while(add != -1){
        numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
        operators.splice(add, 1);
        add = operators.indexOf("+");
    }
    let multiple = operators.indexOf('x');
    while(multiple != -1){
        numbers.splice(multiple, 2, parseFloat(numbers[multiple]) * parseFloat(numbers[multiple + 1]));
        operators.splice(multiple, 1);
        multiple = operators.indexOf("x");
    }
    let minus = operators.indexOf('-');
    while(minus != -1){
        numbers.splice(minus, 2, parseFloat(numbers[minus]) - parseFloat(numbers[minus + 1]));
        operators.splice(minus, 1);
        minus = operators.indexOf("-");
    }
    input.innerHTML = numbers[0];

    resultDisplayed = true;
})
clear.addEventListener("click", () => {
    input.innerHTML = "";
})
