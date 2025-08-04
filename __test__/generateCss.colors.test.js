const { generateCss, assertCssContains } = require('./helpers/testUtils');
const {escapeClass} = require("../utils/functions");

// Цвета: генерация цветов на основе префиксов bg-*, border-*, text-*, divide-*
test.each([
    ['bg-blue-600', '', 'background-color: rgba(44, 100, 235, 1)'],
    ['border-gray-200', '', 'border-color: rgba(225, 225, 225, 1)'],
    ['text-red-500', '', 'color: rgba(204, 82, 73, 1)'],
    ['divide-green-500', '> :not([hidden])~:not([hidden])', 'border-color: rgba(34, 197, 94, 1)'],
    ['bg-light-green-400', '', 'background-color: rgba(113, 178, 25, 1)'],
    ['border-yellow-400', '', 'border-color: rgba(250, 199, 30, 1)'],
    ['text-linkedin', '', 'color: rgba(0, 99, 148, 1)'],
    ['divide-blue-50', '> :not([hidden])~:not([hidden])', 'border-color: rgba(239, 246, 255, 1)'],
])('Цвет: %s → генерирует %s', (className, selector, expectedStyle) => {
    const css = generateCss([className]);
    assertCssContains(css, className, selector, expectedStyle);
});

// Цвета с прозрачностью: генерация цветов с прозрачностью на основе префиксов bg-*, border-*, text-*, divide-*
test.each([
    ['bg-blue-600-opacity-7', '', 'background-color: rgba(44, 100, 235, 0.07)'],
    ['border-gray-200-opacity-50', '', 'border-color: rgba(225, 225, 225, 0.50)'],
    ['text-red-500-opacity-20', '', 'color: rgba(204, 82, 73, 0.20)'],
    ['divide-green-500-opacity-49', '> :not([hidden])~:not([hidden])', 'border-color: rgba(34, 197, 94, 0.49)'],
    ['bg-gold-opacity-120', '', 'background-color: rgba(250, 199, 30, 1)'],
])('Цвет: %s → генерирует %s', (className, selector, expectedStyle) => {
    const css = generateCss([className]);
    assertCssContains(css, className, selector, expectedStyle);
});

// Некорректные классы, которые не должны генерироваться
test.each([
    'bg-red-4000',
    'bg-red-500-',
    'bg-red-',
    'bg-red',
    'bg-',
    'bg',
    'red-500',
    'red-',
    'red',
    'bg-blue-600-opacity-07',
    'bg-blue-600-opacity-1.1',
    'bg-blue-600-opacity-',
    'bg-blue-600-opacity',
    'bg-blue-600-opacity',
    'divide-light-green-500-opacity-',
    'divide-light-green-500-opacity',
    'divide-light-green-500-',
    'divide-light-green',
])('Некорректный класс %s не должен генерировать CSS', (invalidClass) => {
    const css = generateCss([invalidClass]);
    expect(css).not.toContain(`.${escapeClass(invalidClass)}`);
});