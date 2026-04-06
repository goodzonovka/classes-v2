const {STATES, RESPONSIVE_MAP, RESPONSIVE_PREFIXES} = require('./constants');
const {createRule} = require('./createCssRule');
const {getValue} = require('./getCssValue');
const {colorNames, fixedColorValues, getColorInfo} = require('./color');
const {isValidCssNumber} = require('./functions');

function extractResponsivePrefix(classNameParts) {
    let responsivePrefix = null;

    if (RESPONSIVE_PREFIXES.includes(classNameParts[0])) {
        responsivePrefix = classNameParts[0];
    }

    RESPONSIVE_PREFIXES.forEach(prefix => {
        const index = classNameParts.indexOf(prefix);
        if (index !== -1) {
            responsivePrefix = classNameParts.splice(index, 1)[0];
        }
    });

    return responsivePrefix;
}

function extractStates(classNameParts) {
    const state = [];

    STATES.forEach(token => {
        const index = classNameParts.indexOf(token);
        if (index !== -1) {
            state.push(classNameParts.splice(index, 1).join());
        }
    });

    return state;
}

function normalizeRawClass(classNameParts) {
    let rawClass = classNameParts.join();
    const rawClassParts = rawClass.split(',');

    if (/^\[.*]$/.test(rawClassParts[0])) {
        rawClass = rawClassParts.filter(item => !/^\[.*]$/.test(item))[0];
    }

    const isImportant = rawClass.startsWith('!');

    return {
        rawClass: isImportant ? rawClass.slice(1) : rawClass,
        isImportant,
    };
}

function parseClassName(className) {
    if (/--+/.test(className) || className.endsWith('-')) return null;

    const classNameParts = className.split(/:(?![^\[]*])/);
    const responsivePrefix = extractResponsivePrefix(classNameParts);
    const state = extractStates(classNameParts);
    const {rawClass, isImportant} = normalizeRawClass(classNameParts);

    return {
        responsivePrefix,
        state,
        rawClass,
        isImportant,
    };
}

function isColorProps(props) {
    const propKey = props.join();
    return props.includes('color') || props.includes('background-color') || propKey === 'border-color' || propKey === 'divide-color';
}

function resolvePrefixContext(rawClass, prefix, config) {
    if (!rawClass.startsWith(prefix) && !rawClass.startsWith(`-${prefix}`)) {
        return {shouldContinue: true};
    }

    if (rawClass.includes('-') && !prefix.endsWith('-') && rawClass !== prefix) {
        const test = rawClass.split('-').slice(0, -1).join('-');
        if (test !== prefix) {
            return {shouldContinue: true};
        }
    }

    let resolvedPrefix = prefix;
    let props = null;

    if (rawClass.includes('border') && rawClass.split('-').some(el => colorNames.includes(el) || fixedColorValues.includes(el))) {
        resolvedPrefix = 'border-';
        props = ['border-color'];
    }

    if (/^content-\[\s*(['"])(.*?)\1\s*]$/.test(rawClass)) {
        props = ['content'];
    }

    let value = rawClass.slice(resolvedPrefix.length);

    if (value.startsWith('-')) value = value.slice(1);

    props = !props ? config[resolvedPrefix] : props;

    if (!props) {
        return {shouldContinue: true};
    }

    if (props.join() === 'color' && isValidCssNumber(value)) {
        props = ['font-size'];
    }

    const isColor = isColorProps(props);
    const colorInfo = isColor ? getColorInfo(value) : null;

    if (isColor && (!colorInfo || (!colorInfo.hex && !colorInfo.fixedValue))) {
        return {shouldContinue: true};
    }

    return {
        shouldContinue: false,
        prefix: resolvedPrefix,
        props,
        value,
        colorInfo,
    };
}

function pushRuleToBucket({
    rule,
    props,
    state,
    isResponsive,
    responsivePrefix,
    propsForLastRules,
    rules,
    lastRules,
    responsiveRules,
    responsiveLastRules,
}) {
    const shouldUseLastBucket = propsForLastRules.includes(props.join()) || state.length > 0;

    if (shouldUseLastBucket) {
        if (isResponsive) {
            responsiveLastRules[responsivePrefix].push(rule);
            return;
        }

        lastRules.push(rule);
        return;
    }

    if (isResponsive) {
        responsiveRules[responsivePrefix].push(rule);
        return;
    }

    rules.push(rule);
}

function buildCssOutput({
    rules,
    lastRules,
    responsiveRules,
    responsiveLastRules,
    isMinCss,
}) {
    let css = '';

    const allRules = [...rules, ...lastRules];
    css += !isMinCss ? allRules.join('\n\n') : allRules.join('');

    const responsiveAllRules = Object.keys(responsiveRules).reduce((acc, key) => {
        acc[key] = [...responsiveRules[key], ...responsiveLastRules[key]];
        return acc;
    }, {});

    for (const key in responsiveAllRules) {
        const rules = responsiveAllRules[key];
        if (rules.length) {
            css += !isMinCss
                ? `\n\n@media (min-width: ${RESPONSIVE_MAP[key]}px) {\n\t${rules.join('\n\t')}\n}`
                : `@media(min-width:${RESPONSIVE_MAP[key]}px){${rules.join('')}}`;
        }
    }

    return css;
}

function createBaseRules(isMinCss) {
    const variables = !isMinCss
        ? '*, ::before, ::after {\n\t--cl-translate-x: 0;\n\t--cl-translate-y: 0;\n\t--cl-rotate: 0;\n\t--cl-skew-x: 0;\n\t--cl-skew-y: 0;\n\t--cl-scale-x: 1;\n\t--cl-scale-y: 1;\n}'
        : '*{--cl-translate-x:0;--cl-translate-y:0;--cl-rotate:0;--cl-skew-x:0;--cl-skew-y:0;--cl-scale-x:1;--cl-scale-y:1}';

    const borderSolidRule = !isMinCss ? '* {\n \tborder: 0 solid\n}' : '*{border:0 solid}';

    return [variables, borderSolidRule];
}

function generateCssFromClasses(classSet, config, isDev, isMinCss) {
    const rules = [];

    const lastRules = [];

    const responsiveRules = Object.fromEntries(
        RESPONSIVE_PREFIXES.map(key => [key, []])
    );

    const responsiveLastRules = Object.fromEntries(
        RESPONSIVE_PREFIXES.map(key => [key, []])
    );

    const propsForLastRules = ['transition-duration'];
    const prefixes = Object.keys(config);

    rules.push(...createBaseRules(isMinCss));


    for (const className of classSet) {
        const parsedClass = parseClassName(className);
        if (!parsedClass) continue;

        const {responsivePrefix, state, isImportant} = parsedClass;
        let {rawClass} = parsedClass;

        for (let prefix of prefixes) {
            const resolvedContext = resolvePrefixContext(rawClass, prefix, config);
            if (resolvedContext.shouldContinue) continue;

            const {prefix: resolvedPrefix, props, value, colorInfo} = resolvedContext;

            const propsStr = props.join();

            const isNegative = rawClass.startsWith(`-${resolvedPrefix}`);

            let [val, isStaticValue] = getValue(value, isNegative, propsStr, rawClass, resolvedPrefix, colorInfo);

            isDev && debug(className, rawClass, resolvedPrefix, value, props, isNegative, isImportant, responsivePrefix, isStaticValue, state, colorInfo)

            if (val === null || val === undefined) break;

            let rule = null;

            const isResponsive = !!RESPONSIVE_MAP[responsivePrefix];

            rule = createRule(className, props, val, resolvedPrefix, isImportant, state, isResponsive, isMinCss);

            pushRuleToBucket({
                rule,
                props,
                state,
                isResponsive,
                responsivePrefix,
                propsForLastRules,
                rules,
                lastRules,
                responsiveRules,
                responsiveLastRules,
            });

            break;
        }
    }

    return buildCssOutput({
        rules,
        lastRules,
        responsiveRules,
        responsiveLastRules,
        isMinCss,
    });
}

function debug(cls, rawCls, prefix, value, props, isNegative, isImportant, prefixKey, isStaticValue, state, colorInfo) {
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
    console.log(`Debug:\n\nClassName: ${cls}\nRawClass: ${rawCls}\nPrefix: ${prefix}\nValue: ${value}\nProps: ${props}\nIsNegative: ${isNegative}\nIsImportant: ${isImportant}\nPrefixKey: ${prefixKey}\nIsStaticValue: ${!!isStaticValue}\nState: ${state} ${colorInfoStr}\n\n`)
}

module.exports = {
    generateCssFromClasses
};
