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

test('state variant transition: hover:transition (фиксируем текущее поведение)', () => {
    const css = generateCss(['hover:transition']);

    expect(css).toContain('.hover\\:transition {');
    expect(css).toContain('transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter');
    expect(css).toContain('transition-duration: 150ms');
    expect(css).not.toContain('.hover\\:transition:hover {');
});

test('responsive + state variant transition-none: sm:focus:transition-none (фиксируем текущее поведение)', () => {
    const css = generateCss(['sm:focus:transition-none']);

    expect(css).toContain('@media (min-width: 587px) {');
    expect(css).toContain('.sm\\:focus\\:transition-none {');
    expect(css).toContain('transition-property: none');
    expect(css).not.toContain('.sm\\:focus\\:transition-none:focus {');
});
