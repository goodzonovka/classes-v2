const { generateCss } = require('../helpers/testUtils');

// Генерация классов align-items
test.each([
    ['items-start', 'align-items: flex-start'],
    ['items-end', 'align-items: flex-end'],
    ['items-center', 'align-items: center'],
    ['items-baseline', 'align-items: baseline'],
    ['items-stretch', 'align-items: stretch'],
])('Класс %s генерирует %s', (className, expectedStyle) => {
    const css = generateCss([className]);
    expect(css).toContain(`.${className} {`);
    expect(css).toContain(expectedStyle);
});

// Некорректные классы, которые не должны генерироваться
test.each([
    'items',
    'items-',
    'items-start-',
    'items-start-px',
    'items-start-q',
    'items-startq',
    '-items-start',
    '-items--start',
    'items-start!',
])('Некорректный класс %s не должен генерировать CSS', (invalidClass) => {
    const css = generateCss([invalidClass]);
    expect(css).not.toContain(`.${invalidClass}`);
});