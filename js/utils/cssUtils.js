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

export function resolveCssValue(value, isNegative) {
    if (value === 'px') {
        return isNegative ? '-1px' : '1px';
    } else if (!isNaN(parseFloat(value))) {
        return `${isNegative ? '-' : ''}${parseFloat(value) * 4}px`
    } else {
        return value;
    }
}