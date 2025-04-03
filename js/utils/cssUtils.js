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