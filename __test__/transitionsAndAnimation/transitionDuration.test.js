const { generateCss } = require('../helpers/testUtils');

// Генерация классов transition-duration
test.each([
    ['duration-0', 'transition-duration: 0ms'],
    ['duration-75', 'transition-duration: 75ms'],
    ['duration-100', 'transition-duration: 100ms'],
    ['duration-300', 'transition-duration: 300ms'],
    ['duration-1000', 'transition-duration: 1000ms'],
    ['duration-1500', 'transition-duration: 1500ms'],
])('Класс %s генерирует %s', (className, expectedStyle) => {
    const css = generateCss([className]);
    expect(css).toContain(`.${className} {`);
    expect(css).toContain(expectedStyle);
});

// Некорректные классы, которые не должны генерироваться
test.each([
    'duration',
    'duration-',
    'duration-q',
    '-duration-',
    '-duration',
    'duration-2.5',
    'duration.2',
    'duration-05',
])('Некорректный класс %s не должен генерировать CSS', (invalidClass) => {
    const css = generateCss([invalidClass]);
    expect(css).not.toContain(`.${invalidClass}`);
});