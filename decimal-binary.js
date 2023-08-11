// Input field element
let userInput = document.querySelector('.js-input');

// Button elements
let convertButton = document.querySelector('.js-convert');
let resetButton = document.querySelector('.js-reset');
let swapButton = document.querySelector('.js-swapButton');

// Result element
let resultElement = document.querySelector('.js-result');

// Boolean to check if converting to binary or decimal
let isDecimal = true;

let isFraction = false;

let periodPos = 0;

const checkInput = (value) => {
  let periodCount = 0;
  if (value.match('[^.0-9]')) {
    resultElement.innerHTML = `Error: Must only contain decimal digits`;
    return;
  } else {
    resultElement.innerHTML = ``;
  }

  for (let i = 0; i < Number(value.length); i++) {
    if ((/[.]/).test(value.charAt(i))) {
      periodCount++;
      periodPos = i;
    }
  }

  if (periodCount > 1) {
    resultElement.innerHTML = `Error: Must only contain one decimal point`;
  } else if (periodCount === 1) {
    isFraction = true;
  } else {
    isFraction = false;
  }
  console.log(`Is fraction ${isFraction}`);
  console.log(`Position of decimal point ${periodPos}`);
}

const handleInput = (value) => {
  let wholeNumber;
  let fraction;
  if (isFraction) {
    if (periodPos === 0) {
      wholeNumber = '';
      fraction = value.substring(0, value.length);
    } else {
      wholeNumber = value.substring(0, periodPos);
      fraction = '0.' + value.substring(periodPos + 1, value.length);
    }
  }
  console.log(wholeNumber);
  console.log(fraction);
};

const decimalToBinary = (decimalValue) => {

};

convertButton.addEventListener('click', () => {
  checkInput(userInput.value);
  handleInput(userInput.value);
});

