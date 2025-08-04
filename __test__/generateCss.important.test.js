const {generateCss} = require("./helpers/testUtils");

test('!important: генерация CSS классов и стилей', () => {
    const css = generateCss(['!text-black', '!mgb-0', '!left-0', '!table']);

    expect(css).toContain('.\\!text-black {');
    expect(css).toContain('color: rgba(0, 0, 0, 1) !important');

    expect(css).toContain('.\\!mgb-0 {');
    expect(css).toContain('margin-bottom: 0 !important');

    expect(css).toContain('.\\!left-0 {');
    expect(css).toContain('left: 0 !important');

    expect(css).toContain('.\\!table {');
    expect(css).toContain('display: table !important');
});