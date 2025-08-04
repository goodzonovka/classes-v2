const { generateCss } = require('../helpers/testUtils');

// Генерация классов flex-*
test.each([
    ['flex-1', 'flex: 1 1 0%'],
    ['flex-auto', 'flex: 1 1 auto'],
    ['flex-initial', 'flex: 0 1 auto'],
    ['flex-none', 'flex: none'],
])('Класс %s генерирует %s', (className, expectedStyle) => {
    const css = generateCss([className]);
    expect(css).toContain(`.${className} {`);
    expect(css).toContain(expectedStyle);
});

// Некорректные классы, которые не должны генерироваться
test.each([
    'flex-2',
    'flex-px',
    '-flex-1',
    '-flex-1-',
    'flex-auto-',
    'flex-auto-px',
    'flex-auto-q',
    'flex-auto-1',
])('Некорректный класс %s не должен генерировать CSS', (invalidClass) => {
    const css = generateCss([invalidClass]);
    expect(css).not.toContain(`.${invalidClass}`);
});