const { generateCss } = require('../helpers/testUtils');

// Генерация классов transition-property
test.each([
    ['transition', 'transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter'],
    ['transition-none', 'transition-property: none'],
    ['transition-all', 'transition-property: all'],
    ['transition-colors', 'transition-property: color, background-color, border-color, text-decoration-color, fill, stroke'],
    ['transition-opacity', 'transition-property: opacity'],
    ['transition-shadow', 'transition-property: box-shadow'],
    ['transition-transform', 'transition-property: transform'],
])('Класс %s генерирует %s', (className, expectedStyle) => {
    const css = generateCss([className]);
    expect(css).toContain(`.${className} {`);
    expect(css).toContain(expectedStyle);
});

// Некорректные классы, которые не должны генерироваться
test.each([
    'transition-',
    'transition-q',
    '-transition-',
    '-transition',
    'transition-2.5',
    'transition.2',
    'transition-05',
])('Некорректный класс %s не должен генерировать CSS', (invalidClass) => {
    const css = generateCss([invalidClass]);
    expect(css).not.toContain(`.${invalidClass}`);
});