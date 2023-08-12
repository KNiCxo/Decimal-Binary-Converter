// Input and ouutput field elements
let userInput = document.querySelector('.js-input');
let userOutput = document.querySelector('.js-output');
userInput.value = '';
userOutput.value = '';

// Button elements
let convertButton = document.querySelector('.js-convert');
let resetButton = document.querySelector('.js-reset');
let swapButton = document.querySelector('.js-swapButton');

// Error message element
let errorElement = document.querySelector('.js-error');

// Boolean to check if converting to binary or decimal
let isDecimal = true;

// Boolean to check if the input contains a fraction
let isFraction = false;

// Keeps track of the position of the decimal point
let periodPos = 0;

// Stores the whole number and fraction portions of the input
let wholeNumber;
let fraction;

const checkInput = (value) => {
  let periodCount = 0;

  if (!value) {
    return;
  }

  if (value.match('[^.0-9]')) {
    errorElement.innerHTML = `Error: Must only contain decimal digits`;
    return false;
  } else {
    errorElement.innerHTML = ``;
  }

  for (let i = 0; i < Number(value.length); i++) {
    if ((/[.]/).test(value.charAt(i))) {
      periodCount++;
      periodPos = i;
    }
  }

  if (periodCount > 1) {
    errorElement.innerHTML = `Error: Must only contain one decimal point`;
    return false;
  } else if (periodCount === 1) {
    isFraction = true;
  } else {
    isFraction = false;
  }
  return true;
}

const handleInput = (value) => {
  if (isFraction) {
    if (periodPos === 0) {
      wholeNumber = '';
      fraction = value.substring(0, value.length);
    } else {
      wholeNumber = value.substring(0, periodPos);
      fraction = '0.' + value.substring(periodPos + 1, value.length);
    }
  } else {
    wholeNumber = value;
  }
};

const decimalToBinary = (output) => {
  let binaryNumber = '';

  if (Number(wholeNumber) === 0) {
    binaryNumber = '0';
  } else {
    while (Number(wholeNumber) > 0) {
      binaryNumber = (wholeNumber % 2).toString() + binaryNumber;
      wholeNumber = Math.floor(wholeNumber / 2);
    }
  }
  
  console.log(binaryNumber);
  output.value = `${binaryNumber}`;
};

const convert = () => {
  userOutput.value = '';

  if (!checkInput(userInput.value)) {
    return;
  }
  handleInput(userInput.value);
  decimalToBinary(userOutput);
}
 
convertButton.addEventListener('click', () => convert());