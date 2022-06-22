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

function splitToStringsByNumericClasses(number){
    let numberStr = '' + number;
    let numberOfNumericClasses = ~~(numberStr.length / 3);
    let classes = [];
    for (let i = 0; i < numberOfNumericClasses; i++){
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
            return to_10_19_Names(+numbersString);
        }
        let tensDesc = toTensName(+numbersString[0]);
        let onesDesc = toOnesName(+numbersString[1]);
        return `${tensDesc}${onesDesc ? ' ' + onesDesc : ''}`;
    }
    let hundreds = toOnesName(+numbersString[0]) +' hundred';
    if (numbersString[1] === '1'){
        return hundreds + ' ' + to_10_19_Names(+numbersString.slice(-2));
    }
    let tens = toTensName(+numbersString[1]);
    let onesDesc = toOnesName(+numbersString[2]);
    return `${hundreds}${tens ? ' ' + tens : ''}${onesDesc ? ' ' + onesDesc : ''}`;
}

function numericClassToReadable(numericClass){
    let classDescription;
    switch (numericClass) {
        case 1:
            classDescription = 'thousand';
            break;
        case 2:
            classDescription = 'million';
            break;
        case 3:
            classDescription = 'billion';
            break;
        case 4:
            classDescription = 'trillion';
            break;
        default:
            classDescription = '';
            break;
    }
    return classDescription;
};

function toOnesName(digit){
    let name = '';
    switch (digit) {
        case 1:
            name = 'one';
            break;
        case 2:
            name = 'two';
            break;
        case 3:
            name = 'three';
            break;
        case 4:
            name = 'four';
            break;
        case 5:
            name = 'five';
            break;
        case 6:
            name = 'six';
            break;
        case 7:
            name = 'seven';
            break;
        case 8:
            name = 'eight';
            break;
        case 9:
            name = 'nine';
            break;
        default:
            name = '';
            break;
    }
    return name;
}

function to_10_19_Names(digit) {
    let name;
    switch (digit) {
        case 10:
            name = 'ten';
            break;
        case 11:
            name = 'eleven';
            break;
        case 12:
            name = 'twelve';
            break;
        case 13:
            name = 'thirteen';
            break;
        case 14:
            name = 'fourteen';
            break;
        case 15:
            name = 'fifteen';
            break;
        case 16:
            name = 'sixteen';
            break;
        case 17:
            name = 'seventeen';
            break;
        case 18:
            name = 'eighteen';
            break;
        case 19:
            name = 'nineteen';
            break;
        default:
            name = '';
            break;
    }
    return name;
}

function toTensName(digit){
    let name = '';
    switch (digit) {
        case 2:
            name = 'twenty';
            break;
        case 3:
            name = 'thirty';
            break;
        case 4:
            name = 'forty';
            break;
        case 5:
            name = 'fifty';
            break;
        case 6:
            name = 'sixty';
            break;
        case 7:
            name = 'seventy';
            break;
        case 8:
            name = 'eighty';
            break;
        case 9:
            name = 'ninety';
            break;
        default:
            name = '';
            break;
    }
    return name;
}