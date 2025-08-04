const { generateCss } = require('../helpers/testUtils');

// Генерация классов align-content
test.each([
    ['content-normal', 'align-content: normal'],
    ['content-center', 'align-content: center'],
    ['content-start', 'align-content: flex-start'],
    ['content-end', 'align-content: flex-end'],
    ['content-between', 'align-content: space-between'],
    ['content-around', 'align-content: space-around'],
    ['content-evenly', 'align-content: space-evenly'],
    ['content-baseline', 'align-content: baseline'],
    ['content-stretch', 'align-content: stretch'],
])('Класс %s генерирует %s', (className, expectedStyle) => {
    const css = generateCss([className]);
    expect(css).toContain(`.${className} {`);
    expect(css).toContain(expectedStyle);
});

// Некорректные классы, которые не должны генерироваться
test.each([
    'content',
    'content-',
    'content-start-',
    'content-start-px',
    'content-start-q',
    'content-startq',
    '-content-start',
    '-content--start',
    'content-start!',
])('Некорректный класс %s не должен генерировать CSS', (invalidClass) => {
    const css = generateCss([invalidClass]);
    expect(css).not.toContain(`.${invalidClass}`);
});