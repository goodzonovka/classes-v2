const { generateCss } = require('../helpers/testUtils');

// Генерация классов overflow
test.each([
    ['overflow-auto', 'overflow: auto'],
    ['overflow-hidden', 'overflow: hidden'],
    ['overflow-clip', 'overflow: clip'],
    ['overflow-visible', 'overflow: visible'],
    ['overflow-scroll', 'overflow: scroll'],
    ['overflow-x-auto', 'overflow-x: auto'],
    ['overflow-y-auto', 'overflow-y: auto'],
    ['overflow-x-hidden', 'overflow-x: hidden'],
    ['overflow-y-hidden', 'overflow-y: hidden'],
    ['overflow-x-clip', 'overflow-x: clip'],
    ['overflow-y-clip', 'overflow-y: clip'],
    ['overflow-x-visible', 'overflow-x: visible'],
    ['overflow-y-visible', 'overflow-y: visible'],
    ['overflow-x-scroll', 'overflow-x: scroll'],
    ['overflow-y-scroll', 'overflow-y: scroll'],
])('Класс %s генерирует %s', (className, expectedStyle) => {
    const css = generateCss([className]);
    expect(css).toContain(`.${className} {`);
    expect(css).toContain(expectedStyle);
});

// Некорректные классы, которые не должны генерироваться
test.each([
    'overflow-',
    '-overflow',
    'overflow-0',
    'overflowq',
    'overflow-x',
    'overflow-x-',
    'overflow-x-q',
    'overflow-y-',
    'overflow-y-',
    'overflow-y-q',
])('Некорректный класс %s не должен генерировать CSS', (invalidClass) => {
    const css = generateCss([invalidClass]);
    expect(css).not.toContain(`.${invalidClass}`);
});