const {specialLogic} = require('./mappings.js');
const {isNumeric, isNumber} = require('./functions.js');
const {rulesForPrefixes} = require('./rulesForPrefixes.js');
const {rulesForStaticClasses} = require('./rulesForStaticClasses.js');
const {color} = require("../config/typographyConfig/color");

function escapeClass(cls) {
  return cls
    .replace(/\\/g, '\\\\')
    .replace(/:/g, '\\:')
    .replace(/\./g, '\\.')
    .replace(/\//g, '\\/')
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]')
    .replace(/\*/g, '\\*')
    .replace(/'/g, "\\'")
    .replace(/!/g, '\\!')
    .replace(/,/g, '\\,')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/\%/g, '\\%')
    .replace(/\>/g, '\\>');
}

function resolveCssValue(value, isNegative, propsStr, rawClass, prefix, colorInfo) {
  const isStaticValue = specialLogic && specialLogic[propsStr] && specialLogic[propsStr][rawClass];

  let result = null;

  // console.log(value, propsStr, rawClass, prefix)

  if (onlyStaticClasses.includes(propsStr)) {
    result = isStaticValue || null;
  } else if (/^\[.*\]$/.test(value) && propsStr !== 'content') {
    value = value.slice(1, -1);
    if (isValidCalcExpression(value)) {
      result = normalizeCalcExpression(value);
    }
  } else if (prefix === 'opacity-') {
    result = value < 10 ? `0.0${value}` : value < 100 ? `0.${value}` : 1;
  } else if (uniqueRules[propsStr] && uniqueRules[propsStr].getValue) {
    result = uniqueRules[propsStr].getValue(value, rawClass, prefix, isNegative);
  } else if (value === 'px') {
    result = isNegative ? '-1px' : '1px';
  } else if (value === 'auto' && prefix !== 'flex-') {
    result = 'auto';
  } else if (value === 'full') {
    result = '100%';
  } else if (value === 'min') {
    result = 'min-content';
  } else if (value === 'max') {
    result = 'max-content';
  } else if (value === 'fit') {
    result = 'fit-content';
  } else if (prefix === 'flex-') {
    result = flexValues[value] || null;
  } else if (prefix === 'col-span-') {
    result = `span ${value}`;
  } else if (prefix === 'rotate-') {
    result = `rotate(${isNegative ? '-' : ''}${value}deg)`;
  } else if (prefix === 'content-') {
    result = value.slice(1, -1);
  } else if ((prefix === 'grid-cols-' || prefix === 'grid-rows-') && (!isNaN(parseFloat(value)) || value === 'none')) {
    if (value === 'none') {
      result = 'none';
    } else {
      result = `repeat(${value}, minmax(0, 1fr))`;
    }
  } else if (propsStr === 'flex-shrink' || propsStr === 'flex-grow') {
    result = shrinkGrow[rawClass];
  } else if (propColors.includes(propsStr)) {
    result = getColorValue(colorInfo);
  } else if ((prefix === 'line-clamp-' && value === 'none') || (prefix === 'max-h-' && value === 'none')) {
    result = 'none';
  } else if (prefixesForBorderRadius.includes(propsStr.split(',')[0]) && borderRadiusValues[value]) {
    result = borderRadiusValues[value];
  } else if (prefixesForStaticValuePx.includes(prefix) && !isNaN(value)) {
    result = `${value}px`;
  } else if (prefixesForStaticOnePx.includes(prefix) && prefix === rawClass) {
    result = '1px';
  } else if (prefix === 'z-' && !isNaN(parseFloat(value))) {
    result = `${isNegative ? '-' : ''}${value}`;
  } else if (prefixesForStaticValue.includes(prefix) && !isNaN(value)) {
    if (prefix === 'order-') {
      result = `${isNegative ? '-' : ''}${value}`;
    } else {
      result = value;
    }
  } else if (/^\d+\/\d+$/.test(value)) {
    const [num1, num2] = value.split('/');
    result = `${(num1 * 100) / num2}%`; // для значений: 1/2, 3/4, 9/12 и тд, возвращает процент
  } else if (isStaticValue) {
    result = isStaticValue; // особые значения из списка (d-flex: flex, w-screen: 100vw и тд)
  } else if (!isNaN(value) && !value.includes('/')) {
    result = `${isNegative ? '-' : ''}${value * 4}px`;
  }

  return [result, isStaticValue];
}


function getValue(value, isNegative, propStr, rawClass, prefix, colorInfo) {
  console.log(value, isNegative, propStr, rawClass, prefix, colorInfo)

  const isStaticValue = rulesForStaticClasses[propStr] && rulesForStaticClasses[propStr][rawClass];
  let result = null;

  if (isStaticValue) { // if has static classes
    return [rulesForStaticClasses[propStr][rawClass], isStaticValue];
  }

  const rulesForClass = rulesForPrefixes[prefix];
  if (!rulesForClass) return [null, null];

  const acceptedValues = rulesForClass.acceptableValues;
  const specialValues = rulesForClass.specialValues;

  if (
      !acceptedValues.negative && isNegative ||
      value === 'auto' && isNegative ||
      value === '0' && isNegative ||
      acceptedValues.minValue > value
  ) return [null, null]


   if (acceptedValues.auto && value === 'auto') { // can be auto
    result = 'auto';
  } else if (acceptedValues.valuePx && value === 'px') { // can be px
    result = '1px';
    if (acceptedValues.negative && isNegative) {  // can be negative px
      result = '-' + result;
    }
  } else if (acceptedValues.valueFull && value === 'full') { // can be full - 100%
    result = '100%';

    if (acceptedValues.negative && isNegative) {  // can be negative full - 100%
      result = '-' + result;
    }
  } else if (acceptedValues.number && isNumber(value)) { // can be number
      if (acceptedValues.valuePx) {
        result = `${value * 4}px`;
      } else if (acceptedValues.staticPx) {
        result = `${value}px`;
      } else {
        result = value;
      }

    if (acceptedValues.negative && isNegative) { // can be negative number with px OR negative only number
      result = '-' + result;
    }
  } else if (acceptedValues.numeric && isNumeric(value)) { // can be only numeric
    result = value;
    if (acceptedValues.negative && isNegative) { // can be negative only numeric
      result = '-' + result;
    }
  } else if (acceptedValues.valuePercent && /^\d+\/\d+$/.test(value)) { // can be only number/number + percent
    const [num1, num2] = value.split('/');
    result = `${(num1 * 100) / num2}%`

    if (acceptedValues.negative && isNegative) { // can be negative only number/number + percent
      result = '-' + result;
    }
  } else if (acceptedValues.valuesContent && getValuesContent[value]) {
    result = getValuesContent[value]
  } else if (acceptedValues.valueCalc && /^\[.*\]$/.test(value)) {
    value = value.slice(1, -1);
    if (isValidCalcExpression(value)) {
      result = normalizeCalcExpression(value);
    }
  }

  console.log(rulesForClass.uniqueResult)
  console.log(result || colorInfo)
  if (specialValues && specialValues[value] && !isNegative) {
    result = specialValues[value];
  } else if (rulesForClass.uniqueResult && (result || colorInfo)) {
    result = rulesForClass.uniqueResult(result || colorInfo);
  }

  console.log('result', result)
  console.log('value', value)
  console.log(result || value)

  return [result, isStaticValue];
}

// console.log(getValue(value, prefix, isNegative))

const getValuesContent = {
  'min': 'min-content',
  'max': 'max-content',
  'fit': 'fit-content',
}

const onlyStaticClasses = [
  'display',
  'position',
  'font-weight',
  'font-style',
  'white-space',
  'user-select',
  'flex-direction',
  'justify-content',
  'align-items',
  'align-content',
  'align-self',
  'flex-wrap',
  'cursor',
  'text-align',
  'letter-spacing',
  'text-transform',
  'overflow',
  'overflow-x',
  'overflow-y',
  'object-fit',
  'border-style',
  'background-size',
  'text-overflow',
  'justify-items',
  'place-items',
  'border-collapse',
];

const propColors = ['color', 'background-color', 'border-color', 'divide-color'];
const prefixesForStaticValuePx = [
  'border-',
  'border-x-',
  'border-y-',
  'border-t-',
  'border-r-',
  'border-b-',
  'border-l-',
  'divide-x-',
  'divide-y-',
  'divide-x-reverse-',
  'divide-y-reverse-',
];
const prefixesForStaticOnePx = [
  'border',
  'border-x',
  'border-y',
  'border-t',
  'border-r',
  'border-b',
  'border-l',
  'border-tl',
  'border-tr',
  'border-br',
  'border-bl',
  'gap',
];
const prefixesForStaticValue = ['leading-', 'order-', 'line-clamp-'];

const prefixesForBorderRadius = [
  'border-radius',
  'border-top-left-radius',
  'border-top-right-radius',
  'border-bottom-left-radius',
  'border-bottom-right-radius',
];

const shrinkGrow = {
  shrink: 1,
  'shrink-0': 0,
  grow: 1,
  'grow-0': 0,
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

const flexValues = {
  1: '1 1 0%',
  auto: '1 1 auto',
  initial: '0 1 auto',
  none: 'none',
};

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
    getValue: (val) => {
      if (isNumeric(val) || val === 'none') return val;
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
      // console.log(cls, value, prefix, isMinCss, state)

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
      // console.log(cls, value, prefix, isMinCss, state)

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
    // console.log('ruleForHas', ruleForHas)
    // console.log('ruleForHas', escapeClass(ruleForHas))
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
      .join('; \n ')} \n}`;
  }
  return `.${escapeClass(cls)}${state ? `:${state}` : ''}${ruleForHas ? `(${ruleForHas})` : ''}{${property
    .map((p) => `${p}:${value}${isImportant ? ' !important' : ''}`)
    .join(';')}}`;
}

function isValidCalcExpression(str) {
  const regex = /^calc\((?:[a-z0-9.%]+(?:[+\-*/][a-z0-9.%]+)+)\)$/i;
  return regex.test(str);
}

function normalizeCalcExpression(str) {
  // Добавляем пробелы вокруг операторов, только если их нет
  return str.replace(/([^\s])([+\-*/])([^\s])/g, '$1 $2 $3');
}

const states = ['hover', 'focus', 'before', 'after', 'has', 'first', 'last', 'odd', 'even']

module.exports = {
  createRule,
  resolveCssValue,
  getValue,
  states,
};
