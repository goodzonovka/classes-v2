const escapeClass = cls => {
    return cls
        .replace(/\\/g, '\\\\')
        .replace(/:/g, '\\:')
        .replace(/\./g, '\\.')
        .replace(/\//g, '\\/')
        .replace(/\[/g, '\\[')
        .replace(/\]/g, '\\]')
        .replace(/\*/g, '\\*')
        .replace(/'/g, "\\'")
        .replace(/!/g, '\\!')
        .replace(/,/g, '\\,')
        .replace(/\(/g, '\\(')
        .replace(/\)/g, '\\)')
        .replace(/\%/g, '\\%')
        .replace(/\>/g, '\\>');
}

const normalizeCalcExpression = str => {
    // Добавляем пробелы вокруг операторов, только если их нет
    return str.replace(/([^\s])([+\-*/])([^\s])/g, '$1 $2 $3');
}

const isValidCalcExpression = str => {
    const regex = /^calc\((?:[a-z0-9.%]+(?:[+\-*/][a-z0-9.%]+)+)\)$/i;
    return regex.test(str);
}

const isNumeric = value =>
    !isNaN(parseFloat(value)) &&
    isFinite(value) &&
    Number.isInteger(Number(value));

const isNumber = value =>
    !isNaN(value) && isFinite(parseFloat(value));

const hexToRgb = (hex) => {
    // Удаляем # если есть
    hex = hex.replace(/^#/, '');

    // Если короткий формат (#abc)
    if (hex.length === 3) {
        hex = hex.split('').map(char => char + char).join('');
    }

    const num = parseInt(hex, 16);

    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;

    return {r, g, b};
};

const getColorValue = (colorInfo) => {
    if (colorInfo.fixedValue) {
        return `${colorInfo.fixedValue}`;
    } else {
        const {opacityValue, rgb} = colorInfo;
        const rgbStr = Object.values(rgb).join(', ');
        if (opacityValue) {
            return `rgba(${rgbStr}, 0.${opacityValue})`;
        }
        return `rgba(${rgbStr}, 1)`;
    }
};

module.exports = {
    escapeClass,
    normalizeCalcExpression,
    isValidCalcExpression,
    hexToRgb,
    isNumeric,
    isNumber,
    getColorValue,
};
