const { generateCss } = require('../helpers/testUtils');
const { escapeClass } = require('../../utils/functions');

// Генерация классов top-*, left-*, top-*, bottom-*, inset-*
test.each([
    ['top-0', 'top: 0'],
    ['top-2.5', 'top: 10px'],
    ['top-px', 'top: 1px'],
    ['-top-4', 'top: -16px'],
    ['bottom-0', 'bottom: 0'],
    ['bottom-2.5', 'bottom: 10px'],
    ['bottom-px', 'bottom: 1px'],
    ['-bottom-4', 'bottom: -16px'],
    ['left-0', 'left: 0'],
    ['left-2.5', 'left: 10px'],
    ['left-px', 'left: 1px'],
    ['-left-4', 'left: -16px'],
    ['right-0', 'right: 0'],
    ['right-2.5', 'right: 10px'],
    ['right-px', 'right: 1px'],
    ['-right-4', 'right: -16px'],
    ['inset-0', 'inset: 0'],
    ['inset-2.5', 'inset: 10px'],
    ['inset-px', 'inset: 1px'],
    ['-inset-4', 'inset: -16px'],
])('Класс %s генерирует %s', (className, expectedStyle) => {
    const css = generateCss([className]);
    expect(css).toContain(`.${escapeClass(className)} {`);
    expect(css).toContain(expectedStyle);
});

// Генерация классов inset-x-*, inset-y-*
test.each([
    ['inset-x-2.5', ['left: 10px', 'right: 10px']],
    ['inset-x-px', ['left: 1px', 'right: 1px']],
    ['-inset-x-4', ['left: -16px', 'right: -16px']],
    ['inset-y-2.5', ['top: 10px', 'bottom: 10px']],
    ['inset-y-px', ['top: 1px', 'bottom: 1px']],
    ['-inset-y-4', ['top: -16px', 'bottom: -16px']],
])('Класс %s генерирует множественные стили', (className, expectedStyles) => {
    const css = generateCss([className]);
    expect(css).toContain(`.${escapeClass(className)} {`);
    for (const style of expectedStyles) {
        expect(css).toContain(style);
    }
});

// Некорректные классы, которые не должны генерироваться
test.each([
    'top-',
    'top',
    '-top',
    'top-q',
    'bottom-',
    'bottom',
    '-bottom',
    'bottom-q',
    'left-',
    'left',
    '-left',
    'left-q',
    'right-',
    'right',
    '-right',
    'right-q',
    'inset-x-',
    'inset-x',
    '-inset-x',
    'inset-x-q',
    'inset-y-',
    'inset-y',
    '-inset-y',
    'inset-y-q',
    'inset-',
    'inset',
    '-inset',
    'inset-q',
])('Некорректный класс %s не должен генерировать CSS', (invalidClass) => {
    const css = generateCss([invalidClass]);
    expect(css).not.toContain(`.${escapeClass(invalidClass)}`);
});