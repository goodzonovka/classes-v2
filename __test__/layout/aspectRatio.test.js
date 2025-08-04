const { generateCss } = require('../helpers/testUtils');

// Генерация классов aspect-ratio
test.each([
    ['aspect-auto', 'aspect-ratio: auto'],
    ['aspect-square', 'aspect-ratio: 1 / 1'],
    ['aspect-video', 'aspect-ratio: 16 / 9'],
])('Класс %s генерирует %s', (className, expectedStyle) => {
    const css = generateCss([className]);
    expect(css).toContain(`.${className} {`);
    expect(css).toContain(expectedStyle);
});

// Некорректные классы, которые не должны генерироваться
test.each([
    'aspect-',
    '-aspect',
    'aspect-0',
    'aspectq',
])('Некорректный класс %s не должен генерировать CSS', (invalidClass) => {
    const css = generateCss([invalidClass]);
    expect(css).not.toContain(`.${invalidClass}`);
});