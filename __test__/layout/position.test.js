const { generateCss } = require('../helpers/testUtils');

// Генерация классов position
test.each([
    ['static', 'position: static'],
    ['absolute', 'position: absolute'],
    ['relative', 'position: relative'],
    ['sticky', 'position: sticky'],
    ['fixed', 'position: fixed'],
])('Класс %s генерирует %s', (className, expectedStyle) => {
    const css = generateCss([className]);
    expect(css).toContain(`.${className} {`);
    expect(css).toContain(expectedStyle);
});

// Некорректные классы, которые не должны генерироваться
test.each([
    'static-',
    '-static',
    'static-0',
    'staticq',
    'absolute-',
    'fixed-',
    'sticky-',
])('Некорректный класс %s не должен генерировать CSS', (invalidClass) => {
    const css = generateCss([invalidClass]);
    expect(css).not.toContain(`.${invalidClass}`);
});