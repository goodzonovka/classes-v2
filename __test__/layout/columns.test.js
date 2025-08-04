const { generateCss } = require('../helpers/testUtils');

// Генерация классов columns
test.each([
    ['columns-1', 'columns: 1'],
    ['columns-10', 'columns: 10'],
    ['columns-15', 'columns: 15'],
    ['columns-100', 'columns: 100'],
])('Класс %s генерирует %s', (className, expectedStyle) => {
    const css = generateCss([className]);
    expect(css).toContain(`.${className} {`);
    expect(css).toContain(expectedStyle);
});

// Некорректные классы, которые не должны генерироваться
test.each([
    'columns-2.5',
    'columns-',
    'columns',
    'columns-0.1',
    'columns-01',
    '-columns-5',
    '-columns-q',
])('Некорректный класс %s не должен генерировать CSS', (invalidClass) => {
    const css = generateCss([invalidClass]);
    expect(css).not.toContain(`.${invalidClass}`);
});