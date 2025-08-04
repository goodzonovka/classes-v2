const { generateCss } = require('../helpers/testUtils');

// Генерация классов object-position
test.each([
    ['object-bottom', 'object-position: bottom'],
    ['object-center', 'object-position: center'],
    ['object-left', 'object-position: left'],
    ['object-left-bottom', 'object-position: left bottom'],
    ['object-left-top', 'object-position: left top'],
    ['object-right', 'object-position: right'],
    ['object-right-bottom', 'object-position: right bottom'],
    ['object-right-top', 'object-position: right top'],
    ['object-top', 'object-position: top'],
])('Класс %s генерирует %s', (className, expectedStyle) => {
    const css = generateCss([className]);
    expect(css).toContain(`.${className} {`);
    expect(css).toContain(expectedStyle);
});

// Некорректные классы, которые не должны генерироваться
test.each([
    'object-left-',
    '-object-left',
    'object-left-bottom-',
    'object-leftq',
    'object-top-0',
])('Некорректный класс %s не должен генерировать CSS', (invalidClass) => {
    const css = generateCss([invalidClass]);
    expect(css).not.toContain(`.${invalidClass}`);
});