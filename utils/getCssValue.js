const {rulesForStaticClasses} = require("./rulesForStaticClasses");
const {rulesForPrefixes} = require("./rulesForPrefixes");
const {isNumber, isNumeric, isValidCalcExpression, normalizeCalcExpression} = require("./functions");

function getValue(value, isNegative, propStr, rawClass, prefix, colorInfo) {
    // console.log(value, isNegative, propStr, rawClass, prefix, colorInfo)

    const isStaticValue = rulesForStaticClasses[propStr] && rulesForStaticClasses[propStr][rawClass];
    let result = null;

    if (isStaticValue) { // if has static classes
        return [rulesForStaticClasses[propStr][rawClass], isStaticValue];
    }

    const rulesForClass = rulesForPrefixes[prefix];
    if (!rulesForClass) return [null, null];

    const acceptedValues = rulesForClass.acceptableValues;
    const specialValues = rulesForClass.specialValues;

    if (
        !acceptedValues.negative && isNegative ||
        value === 'auto' && isNegative ||
        value === '0' && isNegative ||
        acceptedValues.minValue > value
    ) return [null, null]


    if (acceptedValues.auto && value === 'auto') { // can be auto
        result = 'auto';
    } else if (acceptedValues.valuePx && value === 'px') { // can be px
        result = '1px';
        if (acceptedValues.negative && isNegative) {  // can be negative px
            result = '-' + result;
        }
    } else if (acceptedValues.valueFull && value === 'full') { // can be full - 100%
        result = '100%';

        if (acceptedValues.negative && isNegative) {  // can be negative full - 100%
            result = '-' + result;
        }
    } else if (acceptedValues.number && isNumber(value)) { // can be number
        if (acceptedValues.valuePx) {
            result = `${value * 4}px`;
        } else if (acceptedValues.staticPx) {
            result = `${value}px`;
        } else {
            result = value;
        }

        if (acceptedValues.negative && isNegative) { // can be negative number with px OR negative only number
            result = '-' + result;
        }
    } else if (acceptedValues.numeric && isNumeric(value)) { // can be only numeric
        result = value;
        if (acceptedValues.negative && isNegative) { // can be negative only numeric
            result = '-' + result;
        }
    } else if (acceptedValues.valuePercent && /^\d+\/\d+$/.test(value)) { // can be only number/number + percent
        const [num1, num2] = value.split('/');
        result = `${(num1 * 100) / num2}%`

        if (acceptedValues.negative && isNegative) { // can be negative only number/number + percent
            result = '-' + result;
        }
    } else if (acceptedValues.valuesContent && getValuesContent[value]) {
        result = getValuesContent[value]
    } else if (acceptedValues.valueCalc && /^\[.*\]$/.test(value)) {
        value = value.slice(1, -1);
        if (isValidCalcExpression(value)) {
            result = normalizeCalcExpression(value);
        }
    }

    if (specialValues && specialValues[value] && !isNegative) {
        result = specialValues[value];
    } else if (rulesForClass.uniqueResult && (result || colorInfo)) {
        result = rulesForClass.uniqueResult(result || colorInfo);
    }

    // console.log('result', result)
    // console.log('value', value)

    return [result, isStaticValue];
}

const getValuesContent = {
    'min': 'min-content',
    'max': 'max-content',
    'fit': 'fit-content',
}

module.exports = {
    getValue,
}