const { generateCss } = require('./helpers/testUtils');

test('не протекают responsive правила между вызовами generateCss', () => {
    generateCss(['sm:text-black']);

    const secondCss = generateCss(['md:block']);

    expect(secondCss).toContain('@media (min-width: 768px) {');
    expect(secondCss).toContain('.md\\:block {');
    expect(secondCss).not.toContain('.sm\\:text-black {');
});

test('не протекают responsive state-правила между вызовами generateCss', () => {
    generateCss(['sm:hover:text-black']);

    const secondCss = generateCss(['md:block']);

    expect(secondCss).toContain('.md\\:block {');
    expect(secondCss).not.toContain('.sm\\:hover\\:text-black:hover {');
});

