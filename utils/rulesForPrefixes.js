const {getColorValue, isNumber} = require('./functions.js');

const borderRadiusValues = {
    none: '0px',
    sm: '2px',
    '': '4px',
    md: '6px',
    lg: '8px',
    xl: '12px',
    '2xl': '16px',
    '3xl': '24px',
    '4xl': '32px',
    full: '9999px',
};

const ruleForBorderRadius = {
    acceptableValues: {
        number: true,
        valuePx: true,
    },
    specialValues: borderRadiusValues
}

const rulesForPrefixes = {
    'mg-': {
        acceptableValues: {
            auto: true,
            number: true,
            negative: true,
            valuePx: true,
            valuePercent: true,
            valueCalc: true,
        }
    },
    'mgy-': {
        acceptableValues: {
            auto: true,
            number: true,
            negative: true,
            valuePx: true,
            valuePercent: true,
            valueCalc: true,
        }
    },
    'mgx-': {
        acceptableValues: {
            auto: true,
            number: true,
            negative: true,
            valuePx: true,
            valuePercent: true,
            valueCalc: true,
        }
    },
    'mgt-': {
        acceptableValues: {
            auto: true,
            number: true,
            negative: true,
            valuePx: true,
            valuePercent: true,
            valueCalc: true,
        }
    },
    'mgr-': {
        acceptableValues: {
            auto: true,
            number: true,
            negative: true,
            valuePx: true,
            valuePercent: true,
            valueCalc: true,
        }
    },
    'mgb-': {
        acceptableValues: {
            auto: true,
            number: true,
            negative: true,
            valuePx: true,
            valuePercent: true,
            valueCalc: true,
        }
    },
    'mgl-': {
        acceptableValues: {
            auto: true,
            number: true,
            negative: true,
            valuePx: true,
            valuePercent: true,
            valueCalc: true,
        }
    },
    'p-': {
        acceptableValues: {
            number: true,
            valuePx: true,
            valuePercent: true,
            valueCalc: true,
        }
    },
    'px-': {
        acceptableValues: {
            number: true,
            valuePx: true,
            valuePercent: true,
            valueCalc: true,
        }
    },
    'py-': {
        acceptableValues: {
            number: true,
            valuePx: true,
            valuePercent: true,
            valueCalc: true,
        }
    },
    'pt-': {
        acceptableValues: {
            number: true,
            valuePx: true,
            valuePercent: true,
            valueCalc: true,
        }
    },
    'pr-': {
        acceptableValues: {
            number: true,
            valuePx: true,
            valuePercent: true,
            valueCalc: true,
        }
    },
    'pb-': {
        acceptableValues: {
            number: true,
            valuePx: true,
            valuePercent: true,
            valueCalc: true,
        }
    },
    'pl-': {
        acceptableValues: {
            number: true,
            valuePx: true,
            valuePercent: true,
            valueCalc: true,
        }
    },
    'z-': {
        acceptableValues: {
            auto: true,
            numeric: true,
            negative: true,
        }
    },
    'order-': {
        acceptableValues: {
            numeric: true,
            negative: true,
        },
        specialValues: {
            'first': '-9999',
            'last': '9999',
            'none': '0',
        }
    },
    'gap-': {
        acceptableValues: {
            number: true,
            valuePx: true,
            valueCalc: true,
        }
    },
    'gap-x-': {
        acceptableValues: {
            number: true,
            valuePx: true,
            valueCalc: true,
        }
    },
    'gap-y-': {
        acceptableValues: {
            number: true,
            valuePx: true,
            valueCalc: true,
        }
    },
    'top-': {
        acceptableValues: {
            auto: true,
            number: true,
            negative: true,
            valuePx: true,
            valuePercent: true,
            valueFull: true,
            valueCalc: true,
        }
    },
    'right-': {
        acceptableValues: {
            auto: true,
            number: true,
            negative: true,
            valuePx: true,
            valuePercent: true,
            valueFull: true,
            valueCalc: true,
        }
    },
    'bottom-': {
        acceptableValues: {
            auto: true,
            number: true,
            negative: true,
            valuePx: true,
            valuePercent: true,
            valueFull: true,
            valueCalc: true,
        }
    },
    'left-': {
        acceptableValues: {
            auto: true,
            number: true,
            negative: true,
            valuePx: true,
            valuePercent: true,
            valueFull: true,
            valueCalc: true,
        }
    },
    'inset-': {
        acceptableValues: {
            auto: true,
            number: true,
            negative: true,
            valuePx: true,
            valuePercent: true,
            valueFull: true,
            valueCalc: true,
        }
    },
    'inset-x-': {
        acceptableValues: {
            auto: true,
            number: true,
            negative: true,
            valuePx: true,
            valuePercent: true,
            valueFull: true,
            valueCalc: true,
        }
    },
    'inset-y-': {
        acceptableValues: {
            auto: true,
            number: true,
            negative: true,
            valuePx: true,
            valuePercent: true,
            valueFull: true,
            valueCalc: true,
        }
    },
    'space-x-reverse-': {
        acceptableValues: {
            number: true,
            valuePx: true,
            valueCalc: true,
             negative: true,
        }
    },
    'space-y-reverse-': {
        acceptableValues: {
            number: true,
            valuePx: true,
            valueCalc: true,
             negative: true,
        }
    },
    'space-x-': {
        acceptableValues: {
            number: true,
            valuePx: true,
            valueCalc: true,
            negative: true,
        }
    },
    'space-y-': {
        acceptableValues: {
            number: true,
            valuePx: true,
            valueCalc: true,
            negative: true,
        }
    },
    'opacity-': {
        acceptableValues: {
            numeric: true,
        },
        uniqueResult: function (value) {
            return  value < 10 ? `0.0${value}` : value < 100 ? `0.${value}` : +value === 100 ? 1 : null;
        },
    },
    'w-': {
        acceptableValues: {
            auto: true,
            number: true,
            valuePx: true,
            valuePercent: true,
            valueFull: true,
            valuesContent: true,
            valueCalc: true,
        },
        specialValues: {
            'screen': '100vw',
        }
    },
    'min-w-': {
        acceptableValues: {
            auto: true,
            number: true,
            valuePx: true,
            valuePercent: true,
            valueFull: true,
            valuesContent: true,
            valueCalc: true,
        },
        specialValues: {
            'screen': '100vw',
        }
    },
    'max-w-': {
        acceptableValues: {
            number: true,
            valuePx: true,
            valuePercent: true,
            valueFull: true,
            valuesContent: true,
            valueCalc: true,
        },
        specialValues: {
            'none': 'none',
            'screen': '100vw',
        }
    },
    'h-': {
        acceptableValues: {
            auto: true,
            number: true,
            valuePx: true,
            valuePercent: true,
            valueFull: true,
            valuesContent: true,
            valueCalc: true,
        },
        specialValues: {
            'screen': '100vh',
        }
    },
    'min-h-': {
        acceptableValues: {
            auto: true,
            number: true,
            valuePx: true,
            valuePercent: true,
            valueFull: true,
            valuesContent: true,
            valueCalc: true,
        },
        specialValues: {
            'screen': '100vh',
        }
    },
    'max-h-': {
        acceptableValues: {
            number: true,
            valuePx: true,
            valuePercent: true,
            valueFull: true,
            valuesContent: true,
            valueCalc: true,
        },
        specialValues: {
            'none': 'none',
            'screen': '100vh',
        }
    },
    'size-': {
        acceptableValues: {
            auto: true,
            number: true,
            valuePx: true,
            valuePercent: true,
            valueFull: true,
            valuesContent: true,
            valueCalc: true,
        },
    },
    'basis-': {
        acceptableValues: {
            auto: true,
            number: true,
            valuePx: true,
            valuePercent: true,
            valueFull: true,
            valueCalc: true,
        }
    },
    'grow': {
        acceptableValues: {
            numeric: true,
        },
        specialValues: {
            '': '1',
        }
    },
    'shrink': {
        acceptableValues: {
            numeric: true,
        },
        specialValues: {
            '': '1',
        }
    },
    'flex-': {
        acceptableValues: {},
        specialValues: {
            '1': '1 1 0%',
            'auto': '1 1 auto',
            'initial': '0 1 auto',
            'none': 'none',
        }
    },
    'columns-': {
        acceptableValues: {
            auto: true,
            numeric: true,
        },
        specialValues: {
            '3xs': '256px',
            '2xs': '288px',
            'xs': '320px',
            'sm': '384px',
            'md': '448px',
            'lg': '512px',
            'xl': '576px',
            '2xl': '672px',
            '3xl': '786px',
            '4xl': '896px',
            '5xl': '1024px',
            '6xl': '1152px',
            '7xl': '1280px',
        }
    },
    'col-span-': {
        acceptableValues: {
            numeric: true,
            minValue: 1,
        },
        specialValues: {
            'full': '1 / -1'
        },
        uniqueResult: function (value) {
            return `span ${value}`;
        }
    },
    'col-start-': {
        acceptableValues: {
            auto: true,
            numeric: true,
        }
    },
    'col-end-': {
        acceptableValues: {
            auto: true,
            numeric: true,
        }
    },
    'grid-cols-': {
        acceptableValues: {
            numeric: true,
            minValue: 1,
        },
        specialValues: {
            'none': 'none',
            'subgrid': 'subgrid',
        },
        uniqueResult: function (value) {
            return `repeat(${value}, minmax(0, 1fr))`
        }
    },
    'grid-rows-': {
        acceptableValues: {
            numeric: true,
            minValue: 1,
        },
        specialValues: {
            'none': 'none',
            'subgrid': 'subgrid',
        },
        uniqueResult: function (value) {
            return `repeat(${value}, minmax(0, 1fr))`
        }
    },
    'leading-': {
        acceptableValues: {
            number: true,
        },
        specialValues: {
            'none': 1,
            'tight': 1.25,
            'snug': 1.375,
            'normal': 1.5,
            'relaxed': 1.625,
            'loose': 2,
        }
    },
    'tracking-': {
        acceptableValues: {
            number: true,
            staticEm: true,
            negative: true,
        },
        specialValues: {
            'tighter': '-0.05em',
            'tight': '-0.025em',
            'normal': '0em',
            'wide': '0.025em',
            'wider': '0.05em',
            'widest': '0.1em',
        }
    },
    'line-clamp-': {
        acceptableValues: {
            numeric: true,
            minValue: 1,
        },
        specialValues: {
            'none': 'none'
        }
    },
    'truncate': {
        acceptableValues: {},
        specialValues: {
            '': true,
        }
    },
    'translate-x-': {
        acceptableValues: {
            number: true,
            valuePx: true,
            valuePercent: true,
            valueFull: true,
            negative: true,
        }
    },
    'translate-y-': {
        acceptableValues: {
            number: true,
            valuePx: true,
            valuePercent: true,
            valueFull: true,
            negative: true,
        }
    },
    'divide-x-reverse': {
        acceptableValues: {},
        specialValues: {
            '': '1px',
        }
    },
    'divide-x-reverse-': {
        acceptableValues: {
            number: true,
            valuePx: true,
        }
    },
    'divide-y-reverse': {
        acceptableValues: {},
        specialValues: {
            '': '1px',
        }
    },
    'divide-y-reverse-': {
        acceptableValues: {
            number: true,
            valuePx: true,
        }
    },
    'divide-x': {
        acceptableValues: {},
        specialValues: {
            '': '1px',
        }
    },
    'divide-x-': {
        acceptableValues: {
            number: true,
            staticPx: true,
        }
    },
    'divide-y': {
        acceptableValues: {},
        specialValues: {
            '': '1px',
        }
    },
    'divide-y-': {
        acceptableValues: {
            number: true,
            staticPx: true,
        }
    },
    'divide-': {
        acceptableValues: {},
        uniqueResult: getColorValue
    },
    'bg-': {
        acceptableValues: {},
        uniqueResult: getColorValue
    },
    'text-': {
        acceptableValues: {
            number: true,
            valuePx: true,
        },
        uniqueResult: function (value) {
            if (typeof value === 'object') {
                return getColorValue(value);
            }
            return value;
        }
    },
    'border-x': {
        acceptableValues: {},
        specialValues: {
            '': '1px',
        }
    },
    'border-x-': {
        acceptableValues: {
            number: true,
            staticPx: true,
        },
    },
    'border-y': {
        acceptableValues: {},
        specialValues: {
            '': '1px',
        }
    },
    'border-y-': {
        acceptableValues: {
            number: true,
            staticPx: true,
        },
    },
    'border-t': {
        acceptableValues: {},
        specialValues: {
            '': '1px',
        }
    },
    'border-t-': {
        acceptableValues: {
            number: true,
            staticPx: true,
        },
    },
    'border-r': {
        acceptableValues: {},
        specialValues: {
            '': '1px',
        }
    },
    'border-r-': {
        acceptableValues: {
            number: true,
            staticPx: true,
        },
    },
    'border-b': {
        acceptableValues: {},
        specialValues: {
            '': '1px',
        }
    },
    'border-b-': {
        acceptableValues: {
            number: true,
            staticPx: true,
        },
    },
    'border-l': {
        acceptableValues: {},
        specialValues: {
            '': '1px',
        }
    },
    'border-l-': {
        acceptableValues: {
            number: true,
            staticPx: true,
        },
    },
    'border': {
        acceptableValues: {},
        specialValues: {
            '': '1px',
        }
    },
    'border-': {
        acceptableValues: {
            number: true,
            staticPx: true,
            noResultError: true,
        },
        uniqueResult: function (value) {
            if (typeof value === 'object') {
                return getColorValue(value);
            }
            return value;
        }
    },
    'rounded': {
        acceptableValues: {},
        specialValues: {
            '': '4px',
        }
    },
    'rounded-': ruleForBorderRadius,
    'rounded-t': ruleForBorderRadius,
    'rounded-t-': ruleForBorderRadius,
    'rounded-r': ruleForBorderRadius,
    'rounded-r-': ruleForBorderRadius,
    'rounded-b': ruleForBorderRadius,
    'rounded-b-': ruleForBorderRadius,
    'rounded-l': ruleForBorderRadius,
    'rounded-l-': ruleForBorderRadius,
    'rounded-tl': ruleForBorderRadius,
    'rounded-tl-': ruleForBorderRadius,
    'rounded-tr': ruleForBorderRadius,
    'rounded-tr-': ruleForBorderRadius,
    'rounded-br': ruleForBorderRadius,
    'rounded-br-': ruleForBorderRadius,
    'rounded-bl': ruleForBorderRadius,
    'rounded-bl-': ruleForBorderRadius,
    'border-spacing-': {
        acceptableValues: {
            number: true,
            valuePx: true,
        },
    },
    'rotate-': {
        acceptableValues: {
            number: true,
            negative: true,
        },
        uniqueResult: function (value) {
            return `rotate(${value}deg)`
        }
    },
    'content-': {
        acceptableValues: {
            removeBrackets: true,
        },
    },
    'aspect-': {
        acceptableValues: {
            auto: true,
        },
        specialValues: {
            'square': '1 / 1',
            'video': '16 / 9',
        },
        uniqueResult: function (value) {
            return /^\d+\/\d+$/.test(value) ? value.split('/').join(' / ') : null;
        }
    },
    'backdrop-blur': {
        acceptableValues: {},
        specialValues: {
            '': 'blur(8px)',
        }
    },
    'backdrop-blur-': {
        acceptableValues: {
            number: true,
            valuePx: true,
            noResultError: true,
        },
        specialValues: {
            'none': 'blur(0)',
            'sm': 'blur(4px)',
            'md': 'blur(12px)',
            'lg': 'blur(16px)',
            'xl': 'blur(24px)',
            '2xl': 'blur(40px)',
            '3xl': 'blur(64px)',
        },
        uniqueResult: function (value) {
            return `blur(${value})`
        }
    }
}

module.exports = {
  rulesForPrefixes,
};