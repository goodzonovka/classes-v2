const escapeClass = cls => {
    return cls
        .replace(/\\/g, '\\\\')
        .replace(/:/g, '\\:')
        .replace(/\+/g, '\\+')
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
    return str.replace(/([+\-*/])/g, match => ` ${match} `).replace(/\s+/g, ' ').trim();
};

const isValidCalcExpression = str => {
    const regex = /^calc\((?:[a-z0-9.%]+(?:[+\-*/][a-z0-9.%]+)+)\)$/i;
    return regex.test(str);
}

const isStrictInteger = value => /^(0|[1-9]\d*)$/.test(value);

const isValidCssNumber = (value) => {
    return /^-?(0|[1-9]\d*)(\.\d+)?$/.test(value);
};


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
        let {opacityValue, rgb} = colorInfo;
        const rgbStr = Object.values(rgb).join(', ');
        if (opacityValue && +opacityValue > 1 && +opacityValue < 100) {
            if (opacityValue < 10) {
                opacityValue = `0.0${opacityValue}`
            } else if (opacityValue > 9 && opacityValue < 100) {
                opacityValue = `0.${opacityValue}`
            }
            return `rgba(${rgbStr}, ${opacityValue})`;
        }
        return `rgba(${rgbStr}, 1)`;
    }
};

module.exports = {
    escapeClass,
    normalizeCalcExpression,
    isValidCalcExpression,
    hexToRgb,
    isStrictInteger,
    isValidCssNumber,
    getColorValue,
};
