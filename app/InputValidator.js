module.exports = class InputValidator {
    static minLength(val, minLen) {
        return val.length >= minLen;
    }

    static maxLength(val, maxLen) {
        return val.length <= maxLen;
    }

    static minValue(digit, min) {
        return digit >= min;
    }

    static maxValue(digit, max) {
        return digit <= max;
    }

    static isAlphabet(val) {
        let pattern = /^[a-z]+$/i;
        return pattern.test(val);
    }

    static isDigit(val) {
        let pattern = /^[0-9]+$/;
        return pattern.test(val);
    }

    static isAlphanumeric(val) {
        let pattern = /^[a-z0-9]+$/i;
        return pattern.test(val);
    }

    static isIn(val, arr) {
        return arr.indexOf(val) > -1;
    }

    static isNoSpace(val){
        let pattern = /\s/;
        return pattern.test(val) == false;
    }
}