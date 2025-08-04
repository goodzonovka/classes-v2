const { generateCss } = require('../helpers/testUtils');
const { escapeClass } = require('../../utils/functions');

// Генерация классов basis-*
test.each([
    ['basis-0', 'flex-basis: 0'],
    ['basis-px', 'flex-basis: 1px'],
    ['basis-0.5', 'flex-basis: 2px'],
    ['basis-1', 'flex-basis: 4px'],
    ['basis-12', 'flex-basis: 48px'],
    ['basis-auto', 'flex-basis: auto'],
    ['basis-1/2', 'flex-basis: 50%'],
    ['basis-1/3', 'flex-basis: 33.333333333333336%'],
    ['basis-2/3', 'flex-basis: 66.66666666666667%'],
    ['basis-1/4', 'flex-basis: 25%'],
    ['basis-3/4', 'flex-basis: 75%'],
    ['basis-1/5', 'flex-basis: 20%'],
    ['basis-2/5', 'flex-basis: 40%'],
    ['basis-3/5', 'flex-basis: 60%'],
    ['basis-4/5', 'flex-basis: 80%'],
    ['basis-1/6', 'flex-basis: 16.666666666666668%'],
    ['basis-full', 'flex-basis: 100%'],
])('Класс %s генерирует %s', (className, expectedStyle) => {
    const css = generateCss([className]);
    expect(css).toContain(`.${escapeClass(className)} {`);
    expect(css).toContain(expectedStyle);
});

// Некорректные классы, которые не должны генерироваться
test.each([
    'basis',
    'basis-',
    '-basis',
    '-basis-2',
    'basis-0.1.1',
    'basis-q',
    'basis-1/2/',
    'basis-1/2/2',
    'basis-1.2/2',
    'basis-1/2.2',
])('Некорректный класс %s не должен генерировать CSS', (invalidClass) => {
    const css = generateCss([invalidClass]);
    expect(css).not.toContain(`.${escapeClass(invalidClass)}`);
});