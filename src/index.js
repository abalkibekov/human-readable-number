module.exports = function toReadable (number) {
    if (number === 0){
        return 'zero';
    }

    let resultString = number < 0 ? 'minus' : '';
    number = Math.abs(number);
    let arrayOfNumbersInString = splitToStringsByNumericClasses(number);
    for (let i = arrayOfNumbersInString.length - 1, j = arrayOfNumbersInString.length; i >= 0; i--, j--) {
        let numDesc = numbersToReadble(arrayOfNumbersInString[i]);
        let classDesc = numericClassToReadable(i);
        resultString += (' ' + numDesc + ' ' + classDesc);
    }
    return resultString.trim();
}

const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
const tens_10_19 = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const numericClasses = ['', 'thousand', 'million', 'billion', 'trillion'];

function splitToStringsByNumericClasses(number){
    let numberStr = '' + number;
    let classes = [];
    while (numberStr.length > 3){
        classes.push(numberStr.slice(-3));
        numberStr = numberStr.slice(0, -3);
    }
    if (numberStr){
        classes.push(numberStr);
    }
    return classes;
}

function numbersToReadble(numbersString){
    if (numbersString.length === 1){
        return toOnesName(+numbersString[0]);
    }
    if (numbersString.length === 2){
        if (numbersString[0] === '1'){
            return to_10_19_Names(+numbersString[1]);
        }
        let tensDesc = toTensName(+numbersString[0]);
        let onesDesc = toOnesName(+numbersString[1]);
        return `${tensDesc}${onesDesc ? ' ' + onesDesc : ''}`;
    }
    let hundreds = toOnesName(+numbersString[0]) +' hundred';
    if (numbersString[1] === '1'){
        return hundreds + ' ' + to_10_19_Names(+numbersString[2]);
    }
    let tens = toTensName(+numbersString[1]);
    let onesDesc = toOnesName(+numbersString[2]);
    return `${hundreds}${tens ? ' ' + tens : ''}${onesDesc ? ' ' + onesDesc : ''}`;
}

function numericClassToReadable(digit){
    return digit < 0 || digit > 4 ? '' : numericClasses[digit];
};

function toOnesName(digit){
    return digit < 0 || digit > 9 ? '' : ones[digit];
}

function to_10_19_Names(digit) {
    return digit < 0 || digit > 9 ? '' : tens_10_19[digit];
}

function toTensName(digit){
    return digit < 0 || digit > 9 ? '' : tens[digit];
}