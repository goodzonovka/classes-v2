const {generateCss} = require("./helpers/testUtils");

test('MEDIA: генерация CSS классов и стилей', () => {
    const css = generateCss(['xs:font-bold', 'sm:text-lg', 'md:block', 'lg:flex-wrap', 'xl:grid-cols-3']);

    expect(css).toContain('@media (min-width: 375px) {');
    expect(css).toContain('.xs\\:font-bold {');
    expect(css).toContain('font-weight: 700');

    expect(css).toContain('@media (min-width: 587px) {');
    expect(css).toContain('.sm\\:text-lg {');
    expect(css).toContain('font-size: 18px');

    expect(css).toContain('@media (min-width: 768px) {');
    expect(css).toContain('.md\\:block {');
    expect(css).toContain('display: block');

    expect(css).toContain('@media (min-width: 993px) {');
    expect(css).toContain('.lg\\:flex-wrap {');
    expect(css).toContain('flex-wrap: wrap');

    expect(css).toContain('@media (min-width: 1200px) {');
    expect(css).toContain('.xl\\:grid-cols-3 {');
    expect(css).toContain('grid-template-columns: repeat(3, minmax(0, 1fr))');
});