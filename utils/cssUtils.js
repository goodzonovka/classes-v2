const {specialLogic} = require('./mappings.js');
const {isNumeric} = require('./functions.js');

function escapeClass(cls) {
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
        .replace(/\%/g, '\\%');
}

function resolveCssValue(value, isNegative, propsStr, rawClass, prefix, colorInfo) {
    const isStaticValue = specialLogic && specialLogic[propsStr] && specialLogic[propsStr][rawClass];

    let result = null;

    console.log(value, propsStr, rawClass, prefix)

    if (onlyStaticClasses.includes(propsStr)) {
        result = isStaticValue || null;
    } else if (/^\[.*\]$/.test(value) && propsStr !== 'content') {
        value = value.slice(1, -1);
        if (isValidCalcExpression(value)) {
            result = normalizeCalcExpression(value);
        }
    } else if (prefix === 'opacity-') {
        result = value < 10 ? `0.0${value}` : value < 100 ? `0.${value}` : 1;
    } else if (uniqueRules[propsStr] && propsStr !== 'space') {
        result = uniqueRules[propsStr].getValue(value, rawClass, prefix, isNegative);
    } else if (value === 'px') {
        result = isNegative ? '-1px' : '1px';
    } else if (value === 'auto' && prefix !== 'flex-') {
        result = 'auto';
    } else if (value === 'full') {
        result = '100%';
    } else if (value === 'min') {
        result = 'min-content';
    } else if (value === 'max') {
        result = 'max-content';
    } else if (value === 'fit') {
        result = 'fit-content';
    } else if (prefix === 'flex-') {
        result = flexValues[value] || null;
    } else if (prefix === 'col-span-') {
        result = `span ${value}`;
    } else if (prefix === 'rotate-') {
        result = `rotate(${isNegative ? '-' : ''}${value}deg)`;
    } else if (prefix === 'content-') {
        result = value.slice(1, -1);
    } else if (prefix === 'grid-cols-' && (!isNaN(parseFloat(value)) || value === 'none')) {
        if (value === 'none') {
            result = 'none';
        } else {
            result = `repeat(${value}, minmax(0, 1fr))`;
        }
    } else if (propsStr === 'flex-shrink' || propsStr === 'flex-grow') {
        result = shrinkGrow[rawClass];
    } else if (prefixesColors.includes(propsStr)) {
        result = getColorValue(propsStr, colorInfo);
    } else if ((prefix === 'line-clamp-' && value === 'none') || (prefix === 'max-h-' && value === 'none')) {
        result = 'none';
    } else if (prefixesForBorderRadius.includes(propsStr.split(',')[0]) && isNaN(value)) {
        result = borderRadiusValues[value];
    } else if (prefixesForStaticValuePx.includes(prefix) && !isNaN(parseFloat(value))) {
        result = `${value}px`;
    } else if (prefixesForStaticOnePx.includes(prefix) && prefix === rawClass) {
        result = '1px';
    } else if (prefix === 'z-' && !isNaN(parseFloat(value))) {
        result = `${isNegative ? '-' : ''}${value}`;
    } else if (prefixesForStaticValue.includes(prefix) && !isNaN(parseFloat(value))) {
        result = value;
    } else if (/^\d+\/\d+$/.test(value)) {
        const [num1, num2] = value.split('/');
        result = `${(num1 * 100) / num2}%`; // для значений: 1/2, 3/4, 9/12 и тд, возвращает процент
    } else if (isStaticValue) {
        result = isStaticValue; // особые значения из списка (d-flex: flex, w-screen: 100vw и тд)
    } else if (!isNaN(value) && !value.includes('/')) {
        result = `${isNegative ? '-' : ''}${value * 4}px`;
    }

    return [result, isStaticValue];
}

const onlyStaticClasses = [
    'display',
    'position',
    'font-weight',
    'font-style',
    'white-space',
    'user-select',
    'flex-direction',
    'justify-content',
    'align-items',
    'align-content',
    'align-self',
    'flex-wrap',
    'cursor',
    'text-align',
    'letter-spacing',
    'text-transform',
    'overflow',
    'overflow-x',
    'overflow-y',
    'object-fit',
    'border-style',
    'background-size',
    'text-overflow',
    'justify-items',
];

const prefixesColors = ['color', 'background-color', 'border-color'];
const prefixesForStaticValuePx = [
    'border-',
    'border-x-',
    'border-y-',
    'border-t-',
    'border-r-',
    'border-b-',
    'border-l-',
];
const prefixesForStaticOnePx = [
    'border',
    'border-x',
    'border-y',
    'border-t',
    'border-r',
    'border-b',
    'border-l',
    'border-tl',
    'border-tr',
    'border-br',
    'border-bl',
    'gap',
];
const prefixesForStaticValue = ['leading-', 'order-', 'line-clamp-'];

const prefixesForBorderRadius = [
    'border-radius',
    'border-top-left-radius',
    'border-top-right-radius',
    'border-bottom-left-radius',
    'border-bottom-right-radius',
];

const getColorValue = (propsStr, colorInfo) => {
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

const shrinkGrow = {
    shrink: 1,
    'shrink-0': 0,
    grow: 1,
    'grow-0': 0,
};

const borderRadiusValues = {
    none: '0px',
    sm: '2px',
    '': '4px',
    md: '6px',
    lg: '8px',
    xl: '12px',
    '2xl': '16px',
    '3xl': '24px',
    '4xl': '32px',
    full: '9999px',
};

const flexValues = {
    1: '1 1 0%',
    auto: '1 1 auto',
    initial: '0 1 auto',
    none: 'none',
};

const uniqueRules = {
    'line-clamp': {
        getRule: function (cls, value, prefix, isDev) {
            if (value === 'none') {
                if (isDev) {
                    return `.${escapeClass(
                        cls,
                    )} {\n\toverflow: visible;\n\tdisplay: block;\n\t-webkit-box-orient: horizontal;\n\t-webkit-line-clamp: ${value}\n}`;
                }
                return `.${escapeClass(
                    cls,
                )}{overflow:visible;display:block;-webkit-box-orient:horizontal;-webkit-line-clamp:${value}}`;
            }

            if (isDev) {
                return `.${escapeClass(
                    cls,
                )} {\n\toverflow: hidden;\n\tdisplay: -webkit-box;\n\t-webkit-box-orient: vertical;\n\t-webkit-line-clamp: ${value}\n}`;
            }
            return `.${escapeClass(
                cls,
            )}{overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:${value}}`;
        },
        getValue: (val) => {
            if (isNumeric(val) || val === 'none') return val;
        },
    },
    truncate: {
        getRule: function (cls, value, prefix, isDev) {
            if (isDev) {
                return `.${escapeClass(
                    cls,
                )} {\n\toverflow: hidden;\n\ttext-overflow: ellipsis;\n\twhite-space: nowrap\n}`;
            }
            return `.${escapeClass(cls)}{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}`;
        },
        getValue: (_, rawClass, prefix) => {
            if (rawClass === prefix) return true;
        },
    },
    translate: {
        getRule: function (cls, value, prefix, isDev, state) {
            const directionVariable = prefix === 'translate-x-' ? '--cl-translate-x' : '--cl-translate-y';
            if (isDev) {
                return `.${escapeClass(cls)}${
                    state ? `:${state}` : ''
                } {\n\t${directionVariable}: ${value};\n\ttranslate: var(--cl-translate-x) var(--cl-translate-y)\n}`;
            }
            return `.${escapeClass(cls)}${
                state ? `:${state}` : ''
            }{${directionVariable}:${value};translate:var(--cl-translate-x) var(--cl-translate-y)}`;
        },
        getValue: (value, rawClass, prefix, isNegative) => {
            let currValue = null;
            if (value === 'px') currValue = '1px';
            else if (/^\d+\/\d+$/.test(value)) {
                const [num1, num2] = value.split('/');
                currValue = `${(num1 * 100) / num2}%`; // для значений: 1/2, 3/4, 9/12 и тд, возвращает процент
            } else if (value === 'full') {
                currValue = '100%';
            } else if (!isNaN(value)) {
                currValue = `${value * 4}px`;
            }
            return currValue ? `${isNegative ? '-' : ''}${currValue}` : null;
        },
    },
    space: {
        getRule: function (cls, value, prefix, isDev, state) {
            let property;

            if (prefix === 'space-y-') property = 'margin-top';
            else if (prefix === 'space-y-reverse-') property = 'margin-bottom';
            else if (prefix === 'space-x-reverse-') property = 'margin-right';
            else if (prefix === 'space-x-') property = 'margin-left';

            if (isDev) {
                return `.${escapeClass(cls)}${
                    state ? `:${state}` : ''
                } > :not([hidden])~:not([hidden]) {\n\t${property}: ${value}\n}`;
            }
            return `.${escapeClass(cls)}${
                state ? `:${state}` : ''
            }>:not([hidden])~:not([hidden]){${property}:${value}}`;
        }
    }
};

function createRule(
    cls,
    property,
    value,
    prefix,
    isImportant = false,
    state,
    isResponsive = false,
    isDev,
) {
    console.log(property)
    if (uniqueRules[property]) {
        console.log('q')
        return uniqueRules[property].getRule(cls, value, prefix, isDev, state);
    }
    if (isResponsive) {
        if (isDev) {
            return `.${escapeClass(cls)}${state ? `:${state}` : ''} {\n ${property
                .map((p) => `\t\t${p}: ${value}${isImportant ? ' !important' : ''}`)
                .join('; \n ')} \n\t}`;
        }
        return `.${escapeClass(cls)}${state ? `:${state}` : ''} {${property
            .map((p) => `${p}: ${value}${isImportant ? ' !important' : ''}`)
            .join(';')}}`;
    }
    if (isDev) {
        return `.${escapeClass(cls)}${state ? `:${state}` : ''} {\n ${property
            .map((p) => `\t${p}: ${value}${isImportant ? ' !important' : ''}`)
            .join('; \n ')} \n}`;
    }
    return `.${escapeClass(cls)}${state ? `:${state}` : ''}{${property
        .map((p) => `${p}:${value}${isImportant ? ' !important' : ''}`)
        .join(';')}}`;
}

function isValidCalcExpression(str) {
    const regex = /^calc\((?:[a-z0-9.%]+(?:[+\-*/][a-z0-9.%]+)+)\)$/i;
    return regex.test(str);
}

function normalizeCalcExpression(str) {
    // Добавляем пробелы вокруг операторов, только если их нет
    return str.replace(/([^\s])([+\-*/])([^\s])/g, '$1 $2 $3');
}

const states = ['hover', 'focus', 'before', 'after']

module.exports = {
    createRule,
    resolveCssValue,
    states,
};
