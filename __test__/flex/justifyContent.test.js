const { generateCss } = require('../helpers/testUtils');

// Генерация классов justify-content
test.each([
    ['justify-normal', 'justify-content: normal'],
    ['justify-start', 'justify-content: flex-start'],
    ['justify-end', 'justify-content: flex-end'],
    ['justify-center', 'justify-content: center'],
    ['justify-between', 'justify-content: space-between'],
    ['justify-around', 'justify-content: space-around'],
    ['justify-evenly', 'justify-content: space-evenly'],
    ['justify-stretch', 'justify-content: stretch'],
])('Класс %s генерирует %s', (className, expectedStyle) => {
    const css = generateCss([className]);
    expect(css).toContain(`.${className} {`);
    expect(css).toContain(expectedStyle);
});

// Некорректные классы, которые не должны генерироваться
test.each([
    'justify',
    'justify-',
    'justify-start-',
    'justify-start-px',
    'justify-start-q',
    'justify-startq',
    '-justify-start',
    '-justify--start',
    'justify-start!',
])('Некорректный класс %s не должен генерировать CSS', (invalidClass) => {
    const css = generateCss([invalidClass]);
    expect(css).not.toContain(`.${invalidClass}`);
});