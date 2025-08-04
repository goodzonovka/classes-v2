const { generateCss } = require('../helpers/testUtils');

// Генерация классов z-index
test.each([
    ['z-0', 'z-index: 0'],
    ['z-10', 'z-index: 10'],
    ['z-50', 'z-index: 50'],
    ['z-999', 'z-index: 999'],
    ['z-auto', 'z-index: auto'],
])('Класс %s генерирует %s', (className, expectedStyle) => {
    const css = generateCss([className]);
    expect(css).toContain(`.${className} {`);
    expect(css).toContain(expectedStyle);
});

// Некорректные классы, которые не должны генерироваться
test.each([
    'z-001',
    'z-',
    'z-q',
    '-z-',
    '-z',
    'z-2.5',
    'z.2',
])('Некорректный класс %s не должен генерировать CSS', (invalidClass) => {
    const css = generateCss([invalidClass]);
    expect(css).not.toContain(`.${invalidClass}`);
});