const { generateCss } = require('../helpers/testUtils');

// Генерация классов grow
test.each([
    ['grow', 'flex-grow: 1'],
    ['grow-0', 'flex-grow: 0'],
])('Класс %s генерирует %s', (className, expectedStyle) => {
    const css = generateCss([className]);
    expect(css).toContain(`.${className} {`);
    expect(css).toContain(expectedStyle);
});

// Некорректные классы, которые не должны генерироваться
test.each([
    'grow-px',
    'grow-',
    '-grow-1',
    '-grow-1-',
    'grow-q',
    'grow-2.5',
    'grow-1/2',
])('Некорректный класс %s не должен генерировать CSS', (invalidClass) => {
    const css = generateCss([invalidClass]);
    expect(css).not.toContain(`.${invalidClass}`);
});