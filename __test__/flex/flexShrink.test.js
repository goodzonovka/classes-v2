const { generateCss } = require('../helpers/testUtils');

// Генерация классов shrink
test.each([
    ['shrink', 'flex-shrink: 1'],
    ['shrink-0', 'flex-shrink: 0'],
])('Класс %s генерирует %s', (className, expectedStyle) => {
    const css = generateCss([className]);
    expect(css).toContain(`.${className} {`);
    expect(css).toContain(expectedStyle);
});

// Некорректные классы, которые не должны генерироваться
test.each([
    'shrink-px',
    'shrink-',
    '-shrink-1',
    '-shrink-1-',
    'shrink-q',
    'shrink-2.5',
    'shrink-1/2',
])('Некорректный класс %s не должен генерировать CSS', (invalidClass) => {
    const css = generateCss([invalidClass]);
    expect(css).not.toContain(`.${invalidClass}`);
});