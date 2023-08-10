// Input field element
let userInput = document.querySelector('.js-input');

// Button elements
let convertButton = document.querySelector('.js-convert');
let resetButton = document.querySelector('.js-reset');
let swapButton = document.querySelector('.js-swapButton');

// Result element
let resultElement = document.querySelector('.js-result');

// Boolean to check if converting to binary or decimal
let isBinary = true;

const checkValid = (value) => {
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
    }
  }

  if (periodCount > 1) {
    resultElement.innerHTML = `Error: Must only contain one decimal point`;
  }
}

const decimalToBinary = (decimalValue) => {

};

convertButton.addEventListener('click', () => {
  checkValid(userInput.value);
});

