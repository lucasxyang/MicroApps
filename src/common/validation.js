/////////////////////////////////////////////////
// Custom validation module.
// Based on "validator" package.
//
// @file:   validation.js
// @author: Xiaosiqi Yang <yang4131@umn.edu>
/////////////////////////////////////////////////

/* jshint camelcase: false */

var validator = require('validator');

var validation = function () {

    // SANITIZATION METHODS
    // ==========================================
    //
    var sanitizeInput = function (input) {
        if (input) {
            input += ''; // convert to string ("validator" works only with strings)
            input = validator.trim(input);
        } else {
            input = null; // get rid of empty string or "undefined"
        }
        return input;
    };

    var convertToInt = function (str) {
        return validator.toInt(str);
    };
    
    var convertToFloat = function (str) {
        return validator.toFloat(str);
    };

    // VALIDATION METHODS
    // ==========================================
    //
    var validateInt = function (input, isRequired, label) {
        if (isRequired && !input) {
            return label + ' is required.';
        }
        if (input) {
            if (!validator.isInt(input)) {
                return label + ' must be an integer.';
            }
        }
        return '';
    };
    
    var validateFloat = function (input, isRequired, label) {
        if (isRequired && !input) {
            return label + ' is required.';
        }
        if (input) {
            if (!validator.isFloat(input)) {
                return label + ' must be a floating point number.';
            }
        }
        return '';
    };

    var validateString = function (input, isRequired, maxLen, label) {
        if (isRequired && !input) {
            return label + ' is required.';
        }
        if (input) {
            if (!validator.isByteLength(input, {
                    min: 1,
                    max: maxLen
                })) {
                return label + ' must be less than ' + maxLen + ' characters.';
            }
        }
        return '';
    };
    
    var validateDate = function (input, isRequired, label) {
        if (isRequired && !input) {
            return label + ' is required.';
        }
        if (input) {
            if (!validator.isDate(input)) {
                return label + ' must be a valid date.';
            }
        }
        return '';
    };
    
    return {
        sanitizeInput: sanitizeInput,
        convertToInt: convertToInt,
        convertToFloat: convertToFloat,
        validateInt: validateInt,
        validateFloat: validateFloat,
        validateString: validateString,
        validateDate: validateDate
    };

};

module.exports = validation;