const { generateCss } = require('../helpers/testUtils');

// Генерация классов object-fit
test.each([
    ['object-contain', 'object-fit: contain'],
    ['object-cover', 'object-fit: cover'],
    ['object-fill', 'object-fit: fill'],
    ['object-none', 'object-fit: none'],
    ['object-scale-down', 'object-fit: scale-down'],
])('Класс %s генерирует %s', (className, expectedStyle) => {
    const css = generateCss([className]);
    expect(css).toContain(`.${className} {`);
    expect(css).toContain(expectedStyle);
});

// Некорректные классы, которые не должны генерироваться
test.each([
    'object-',
    '-object',
    'object-0',
    'objectq',
])('Некорректный класс %s не должен генерировать CSS', (invalidClass) => {
    const css = generateCss([invalidClass]);
    expect(css).not.toContain(`.${invalidClass}`);
});