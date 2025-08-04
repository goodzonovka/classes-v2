const { generateCssFromClasses } = require('../../utils/generateCss');
const config = require('../../config/index');

function generateCss(classes) {
    return generateCssFromClasses(new Set(classes), config);
}

function assertCssContains(css, className, selector, expectedStyle) {
    const fullSelector = `.${className}${selector ? ' ' + selector : ''} {`;
    expect(css).toContain(fullSelector);
    expect(css).toContain(expectedStyle);
}

module.exports = { generateCss, assertCssContains };
