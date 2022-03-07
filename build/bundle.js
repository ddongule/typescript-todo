System.register("index", [], function (exports_1, context_1) {
    "use strict";
    var VALID_NUMBER_OF_DIGITS, BASE_DIGIT, Calculator;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            VALID_NUMBER_OF_DIGITS = 3;
            BASE_DIGIT = 10;
            Calculator = /** @class */ (function () {
                function Calculator() {
                    this.result = 0;
                    this.operator = '';
                    this.currentNumber = 0;
                    this.init();
                }
                Calculator.prototype.init = function () {
                    var $calculator = document.querySelector('.calculator');
                    $calculator.addEventListener('click', this.onClickButton.bind(this));
                };
                Calculator.prototype.onClickButton = function (_a) {
                    var innerText = _a.target.innerText;
                    if (innerText === 'AC') {
                        this.reset();
                    }
                    else {
                        this.operate(innerText);
                    }
                    this.render(innerText);
                };
                Calculator.prototype.render = function (innerText) {
                    var $result = document.querySelector('#result');
                    $result.innerText = this.isNumber(innerText) ? "" + this.currentNumber : "" + this.result;
                };
                Calculator.prototype.isNumber = function (input) {
                    return !isNaN(input);
                };
                Calculator.prototype.operate = function (inputText) {
                    if (this.isNumber(inputText)) {
                        this.formatNumber(Number(inputText));
                        return;
                    }
                    if (this.result === 0 && this.currentNumber === 0)
                        return;
                    this.result = this.calculate(this.result, this.currentNumber, this.operator);
                    this.operator = "" + inputText;
                    this.currentNumber = 0;
                };
                Calculator.prototype.validateCurrentNumber = function () {
                    var isValid = String(this.currentNumber).length < VALID_NUMBER_OF_DIGITS;
                    if (!isValid) {
                        alert(VALID_NUMBER_OF_DIGITS + "\uC790\uB9AC\uC218 \uC774\uC0C1\uC758 \uC218\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
                        this.reset();
                        return false;
                    }
                    return true;
                };
                Calculator.prototype.formatNumber = function (digit) {
                    if (this.validateCurrentNumber()) {
                        this.currentNumber = this.currentNumber * BASE_DIGIT + digit;
                    }
                };
                Calculator.prototype.plus = function (a, b) {
                    return a + b;
                };
                Calculator.prototype.minus = function (a, b) {
                    return a - b;
                };
                Calculator.prototype.multiply = function (a, b) {
                    return a * b;
                };
                Calculator.prototype.divide = function (a, b) {
                    return Number((a / b).toFixed(2));
                };
                Calculator.prototype.calculate = function (number1, number2, operator) {
                    if (operator === '+') {
                        return this.plus(number1, number2);
                    }
                    if (operator === '-') {
                        return this.minus(number1, number2);
                    }
                    if (operator === '×') {
                        return this.multiply(number1, number2);
                    }
                    if (operator === '÷') {
                        return this.divide(number1, number2);
                    }
                    if (operator === '' || operator === '=') {
                        return number2;
                    }
                };
                Calculator.prototype.reset = function () {
                    this.result = 0;
                    this.operator = '';
                    this.currentNumber = 0;
                };
                return Calculator;
            }());
            exports_1("default", Calculator);
            new Calculator();
        }
    };
});
