const { generateCss } = require('../helpers/testUtils');

// Генерация классов display
test.each([
    ['block', 'display: block'],
    ['inline-block', 'display: inline-block'],
    ['inline', 'display: inline'],
    ['d-flex', 'display: flex'],
    ['flex', 'display: flex'],
    ['inline-flex', 'display: inline-flex'],
    ['d-table', 'display: table'],
    ['table', 'display: table'],
    ['inline-table', 'display: inline-table'],
    ['table-caption', 'display: table-caption'],
    ['table-cell', 'display: table-cell'],
    ['table-column', 'display: table-column'],
    ['table-column-group', 'display: table-column-group'],
    ['table-header-group', 'display: table-header-group'],
    ['table-row-group', 'display: table-row-group'],
    ['table-row-line', 'display: table-row'],
    ['flow-root', 'display: flow-root'],
    ['grid', 'display: grid'],
    ['inline-grid', 'display: inline-grid'],
    ['contents', 'display: contents'],
    ['list-item', 'display: list-item'],
    ['hidden', 'display: none'],
])('Класс %s генерирует %s', (className, expectedStyle) => {
    const css = generateCss([className]);
    expect(css).toContain(`.${className} {`);
    expect(css).toContain(expectedStyle);
});

// Некорректные классы, которые не должны генерироваться
test.each([
    'block-',
    '-block',
    'block-inline',
    'block-4',
    'd-flex-',
    '-flex',
    'flex-',
])('Некорректный класс %s не должен генерировать CSS', (invalidClass) => {
    const css = generateCss([invalidClass]);
    expect(css).not.toContain(`.${invalidClass}`);
});