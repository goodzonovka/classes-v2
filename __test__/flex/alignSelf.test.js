const { generateCss } = require('../helpers/testUtils');

// Генерация классов align-self
test.each([
    ['self-auto', 'align-self: auto'],
    ['self-start', 'align-self: flex-start'],
    ['self-end', 'align-self: flex-end'],
    ['self-center', 'align-self: center'],
    ['self-stretch', 'align-self: stretch'],
    ['self-baseline', 'align-self: baseline'],
])('Класс %s генерирует %s', (className, expectedStyle) => {
    const css = generateCss([className]);
    expect(css).toContain(`.${className} {`);
    expect(css).toContain(expectedStyle);
});

// Некорректные классы, которые не должны генерироваться
test.each([
    'self',
    'self-',
    'self-start-',
    'self-start-px',
    'self-start-q',
    'self-startq',
    '-self-start',
    '-self--start',
    'self-start!',
])('Некорректный класс %s не должен генерировать CSS', (invalidClass) => {
    const css = generateCss([invalidClass]);
    expect(css).not.toContain(`.${invalidClass}`);
});