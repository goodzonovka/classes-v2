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

    return { r, g, b };
};

module.exports = {
  hexToRgb,
  isNumeric,
  isNumber,
};
