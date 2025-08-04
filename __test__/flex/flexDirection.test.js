const { generateCss } = require('../helpers/testUtils');

// Генерация классов flex-direction
test.each([
    ['flex-row', 'flex-direction: row'],
    ['flex-row-reverse', 'flex-direction: row-reverse'],
    ['flex-col', 'flex-direction: column'],
    ['flex-col-reverse', 'flex-direction: column-reverse'],
])('Класс %s генерирует %s', (className, expectedStyle) => {
    const css = generateCss([className]);
    expect(css).toContain(`.${className} {`);
    expect(css).toContain(expectedStyle);
});

// Некорректные классы, которые не должны генерироваться
test.each([
    'flex-row-',
    'flex-row-0',
    'flex-row-q',
    'flex-row-reverse-',
    'flex-col-',
    'flex-col-0',
    'flex-col-q',
    'flex-col-reverse-',
])('Некорректный класс %s не должен генерировать CSS', (invalidClass) => {
    const css = generateCss([invalidClass]);
    expect(css).not.toContain(`.${invalidClass}`);
});