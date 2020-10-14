let validator = require('../App/InputValidator');

class Controller {
    constructor(requestBody, response) {
        this.req = requestBody;
        this.res = response;
        this.errors = {};
        this.clean = {};
        this.expected = [];
        this.required = [];
        this.validator = validator;
    }

    checkStrings(expected, required) {
        this.expected = expected;
        this.required = required;
        let field;
        let rule;
        this.checkRequired();
        for (field in this.expected) {
            // if this field is not present, continue
            if (this.errors[field])
                continue;
            let is_ok = true;
            for (rule in this.expected[field]) {
                is_ok = this.validator[rule](this.req[field], this.expected[field][rule]);
                if (!is_ok) {
                    this.setError(field, rule, this.expected[field][rule]);
                    break;
                }
            }
            if (is_ok) {
                this.clean[field] = this.req[field];
            }
        }
    }

    getErrors() {
        return this.errors;
    }

    getClean() {
        return this.clean;
    }

    setError(fieldName, errorName, expectedValue) {
        if (!this.errors[fieldName])
            this.errors[fieldName] = {};
        this.errors[fieldName][errorName] = expectedValue;
    }

    checkRequired() {
        let i;
        let len = this.required.length;
        for (i = 0; i < len; i++) {
            let name = this.required[i];
            if (!this.req[name]) {
                this.setError(name, 'required', true);
            }

        }
    }

    isString(val) {
        return typeof val == 'string';
    }

}

module.exports = Controller;