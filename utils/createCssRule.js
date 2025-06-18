const {escapeClass} = require('./functions');

const uniqueRules = {
    'line-clamp': {
        getRule: function (cls, value, prefix, isMinCss, state, isResponsive) {
            if (value === 'none') {
                if (isResponsive && !isMinCss) {
                    return `.${escapeClass(
                        cls,
                    )} {\n\t\toverflow: visible;\n\t\tdisplay: block;\n\t\t-webkit-box-orient: horizontal;\n\t\t-webkit-line-clamp: ${value}\n\t}`;
                }
                if (!isMinCss) {
                    return `.${escapeClass(
                        cls,
                    )} {\n\toverflow: visible;\n\tdisplay: block;\n\t-webkit-box-orient: horizontal;\n\t-webkit-line-clamp: ${value}\n}`;
                }
                return `.${escapeClass(
                    cls,
                )}{overflow:visible;display:block;-webkit-box-orient:horizontal;-webkit-line-clamp:${value}}`;
            }

            if (isResponsive && !isMinCss) {
                return `.${escapeClass(
                    cls,
                )} {\n\t\toverflow: hidden;\n\t\tdisplay: -webkit-box;\n\t\t-webkit-box-orient: vertical;\n\t\t-webkit-line-clamp: ${value}\n\t}`;
            }
            if (!isMinCss) {
                return `.${escapeClass(
                    cls,
                )} {\n\toverflow: hidden;\n\tdisplay: -webkit-box;\n\t-webkit-box-orient: vertical;\n\t-webkit-line-clamp: ${value}\n}`;
            }
            return `.${escapeClass(
                cls,
            )}{overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:${value}}`;
        },
    },
    truncate: {
        getRule: function (cls, value, prefix, isMinCss, state, isResponsive) {
            if (isResponsive && !isMinCss) {
                return `.${escapeClass(
                    cls,
                )} {\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t\twhite-space: nowrap\n\t}`;
            }
            if (!isMinCss) {
                return `.${escapeClass(
                    cls,
                )} {\n\toverflow: hidden;\n\ttext-overflow: ellipsis;\n\twhite-space: nowrap\n}`;
            }
            return `.${escapeClass(cls)}{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}`;
        },
    },
    translate: {
        getRule: function (cls, value, prefix, isMinCss, state, isResponsive) {
            const directionVariable = prefix === 'translate-x-' ? '--cl-translate-x' : '--cl-translate-y';
            if (isResponsive && !isMinCss) {
                return `.${escapeClass(cls)}${
                    state ? `:${state}` : ''
                } {\n\t\t${directionVariable}: ${value};\n\t\ttranslate: var(--cl-translate-x) var(--cl-translate-y)\n\t}`;
            }
            if (!isMinCss) {
                return `.${escapeClass(cls)}${
                    state ? `:${state}` : ''
                } {\n\t${directionVariable}: ${value};\n\ttranslate: var(--cl-translate-x) var(--cl-translate-y)\n}`;
            }
            return `.${escapeClass(cls)}${
                state ? `:${state}` : ''
            }{${directionVariable}:${value};translate:var(--cl-translate-x) var(--cl-translate-y)}`;
        },
    },
    space: {
        getRule: function (cls, value, prefix, isMinCss, state, isResponsive) {
            let property;

            if (prefix === 'space-y-') property = 'margin-top';
            else if (prefix === 'space-y-reverse-') property = 'margin-bottom';
            else if (prefix === 'space-x-reverse-') property = 'margin-right';
            else if (prefix === 'space-x-') property = 'margin-left';

            if (isResponsive && !isMinCss) {
                return `.${escapeClass(cls)}${
                    state ? `:${state}` : ''
                } > :not([hidden])~:not([hidden]) {\n\t\t${property}: ${value}\n\t}`;
            }

            if (!isMinCss) {
                return `.${escapeClass(cls)}${
                    state ? `:${state}` : ''
                } > :not([hidden])~:not([hidden]) {\n\t${property}: ${value}\n}`;
            }
            return `.${escapeClass(cls)}${
                state ? `:${state}` : ''
            }>:not([hidden])~:not([hidden]){${property}:${value}}`;
        }
    },
    'divide-width': {
        getRule: function (cls, value, prefix, isMinCss, state, isResponsive) {
            let property;

            if (prefix === 'divide-y' || prefix === 'divide-y-') property = 'border-top-width';
            else if (prefix === 'divide-y-reverse' || prefix === 'divide-y-reverse-') property = 'border-bottom-width';
            else if (prefix === 'divide-x-reverse' || prefix === 'divide-x-reverse-') property = 'border-right-width';
            else if (prefix === 'divide-x' || prefix === 'divide-x-') property = 'border-left-width';

            if (isResponsive && !isMinCss) {
                return `.${escapeClass(cls)}${
                    state ? `:${state}` : ''
                } > :not([hidden])~:not([hidden]) {\n\t\t${property}: ${value}\n\t}`;
            }

            if (!isMinCss) {
                return `.${escapeClass(cls)}${
                    state ? `:${state}` : ''
                } > :not([hidden])~:not([hidden]) {\n\t${property}: ${value}\n}`;
            }
            return `.${escapeClass(cls)}${
                state ? `:${state}` : ''
            }>:not([hidden])~:not([hidden]){${property}:${value}}`;
        }
    },
    'divide-color': {
        getRule: function (cls, value, prefix, isMinCss, state) {
            if (!isMinCss) {
                return `.${escapeClass(cls)}${
                    state ? `:${state}` : ''
                } > :not([hidden])~:not([hidden]) {\n\tborder-color: ${value}\n}`;
            }
            return `.${escapeClass(cls)}${
                state ? `:${state}` : ''
            }>:not([hidden])~:not([hidden]){border-color:${value}}`;
        }
    }
};

function createRule(
    cls,
    property,
    value,
    prefix,
    isImportant = false,
    state,
    isResponsive = false,
    isMinCss,
) {
    // console.log(cls, property, value, prefix, isImportant, state, isResponsive)

    let ruleForHas = '';
    if (state === 'has') {
        ruleForHas = cls.split(':').find((item, index) =>
            item.startsWith('[') &&
            item.endsWith(']') &&
            index !== cls.split(':').length - 1
        );
        ruleForHas = ruleForHas ? ruleForHas.slice(1, -1) : '';
    }
    if (state === 'first') {
        state = 'first-child'
    }
    if (state === 'last') {
        state = 'last-child'
    }
    if (state === 'odd') {
        state = 'nth-child(odd)'
    }
    if (state === 'even') {
        state = 'nth-child(even)'
    }

    if (uniqueRules[property]) {
        return uniqueRules[property].getRule(cls, value, prefix, isMinCss, state, isResponsive);
    }
    if (isResponsive) {
        if (!isMinCss) {
            return `.${escapeClass(cls)}${state ? `:${state}` : ''}${ruleForHas ? `(${ruleForHas})` : ''} {\n ${property
                .map((p) => `\t\t${p}: ${value}${isImportant ? ' !important' : ''}`)
                .join('; \n ')} \n\t}`;
        }
        return `.${escapeClass(cls)}${state ? `:${state}` : ''}${ruleForHas ? `(${ruleForHas})` : ''} {${property
            .map((p) => `${p}: ${value}${isImportant ? ' !important' : ''}`)
            .join(';')}}`;
    }
    if (!isMinCss) {
        return `.${escapeClass(cls)}${state ? `:${state}` : ''}${ruleForHas ? `(${ruleForHas})` : ''} {\n ${property
            .map((p) => `\t${p}: ${value}${isImportant ? ' !important' : ''}`)
            .join('; \n ')}\n}`;
    }
    return `.${escapeClass(cls)}${state ? `:${state}` : ''}${ruleForHas ? `(${ruleForHas})` : ''}{${property
        .map((p) => `${p}:${value}${isImportant ? ' !important' : ''}`)
        .join(';')}}`;
}

module.exports = {
    createRule,
}