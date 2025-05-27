const { responsivePrefixes, responsiveRules, RESPONSIVE_MAP } = require('./responsive.js');
const { createRule, resolveCssValue, states } = require('./cssUtils.js');
const { colorNames, fixedColorValues, getColorInfo } = require('./color.js');
const { isNumber } = require('./functions.js');

function generateCssFromClasses(classSet, config, isDev) {
    let css = '';

    const rules = [];
    let translatePropertiesAdded = false;

    const borderSolidRule = isDev ? '* {\n \tborder: 0 solid \n}' : '*{border:0 solid}'
    rules.push(borderSolidRule)


  // console.log(Object.keys(config))
  // console.log(Object.values(config))
    for (const className of classSet) {
        const classNameParts = className.split(':');
        let responsivePrefix = null;
        let state = null;

        if (responsivePrefixes.includes(classNameParts[0])) {
            responsivePrefix = classNameParts[0];
        }
        responsivePrefixes.forEach(prefix => {
            const index = classNameParts.indexOf(prefix);
            if (index !== -1) {
                responsivePrefix = classNameParts.splice(index, 1);
            }
        })

        states.forEach(el => {
            const index = classNameParts.indexOf(el);
            if (index !== -1) {
                state = classNameParts.splice(index, 1).join();
            }
        })

        let rawClass = classNameParts.join();

        const isImportant = rawClass.startsWith('!');

        rawClass = isImportant ? rawClass.slice(1) : rawClass;

        const prefixes = Object.keys(config);

        for (let prefix of prefixes) {
            if (!rawClass.startsWith(prefix) && !rawClass.startsWith(`-${prefix}`)) continue;

            if (rawClass.includes('-') && !prefix.endsWith('-') && rawClass !== prefix) {
                let test = rawClass.split('-').slice(0, -1).join('-')
                // console.log(rawClass, prefix)
                // console.log(test, prefix)
                if (test !== prefix) continue;
            }

            let props = null;
            if (rawClass.includes('border') && rawClass.split('-').some(el => colorNames.includes(el) || fixedColorValues.includes(el))) {
                prefix = 'border-'
                props = ['border-color']
            }

            if (/^content-\[\s*(['"])(.*?)\1\s*\]$/.test(rawClass)) {
                props = ['content']
            }

            let value = rawClass.slice(prefix.length)

            if (value.startsWith('-')) value = value.slice(1)

            props = !props ? config[prefix] : props;

            if (!props) continue;

            if (props.join() === 'color' && isNumber(value)) {
                props = ['font-size']
            }

            let colorInfo, isColor;

            if (props.includes('color') || props.includes('background-color') || props.join() === 'border-color') {
                isColor = true;
                colorInfo = getColorInfo(value)
            }

          if (isColor && (!colorInfo || (!colorInfo.hex && !colorInfo.fixedValue))) continue;

            const propsStr = props.join();

            const isNegative = rawClass.startsWith(`-${prefix}`);

            let [val, isStaticValue] = resolveCssValue(value, isNegative, propsStr, rawClass, prefix, colorInfo);

            isDev && debug(className, rawClass, prefix, value, props, isNegative, isImportant, responsivePrefix, isStaticValue, colorInfo)

            if (val === null || val === undefined) break;

            let rule = null;

            const isResponsive = !!RESPONSIVE_MAP[responsivePrefix];

            if (!translatePropertiesAdded && propsStr === 'translate') {
                let translateProperties;
                if (isDev) {
                    translateProperties = `@property --cl-translate-x {\n\tsyntax: "*";\n\tinherits: false;\n\tinitial-value: 0\n}\n\n@property --cl-translate-y {\n\tsyntax: "*";\n\tinherits: false;\n\tinitial-value: 0\n}`
                } else {
                    translateProperties = `@property --cl-translate-x{syntax:"*";inherits:false;initial-value:0}@property --cl-translate-y{syntax:"*";inherits:false;initial-value:0}`
                }
                rules.push(translateProperties)
                translatePropertiesAdded = true;
            }


            rule = createRule(className, props, val, prefix, isImportant, state, isResponsive, isDev);
            // rule = isDev ? rule.replace(/\s/g, '') : rule;
            if (isResponsive) {
                responsiveRules[responsivePrefix].push(rule);
            } else {
                rules.push(rule)
            }
            break;
        }
    }



    css += isDev ? rules.join('\n\n') : rules.join('');

    for (const key in responsiveRules) {
        const rules = responsiveRules[key];
        if (rules.length) {
            css += isDev ? `\n\n@media (min-width: ${RESPONSIVE_MAP[key]}px) {\n\t${rules.join('\n\t')}\n}` :
                            `@media (min-width:${RESPONSIVE_MAP[key]}px){${rules.join('')}}`;
        }
    }

    return isDev ? css : css;
}

function debug(cls, rawCls, prefix, value, props, isNegative, isImportant, prefixKey, isStaticValue, colorInfo) {
    let colorInfoStr = '';
    if (colorInfo) {
        colorInfoStr = '\n\n'
        for (const key in colorInfo) {
            if (typeof colorInfo[key] === 'object' && colorInfo[key] !== null) {
                colorInfoStr += `${key}: ${Object.values(colorInfo[key]).join(', ')}\n`
                continue;
            }
            colorInfoStr += `${key}: ${colorInfo[key]}\n`
        }
    }
    console.log(`Debug:\n\nClassName: ${cls}\nRawClass: ${rawCls}\nPrefix: ${prefix}\nValue: ${value}\nProps: ${props}\nIsNegative: ${isNegative}\nIsImportant: ${isImportant}\nPrefixKey: ${prefixKey}\nIsSpecialValue: ${isStaticValue} ${colorInfoStr}\n\n`)
}

module.exports = {
  generateCssFromClasses
};
