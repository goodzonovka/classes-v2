const { generateCss } = require('../helpers/testUtils');

// Генерация классов flex-wrap
test.each([
    ['flex-wrap', 'flex-wrap: wrap'],
    ['flex-wrap-reverse', 'flex-wrap: wrap-reverse'],
    ['flex-nowrap', 'flex-wrap: nowrap'],
])('Класс %s генерирует %s', (className, expectedStyle) => {
    const css = generateCss([className]);
    expect(css).toContain(`.${className} {`);
    expect(css).toContain(expectedStyle);
});

// Некорректные классы, которые не должны генерироваться
test.each([
    'flex-wrap-',
    'flex-wrap-0',
    'flex-wrap-q',
    '-flex-wrap',
    'flex-wrap-px',
])('Некорректный класс %s не должен генерировать CSS', (invalidClass) => {
    const css = generateCss([invalidClass]);
    expect(css).not.toContain(`.${invalidClass}`);
});