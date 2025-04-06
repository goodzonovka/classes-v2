import {specialLogic} from "./mappings.js";

export function escapeClass(cls) {
    return cls
        .replace(/\\/g, '\\\\')
        .replace(/:/g, '\\:')
        .replace(/\./g, '\\.')
        .replace(/\//g, '\\/')
        .replace(/\*/g, '\\*')
        .replace(/!/g, '\\!');
}

export function createRule(cls, property, value, isImportant = false, isResponsive = false) {
    if (isResponsive) {
        return `.${escapeClass(cls)} {\n ${property.map(p => `\t\t${p}: ${value}${isImportant ? ' !important' : ''};`).join(' \n ')} \n\t}`;
    }
    return `.${escapeClass(cls)} {\n ${property.map(p => `\t${p}: ${value}${isImportant ? ' !important' : ''};`).join(' \n ')} \n}`;
}

export function resolveCssValue(value, isNegative, props, rawClass, prefix, isStatic) {
    const isSpecialValue = specialLogic?.[props.join()]?.[rawClass];

    let result = null;

    console.log(value)

    if (value === 'px') {
        result = isNegative ? '-1px' : '1px';
    } else if (value === 'auto') {
        result = 'auto';
    } else if (value === 'full') {
        result = '100%';
    } else if (value === 'min') {
        result = 'min-content';
    } else if (value === 'max') {
        result = 'max-content';
    } else if (value === 'fit') {
        result = 'fit-content';
    } else if ((prefix === 'leading-' || prefix === 'order-') && !isNaN(parseFloat(value)) || props.join() === 'text-align') {
        result = value;
    } else if (/^\d+\/\d+$/.test(value)) {
        const [num1, num2] = value.split('/');
        result = `${num1 * 100 / num2}%`; // для значений: 1/2, 3/4, 9/12 и тд, возвращает процент
    } else if (isSpecialValue) {
        result = isSpecialValue; // особые значения из списка (d-flex: flex, w-screen: 100vw и тд)
    } else if (!isNaN(parseFloat(value))) {
        result = `${isNegative ? '-' : ''}${parseFloat(value) * 4}px`
    } else if (isStatic) {
        result = rawClass; // для статических, где класс = значению (absolute, relative, flex и тд)
    }

    return [result, isSpecialValue]
}
