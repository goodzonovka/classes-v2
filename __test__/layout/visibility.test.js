const { generateCss } = require('../helpers/testUtils');

// Генерация классов visibility
test.each([
    ['visible', 'visibility: visible'],
    ['invisible', 'visibility: hidden'],
    ['collapse', 'visibility: collapse'],
])('Класс %s генерирует %s', (className, expectedStyle) => {
    const css = generateCss([className]);
    expect(css).toContain(`.${className} {`);
    expect(css).toContain(expectedStyle);
});

// Некорректные классы, которые не должны генерироваться
test.each([
    'visible-',
    '-visible',
    'visible-0',
    'visibleq',
    'invisible-',
    'collapse-',
])('Некорректный класс %s не должен генерировать CSS', (invalidClass) => {
    const css = generateCss([invalidClass]);
    expect(css).not.toContain(`.${invalidClass}`);
});