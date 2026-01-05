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
    'transition-property': {
        getRule: function (cls, value, prefix, isMinCss, state, isResponsive) {
            if (value === 'none') {
                if (isResponsive && !isMinCss) {
                    return `.${escapeClass(
                        cls,
                    )} {\n\t\ttransition-property: ${value}\n\t}`;
                }
                if (!isMinCss) {
                    return `.${escapeClass(
                        cls,
                    )} {\n\ttransition-property: ${value}\n}`;
                }
                return `.${escapeClass(cls)}{transition-property:${value}}`;
            }

            if (isResponsive && !isMinCss) {
                return `.${escapeClass(
                    cls,
                )} {\n\t\ttransition-property: ${value};\n\t\ttransition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n\t\ttransition-duration: 150ms\n\t}`;
            }
            if (!isMinCss) {
                return `.${escapeClass(
                    cls,
                )} {\n\ttransition-property: ${value};\n\ttransition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n\ttransition-duration: 150ms\n}`;
            }
            return `.${escapeClass(cls)}{transition-property:${value};transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}`;
        }
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
    transform: {
        getRule: function (cls, value, prefix, isMinCss, state, isResponsive, isImportant) {
            // console.log(cls, value, prefix, isMinCss, state, isResponsive)


            if (prefix === 'transform-') {
                if (isResponsive && !isMinCss) {
                    return `.${escapeClass(cls)}${
                        state ? `${state}` : ''
                    } {\n\t\ttransform: none\n\t}`;
                }
                if (!isMinCss) {
                    return `.${escapeClass(cls)}${
                        state ? `${state}` : ''
                    } {\n\ttransform: none\n}`;
                }
                return `.${escapeClass(cls)}${
                    state ? `${state}` : ''
                }{transform:none}`;
            }


            let typeVar;
            if (prefix === 'scale-x-') typeVar = ['--cl-scale-x'];
            else if (prefix === 'scale-y-') typeVar = ['--cl-scale-y'];
            else if (prefix === 'scale-') typeVar = ['--cl-scale-x', '--cl-scale-y'];
            else if (prefix === 'skew-x-') typeVar = ['--cl-skew-x'];
            else if (prefix === 'skew-y-') typeVar = ['--cl-skew-y'];
            else if (prefix === 'skew-') typeVar = ['--cl-skew-x', '--cl-skew-y'];
            else if (prefix === 'translate-x-') typeVar = ['--cl-translate-x'];
            else if (prefix === 'translate-y-') typeVar = ['--cl-translate-y'];
            else if (prefix === 'translate-') typeVar = ['--cl-translate-x', '--cl-translate-y'];
            else if (prefix === 'rotate-') typeVar = ['--cl-rotate'];


            typeVar = typeVar.map((i) => `${i}: ${value}`)

            if (isResponsive && !isMinCss) {
                return `.${escapeClass(cls)}${
                    state ? `${state}` : ''
                } {\n\t\t${typeVar.join(';\n\t')};\n\t\ttransform: translate(var(--cl-translate-x), var(--cl-translate-y)) rotate(var(--cl-rotate)) skewX(var(--cl-skew-x)) skewY(var(--cl-skew-y)) scaleX(var(--cl-scale-x)) scaleY(var(--cl-scale-y))${isImportant ? ' !important' : ''}\n\t}`;
            }
            if (!isMinCss) {
                return `.${escapeClass(cls)}${
                    state ? `${state}` : ''
                } {\n\t${typeVar.join(';\n\t')};\n\ttransform: translate(var(--cl-translate-x), var(--cl-translate-y)) rotate(var(--cl-rotate)) skewX(var(--cl-skew-x)) skewY(var(--cl-skew-y)) scaleX(var(--cl-scale-x)) scaleY(var(--cl-scale-y))${isImportant ? ' !important' : ''}\n}`;
            }
            return `.${escapeClass(cls)}${
                state ? `${state}` : ''
            }{${typeVar.join(';\n\t')};transform:translate(var(--cl-translate-x),var(--cl-translate-y)) rotate(var(--cl-rotate)) skewX(var(--cl-skew-x)) skewY(var(--cl-skew-y)) scaleX(var(--cl-scale-x)) scaleY(var(--cl-scale-y))${isImportant ? ' !important' : ''}}`;
        }
    },
    /*translate: {
        getRule: function (cls, value, prefix, isMinCss, state, isResponsive) {
            const directionVariable = prefix === 'translate-x-' ? '--cl-translate-x' : '--cl-translate-y';
            if (isResponsive && !isMinCss) {
                return `.${escapeClass(cls)}${
                    state ? `${state}` : ''
                } {\n\t\t${directionVariable}: ${value};\n\t\ttranslate: var(--cl-translate-x) var(--cl-translate-y)\n\t}`;
            }
            if (!isMinCss) {
                return `.${escapeClass(cls)}${
                    state ? `${state}` : ''
                } {\n\t${directionVariable}: ${value};\n\ttranslate: var(--cl-translate-x) var(--cl-translate-y)\n}`;
            }
            return `.${escapeClass(cls)}${
                state ? `${state}` : ''
            }{${directionVariable}:${value};translate:var(--cl-translate-x) var(--cl-translate-y)}`;
        },
    },*/
    space: {
        getRule: function (cls, value, prefix, isMinCss, state, isResponsive) {
            let property;

            if (prefix === 'space-y-') property = 'margin-top';
            else if (prefix === 'space-y-reverse-') property = 'margin-bottom';
            else if (prefix === 'space-x-reverse-') property = 'margin-right';
            else if (prefix === 'space-x-') property = 'margin-left';

            if (isResponsive && !isMinCss) {
                return `.${escapeClass(cls)}${
                    state ? `${state}` : ''
                } > :not([hidden])~:not([hidden]) {\n\t\t${property}: ${value}\n\t}`;
            }

            if (!isMinCss) {
                return `.${escapeClass(cls)}${
                    state ? `${state}` : ''
                } > :not([hidden])~:not([hidden]) {\n\t${property}: ${value}\n}`;
            }
            return `.${escapeClass(cls)}${
                state ? `${state}` : ''
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
                    state ? `${state}` : ''
                } > :not([hidden])~:not([hidden]) {\n\t\t${property}: ${value}\n\t}`;
            }

            if (!isMinCss) {
                return `.${escapeClass(cls)}${
                    state ? `${state}` : ''
                } > :not([hidden])~:not([hidden]) {\n\t${property}: ${value}\n}`;
            }
            return `.${escapeClass(cls)}${
                state ? `${state}` : ''
            }>:not([hidden])~:not([hidden]){${property}:${value}}`;
        }
    },
    'divide-color': {
        getRule: function (cls, value, prefix, isMinCss, state) {
            if (!isMinCss) {
                return `.${escapeClass(cls)}${
                    state ? `${state}` : ''
                } > :not([hidden])~:not([hidden]) {\n\tborder-color: ${value}\n}`;
            }
            return `.${escapeClass(cls)}${
                state ? `${state}` : ''
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
    let stateStr = ''

    for (const i of state) {
        if (i === 'has') {
            ruleForHas = cls.split(':').find((item, index) =>
                item.startsWith('[') &&
                item.endsWith(']') &&
                index !== cls.split(':').length - 1
            );
            ruleForHas = ruleForHas ? ruleForHas.slice(1, -1) : '';
            stateStr += `:has(${ruleForHas})`
        } else if (i === 'first') {
            stateStr += ':first-child'
        } else if (i === 'last') {
            const match = cls.match(/\[(.*?)\]/);

            stateStr += ':last-child' + (match ? ' ' + match[1] : '')
        } else if (i === 'odd') {
            stateStr += ':nth-child(odd)'
        } else if (i === 'even') {
            stateStr += ':nth-child(even)'
        } else if(i === 'nth-child') {
            const match = cls.match(/\[(.*?)\]/);
            stateStr += `:nth-child(${match[1]})`
        } else if (i ==='rtl') {
            stateStr += ':where([dir=rtl], [dir=rtl] *)'
        } else if (i === 'not') {
            const match = cls.match(/\[(.*?)\]/);
            stateStr += `:not(${match[1]})`
        } else {
            stateStr += `:${i}`
        }
    }

    // console.log('stateStr', stateStr)

    if (uniqueRules[property]) {
        return uniqueRules[property].getRule(cls, value, prefix, isMinCss, stateStr, isResponsive, isImportant);
    }
    if (isResponsive) {
        if (!isMinCss) {
            return `.${escapeClass(cls)}${stateStr ? `${stateStr}` : ''} {\n ${property
                .map((p) => `\t\t${p}: ${value}${isImportant ? ' !important' : ''}`)
                .join('; \n ')} \n\t}`;
        }
        return `.${escapeClass(cls)}${stateStr ? `${stateStr}` : ''} {${property
            .map((p) => `${p}: ${value}${isImportant ? ' !important' : ''}`)
            .join(';')}}`;
    }
    if (!isMinCss) {
        return `.${escapeClass(cls)}${stateStr ? `${stateStr}` : ''} {\n ${property
            .map((p) => `\t${p}: ${value}${isImportant ? ' !important' : ''}`)
            .join('; \n ')}\n}`;
    }
    return `.${escapeClass(cls)}${stateStr ? `${stateStr}` : ''}{${property
        .map((p) => `${p}:${value}${isImportant ? ' !important' : ''}`)
        .join(';')}}`;
}

module.exports = {
    createRule,
}