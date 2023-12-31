// h2 element
let h2tag = document.querySelector('.js-h2')

// Input and output field elements
let userInput = document.querySelector('.js-input');
let userOutput = document.querySelector('.js-output');

// Clears fields when page is opened
userInput.value = '';
userOutput.value = '';

// Button elements
let convertButton = document.querySelector('.js-convert');
let resetButton = document.querySelector('.js-reset');
let swapButton = document.querySelector('.js-swap');

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

// Ensures input only contains decimal digits and one decimal point
const checkInput = (value) => {
  // Counter to keep track of number of decimal points
  let periodCount = 0;

  // If there is no value or value is only a '.', return false
  if (!value || value === '.') {
    return false;
  }

  if (isDecimal) {
    // If input contains more than digits 0-9 and '.', flag as an error
    if (value.match('[^.0-9]')) {
      errorElement.innerHTML = `Error: Must only contain a decimal number (no spaces)`;
      return false;
    }
  } else {
    if (value.match('[^.0-1]')) {
      errorElement.innerHTML = `Error: Must only contain a binary number (no spaces)`;
      return false;
    }
  }

  // Clears error if current input has none
  errorElement.innerHTML = ``;

  // Iterates through input and finds total number of decimal points and position of
  // the last seen decimal point
  for (let i = 0; i < Number(value.length); i++) {
    if ((/[.]/).test(value.charAt(i))) {
      periodCount++;
      periodPos = i;
    }
  }

  // If number of decimals > 1, flag as an error
  if (periodCount > 1) {
    errorElement.innerHTML = `Error: Must only contain one decimal point`;
    return false;
  } else if (periodCount === 1) {
    // If there is only one decimal, input is a fraction
    isFraction = true;
  } else {
    // Else input is only a whole number
    isFraction = false;
  }

  // Input is valid
  return true;
}

// Divides input into two strings if necessary
const handleInput = (value) => {
  // If input is a fraction split into two strings
  if (isFraction) {
    // If position of decimal point is at the beginning, there is no whole number
    if (periodPos === 0) {
      wholeNumber = '';
      fraction = '0' + value.substring(0, value.length);
    } else {
      // Else whole number is before decimal point and fraction is after
      wholeNumber = value.substring(0, periodPos);
      fraction = '0.' + value.substring(periodPos + 1, value.length);
    }
  } else {
    // Else only handle whole number input
    wholeNumber = value;
  }
};

// Function to convert decimal numbers to binary
const decimalToBinary = (output) => {
  // Stores binary whole number and fraction portions seperately to be combined later
  let binaryNumber = '';
  let binaryFraction = '';

  // If whole number is 0, store in variable
  if (Number(wholeNumber) === 0) {
    binaryNumber = '0';
  } else {
    // Else convert number to binary while number > 0
    while (Number(wholeNumber) > 0) {
      // Adds modulo 2 of whole number to binary string then divides whole number by two
      binaryNumber = (wholeNumber % 2).toString() + binaryNumber;
      wholeNumber = Math.floor(wholeNumber / 2);
    }
  }

  // Converts fraction portion if there is one
  if (isFraction) {
    // Keeps track of number of fraction digits calculated (max 12);
    let fractionDigits = 0;

    // If fraction portion is not equal to 0 add decimal point to string
    if (fraction != 0) {
      binaryFraction = '.';
    }

    // While fraction is not 0, convert to binary
    while (fraction != 0) {
      // If number of fraction digits converted is 12, break out of loop
      if (fractionDigits > 11) {
        break;
      }

      // Multiplies fraction by 2. If ceiling yields 2, or (fraction - 1) is 0, add '1' to
      // fraction string and subtract fraction by 1. Else, add '0'.
      fraction *= 2;
      if (Math.ceil(fraction) === 2 || (fraction - 1) === 0) {
        binaryFraction = binaryFraction + '1';
        fraction--;
      } else {
        binaryFraction = binaryFraction + '0';
      }

      // Increments counter
      fractionDigits++;
    }
  }

  // Outputs final conversion
  output.value = `${binaryNumber}${binaryFraction}`;
};

// Function to convert binary numbers to decimal
const binaryToDecimal = (output) => {
  // Stores decimal whole number and fraction portions seperately to be combined later
  let decimalNumber = 0;
  let decimalFraction = 0;

  // Values to multiply whole number and fraction portions
  let wholeNumFactor = 1;
  let fractionFactor = 0.5;

  // Loops through whole number string
  for (let i = wholeNumber.length - 1; i >= 0; i--) {
    // Multiplies binary digit by whole number factor and adds to variable
    decimalNumber += (Number(wholeNumber.charAt(i)) * wholeNumFactor);

    //Multiplies factor by 2 for the next iteration
    wholeNumFactor *= 2;
  }

  // Loops through fraction string if there is one
  if (isFraction) {
    for (let i = 2; i < fraction.length; i++) {
      // Multiplies binary digit by fraction factor and adds to variable
      decimalFraction += (Number(fraction.charAt(i)) * fractionFactor);

      // Divides factor by 2 for the next iteration
      fractionFactor /= 2;
    }
  }

  // Outputs final conversion
  output.value = `${decimalNumber + decimalFraction}`;
};

// Function to check and handle input and convert from decimal to binary or vice versa
const convert = () => {
  // Clears output field before each call of the function
  userOutput.value = '';

  // If input is incorrect, flags error and returns early
  if (!checkInput(userInput.value)) {
    return;
  }
  
  // Handles input accordingly and converts
  handleInput(userInput.value);

  // Converts to binary or decimal depending on boolean value
  if (isDecimal) {
    decimalToBinary(userOutput);
  } else {
    binaryToDecimal(userOutput);
  }
}

// If flips isDecimal value and changes prompt message
const swap = () => {
  if (isDecimal) {
    isDecimal = false;
    h2tag.innerHTML = 'Enter Binary Number';
    document.title = 'Binary to Decimal Converter';
  } else {
    isDecimal = true;
    h2tag.innerHTML = 'Enter Decimal Number';
    document.title = 'Decimal to Binary Converter';
  }
  
  // Clears fields
  reset();
}

// Clears input and output fields
const reset = () => {
  userInput.value = '';
  userOutput.value = '';
  errorElement.innerHTML = '';
}
 
// Runs convert function when convert button is pressed
convertButton.addEventListener('click', () => convert());

// Swaps between decimal and binary conversion
swapButton.addEventListener('click', () => swap());

// Clears user input field
resetButton.addEventListener('click', () => reset());