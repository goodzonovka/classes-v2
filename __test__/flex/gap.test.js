const { generateCss } = require('../helpers/testUtils');
const { escapeClass } = require('../../utils/functions');

// Генерация классов gap-*, gap-x-*, gap-y-*
test.each([
    ['gap-0', 'gap: 0'],
    ['gap-x-0', 'column-gap: 0'],
    ['gap-y-0', 'row-gap: 0'],
    ['gap-px', 'gap: 1px'],
    ['gap-x-px', 'column-gap: 1px'],
    ['gap-y-px', 'row-gap: 1px'],
    ['gap-0.5', 'gap: 2px'],
    ['gap-x-0.5', 'column-gap: 2px'],
    ['gap-y-0.5', 'row-gap: 2px'],
    ['gap-1', 'gap: 4px'],
    ['gap-x-1', 'column-gap: 4px'],
    ['gap-y-1', 'row-gap: 4px'],
    ['gap-96', 'gap: 384px'],
    ['gap-x-96', 'column-gap: 384px'],
    ['gap-y-96', 'row-gap: 384px'],
])('Класс %s генерирует %s', (className, expectedStyle) => {
    const css = generateCss([className]);
    expect(css).toContain(`.${escapeClass(className)} {`);
    expect(css).toContain(expectedStyle);
});

// Некорректные классы, которые не должны генерироваться
test.each([
    'gap',
    'gap-',
    '-gap-2',
    'gap-0.1.1',
    'gap-q',
    'gap-x',
    'gap-x-',
    '-gap-x-2',
    'gap-x-0.1.1',
    'gap-x-q',
    'gap-y',
    'gap-y-',
    '-gap-y-2',
    'gap-y-0.1.1',
    'gap-y-q',
])('Некорректный класс %s не должен генерировать CSS', (invalidClass) => {
    const css = generateCss([invalidClass]);
    expect(css).not.toContain(`.${escapeClass(invalidClass)}`);
});