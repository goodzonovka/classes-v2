const {hexToRgb, isStrictInteger} = require("./functions.js");
const {COLORS} = require("./constants.js");

const fixedColorValues = ['inherit', 'current', 'transparent'];

const colorNames = Object.keys(COLORS).flatMap(key => {
    if (key === "other") {
        return Object.keys(COLORS[key]);
    }
    return key;
})

function generateCssVars(isMinCss) {
    // Генерируем CSS-переменные
    let cssVars = ':root {\n';

    Object.entries(COLORS).forEach(([colorName, shades]) => {
        Object.entries(shades).forEach(([shade, value]) => {
            if (colorName === 'other') {
                cssVars += `  --${shade}: ${value};\n`;
            } else {
                cssVars += `  --${colorName}-${shade}: ${value};\n`;
            }
        });
    });

    cssVars += '}\n';

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
        console.log(valueParts)
        value = valueParts.slice(0, -2).join('-');
        console.log(valueParts[valueParts.length - 1])
        opacityValue = isStrictInteger(valueParts[valueParts.length - 1]) ? valueParts[valueParts.length - 1] : null;
        console.log(opacityValue)
        if (!opacityValue) return;
    }

    if (value && !value.includes('-')) {
        colorName = value
    } else if (!fullValue.includes('-')) {
        colorName = fullValue;
    } else {
        const valuePartsNoOpacity = value.split('-');
        shade = isStrictInteger(valuePartsNoOpacity[valuePartsNoOpacity.length - 1]) ? valuePartsNoOpacity[valuePartsNoOpacity.length - 1] : null;
        colorName = shade ? valuePartsNoOpacity.slice(0, -1).join('-') : valuePartsNoOpacity.join('-');
    }

    // console.log(colorName, shade)
    if (colorName) {
        if (shade) {
          hex = COLORS[colorName] && COLORS[colorName][shade];
        } else {
          hex = COLORS['other'] && COLORS['other'][colorName];
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
