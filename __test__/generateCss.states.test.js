const {generateCss} = require("./helpers/testUtils");


test.each([
    // rtl
    ['rtl:-scale-x-100', '.rtl\\:-scale-x-100:where([dir=rtl], [dir=rtl] *) {', '--cl-scale-x: -1;'],
    ['rtl:-scale-x-100', null, 'scaleX(var(--cl-scale-x))'],

    // disabled
    ['disabled:border-gray-200', '.disabled\\:border-gray-200:disabled {', 'border-color: rgba(225, 225, 225, 1)'],

    // hover, focus
    ['hover:text-black', '.hover\\:text-black:hover {', 'color: rgba(0, 0, 0, 1)'],
    ['focus:border', '.focus\\:border:focus {', 'border-width: 1px'],

    // before/after
    ["before:content-['']", ".before\\:content-\\[\\'\\'\\]:before {", "content: ''"],
    ['after:-translate-x-1/2', '.after\\:-translate-x-1\\/2:after {', '--cl-translate-x: -50%'],

    // has
    ['has:[span]:pl-20', '.has\\:\\[span\\]\\:pl-20:has(span) {', 'padding-left: 80px'],

    // first/last
    ['first:text-blue-600', '.first\\:text-blue-600:first-child {', 'color: rgba(44, 100, 235, 1)'],
    ['last:mgb-0', '.last\\:mgb-0:last-child {', 'margin-bottom: 0'],

    // odd/even
    ['odd:font-bold', '.odd\\:font-bold:nth-child(odd) {', 'font-weight: 700'],
    ['even:bg-gray-200', '.even\\:bg-gray-200:nth-child(even) {', 'background-color: rgba(225, 225, 225, 1)'],

    // argument states
    ['nth-child:[3n+1]:font-bold', '.nth-child\\:\\[3n\\+1\\]\\:font-bold:nth-child(3n+1) {', 'font-weight: 700'],
    ['not:[.is-active]:block', '.not\\:\\[\\.is-active\\]\\:block:not(.is-active) {', 'display: block'],

    // transform unique rule with state
    ['hover:transform-none', '.hover\\:transform-none:hover {', 'transform: none'],
])('%s → содержит %s и %s', (className, selector, expectedStyle) => {
    const css = generateCss([className]);

    if (selector) {
        expect(css).toContain(selector);
    }

    expect(css).toContain(expectedStyle);
});

test('responsive + state: sm:hover:text-black', () => {
    const css = generateCss(['sm:hover:text-black']);

    expect(css).toContain('@media (min-width: 587px) {');
    expect(css).toContain('.sm\\:hover\\:text-black:hover {');
    expect(css).toContain('color: rgba(0, 0, 0, 1)');
});

test('responsive + argument state: md:nth-child:[2n+1]:font-bold', () => {
    const css = generateCss(['md:nth-child:[2n+1]:font-bold']);

    expect(css).toContain('@media (min-width: 768px) {');
    expect(css).toContain('.md\\:nth-child\\:\\[2n\\+1\\]\\:font-bold:nth-child(2n+1) {');
    expect(css).toContain('font-weight: 700');
});
