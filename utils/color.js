const {hexToRgb, isNumeric} = require("./functions.js");

const colors = {
    blue: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2C64EB',
        700: '#1d4ed8',
        750: '#2452BE',
        800: '#1e40af',
        900: '#1e3a8a',
        950: '#002C90',
    },
    gray: {
        50: '#F9F9F9',
        75: '#F8F8F8',
        100: '#f3f4f6',
        125: '#E9E9E9',
        150: '#F0F1F2',
        175: '#F3F7F2',
        200: '#E1E1E1',
        220: '#CAC6C4',
        250: '#C2C2C2',
        300: '#BCBCBC',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        650: '#4F4F4F',
        700: '#404040',
        800: '#212529',
        900: '#111827',
    },
    red: {
        50: '#fef2f2',
        100: '#fee2e2',
        200: '#fecaca',
        300: '#fca5a5',
        400: '#f87171',
        450: '#FF5757',
        500: '#CC5249',
        600: '#dc2626',
        700: '#b91c1c',
        800: '#991b1b',
        900: '#7f1d1d',
    },
    green: {
        50: '#f0fdf4',
        100: '#dcfce7',
        200: '#bbf7d0',
        300: '#86efac',
        400: '#4ade80',
        500: '#22c55e',
        600: '#16a34a',
        700: '#15803d',
        800: '#166534',
        900: '#14532d',
    },
    ["light-green"]: {
        50: '#f1f8e8',
        100: '#EAF4DD',
        200: '#DAEBD8',
        400: '#71B219',
        500: '#539100',
    },
    yellow: {
        25: '#FFF8E1',
        50: '#fffbeb',
        100: '#fef3c7',
        200: '#fde68a',
        300: '#fcd34d',
        400: '#FAC71E',
        500: '#EBAF09',
        600: '#d97706',
        700: '#b45309',
        800: '#92400e',
        900: '#78350f',
    },
    "other": {
        "white": '#fff',
        "black": '#000',
        "gold": '#FAC71E',
        "silver": '#C0C8D0',
        "bronze": '#FCA16E',
    }
};

const fixedColorValues = ['inherit', 'current', 'transparent'];

const colorNames = Object.keys(colors).flatMap(key => {
    if (key === "other") {
        return Object.keys(colors[key]);
    }
    return key;
})

function generateCssVars(isMinCss) {
    // Генерируем CSS-переменные
    let cssVars = ':root {\n';

    Object.entries(colors).forEach(([colorName, shades]) => {
        Object.entries(shades).forEach(([shade, value]) => {
            if (colorName === 'other') {
                cssVars += `  --${shade}: ${value};\n`;
            } else {
                cssVars += `  --${colorName}-${shade}: ${value};\n`;
            }
        });
    });

    cssVars += '}';

    return !isMinCss ? cssVars : cssVars.replace(/\s/g, '');
}

function getColorInfo(fullValue) {
    let colorName, shade, opacityValue, hex, rgb, fixedValue;

    let value = fullValue;
    let withOpacity = fullValue.includes('opacity')

    if (fixedColorValues.includes(value)) {
        fixedValue = value
        if (fixedValue === 'current') {
            fixedValue = 'currentColor'
        }
    }

    if (withOpacity) {
        const valueParts = fullValue.split('-')
        value = valueParts.slice(0, -2).join('-');
        opacityValue = isNumeric(valueParts[valueParts.length - 1]) ? valueParts[valueParts.length - 1] : null;

        if (!opacityValue) return;
    }

    if (value && !value.includes('-')) {
        colorName = value
    } else if (!fullValue.includes('-')) {
        colorName = fullValue;
    } else {
        const valuePartsNoOpacity = value.split('-');
        shade = isNumeric(valuePartsNoOpacity[valuePartsNoOpacity.length - 1]) ? valuePartsNoOpacity[valuePartsNoOpacity.length - 1] : null;
        colorName = shade ? valuePartsNoOpacity.slice(0, -1).join('-') : valuePartsNoOpacity.join('-');
    }

    // console.log(colorName, shade)
    if (colorName) {
        if (shade) {
          hex = colors[colorName] && colors[colorName][shade];
        } else {
          hex = colors['other'] && colors['other'][colorName];
        }
    }

    if (hex) rgb = hexToRgb(hex)

    return {
        colorName,
        shade,
        opacityValue,
        hex,
        rgb,
        fixedValue
    }
}

module.exports = {
  colorNames,
  fixedColorValues,
  getColorInfo,
  generateCssVars,
};
