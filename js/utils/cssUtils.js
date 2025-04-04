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

export function resolveCssValue(value, isNegative, props, rawClass, prefix) {
    const isStatic = specialLogic?.[props.join()];
    const isSpecialValue = specialLogic?.[props.join()]?.[rawClass];

    if (value === 'px') {
        return isNegative ? '-1px' : '1px';
    } else if (value === 'auto') {
        return 'auto';
    } else if (value === 'full') {
        return '100%';
    } else if (/^\d+\/\d+$/.test(value)) {
        const [num1, num2] = value.split('/');
        return `${num1 * 100 / num2}%`; // для значений: 1/2, 3/4, 9/12 и тд, возвращает процент
    } else if (isSpecialValue) {
        return isSpecialValue; // особые значения из списка (d-flex: flex, w-screen: 100vw и тд)
    } else if (!isNaN(parseFloat(value))) {
        return `${isNegative ? '-' : ''}${parseFloat(value) * 4}px`
    } else if (isStatic && rawClass === prefix) {
        return rawClass; // для статических, где класс = значению (absolute, relative, flex и тд)
    }
}
