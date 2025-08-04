const { generateCss } = require('../helpers/testUtils');

// Генерация классов order
test.each([
    ['order-1', 'order: 1'],
    ['order-2', 'order: 2'],
    ['order-12', 'order: 12'],
    ['order-first', 'order: -9999'],
    ['order-last', 'order: 9999'],
    ['order-none', 'order: 0'],
])('Класс %s генерирует %s', (className, expectedStyle) => {
    const css = generateCss([className]);
    expect(css).toContain(`.${className} {`);
    expect(css).toContain(expectedStyle);
});

// Некорректные классы, которые не должны генерироваться
test.each([
    'order-px',
    'order',
    'order-',
    'order-01',
    '-order-1-',
    'order-q',
    'order-2.5',
    'order-1/2',
])('Некорректный класс %s не должен генерировать CSS', (invalidClass) => {
    const css = generateCss([invalidClass]);
    expect(css).not.toContain(`.${invalidClass}`);
});