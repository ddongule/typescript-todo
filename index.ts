const VALID_NUMBER_OF_DIGITS = 3;
const BASE_DIGIT = 10;

export default class Calculator {
  result: number;
  operator: string;
  currentNumber: number;

  constructor() {
    this.result = 0;
    this.operator = '';
    this.currentNumber = 0;

    this.init();
  }

  init() {
    const $calculator = document.querySelector('.calculator');
    $calculator.addEventListener('click', this.onClickButton.bind(this));
  }

  onClickButton({ target: { innerText } }) {
    if (innerText === 'AC') {
      this.reset();
    } else {
      this.operate(innerText);
    }

    this.render(innerText);
  }

  render(innerText: number) {
    const $result = document.querySelector('#result') as HTMLElement;

    $result.innerText = this.isNumber(innerText) ? `${this.currentNumber}` : `${this.result}`;
  }

  isNumber(input: number) {
    return !isNaN(input);
  }

  operate(inputText: number) {
    if (this.isNumber(inputText)) {
      this.formatNumber(Number(inputText));

      return;
    }

    if (this.result === 0 && this.currentNumber === 0) return;

    this.result = this.calculate(this.result, this.currentNumber, this.operator);
    this.operator = `${inputText}`;
    this.currentNumber = 0;
  }

  validateCurrentNumber() {
    const isValid = String(this.currentNumber).length < VALID_NUMBER_OF_DIGITS;

    if (!isValid) {
      alert(`${VALID_NUMBER_OF_DIGITS}자리수 이상의 수는 넣을 수 없습니다.`);
      this.reset();

      return false;
    }

    return true;
  }

  formatNumber(digit: number) {
    if (this.validateCurrentNumber()) {
      this.currentNumber = this.currentNumber * BASE_DIGIT + digit;
    }
  }

  plus(a: number, b: number) {
    return a + b;
  }

  minus(a: number, b: number) {
    return a - b;
  }

  multiply(a: number, b: number) {
    return a * b;
  }

  divide(a: number, b: number) {
    return Number((a / b).toFixed(2));
  }

  calculate(number1: number, number2: number, operator: string) {
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
  }

  reset() {
    this.result = 0;
    this.operator = '';
    this.currentNumber = 0;
  }
}

new Calculator();
