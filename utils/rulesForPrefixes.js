const getColorValue = (colorInfo) => {
    if (colorInfo.fixedValue) {
        return `${colorInfo.fixedValue}`;
    } else {
        const {opacityValue, rgb} = colorInfo;
        const rgbStr = Object.values(rgb).join(', ');
        if (opacityValue) {
            return `rgba(${rgbStr}, 0.${opacityValue})`;
        }
        return `rgba(${rgbStr}, 1)`;
    }
};

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
        }
    },
    'space-y-reverse-': {
        acceptableValues: {
            number: true,
            valuePx: true,
            valueCalc: true,
        }
    },
    'space-x-': {
        acceptableValues: {
            number: true,
            valuePx: true,
            valueCalc: true,
        }
    },
    'space-y-': {
        acceptableValues: {
            number: true,
            valuePx: true,
            valueCalc: true,
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
        acceptableValues: {},
        uniqueResult: getColorValue
    },
    'border': {
        acceptableValues: {},
        specialValues: {
            '': '1px',
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
    'border-': {
        acceptableValues: {
            number: true,
            staticPx: true,
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
        specialValues: borderRadiusValues
    },
    'rounded-': {
        acceptableValues: {
            number: true,
            valuePx: true,
        },
        specialValues: borderRadiusValues
    },
    'rounded-t': {
        acceptableValues: {
            number: true,
            valuePx: true,
        },
        specialValues: borderRadiusValues
    },
    'rounded-t-': {
        acceptableValues: {
            number: true,
            valuePx: true,
        },
        specialValues: borderRadiusValues
    },
    'rounded-r': {
        acceptableValues: {
            number: true,
            valuePx: true,
        },
        specialValues: borderRadiusValues
    },
    'rounded-r-': {
        acceptableValues: {
            number: true,
            valuePx: true,
        },
        specialValues: borderRadiusValues
    },
    'rounded-b': {
        acceptableValues: {
            number: true,
            valuePx: true,
        },
        specialValues: borderRadiusValues
    },
    'rounded-b-': {
        acceptableValues: {
            number: true,
            valuePx: true,
        },
        specialValues: borderRadiusValues
    },
    'rounded-l': {
        acceptableValues: {
            number: true,
            valuePx: true,
        },
        specialValues: borderRadiusValues
    },
    'rounded-l-': {
        acceptableValues: {
            number: true,
            valuePx: true,
        },
        specialValues: borderRadiusValues
    },
    'rounded-tl': {
        acceptableValues: {
            number: true,
            valuePx: true,
        },
        specialValues: borderRadiusValues
    },
    'rounded-tl-': {
        acceptableValues: {
            number: true,
            valuePx: true,
        },
        specialValues: borderRadiusValues
    },
    'rounded-tr': {
        acceptableValues: {
            number: true,
            valuePx: true,
        },
        specialValues: borderRadiusValues
    },
    'rounded-tr-': {
        acceptableValues: {
            number: true,
            valuePx: true,
        },
        specialValues: borderRadiusValues
    },
    'rounded-br': {
        acceptableValues: {
            number: true,
            valuePx: true,
        },
        specialValues: borderRadiusValues
    },
    'rounded-br-': {
        acceptableValues: {
            number: true,
            valuePx: true,
        },
        specialValues: borderRadiusValues
    },
    'rounded-bl': {
        acceptableValues: {
            number: true,
            valuePx: true,
        },
        specialValues: borderRadiusValues
    },
    'rounded-bl-': {
        acceptableValues: {
            number: true,
            valuePx: true,
        },
        specialValues: borderRadiusValues
    },
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
    }
}

module.exports = {
  rulesForPrefixes,
};