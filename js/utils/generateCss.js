import {escapeClass} from "./cssUtils.js";

export function generateCssFromClasses(classSet, config, isDev) {
    let css = '';
    const responsiveMap = {
        sm: 587,
        md: 768,
        lg: 993,
        xl: 1200,
    }

    const rules = [];

    const responsiveRules = {
        sm: [],
        md: [],
        lg: [],
        xl: [],
    }

    for (const className of classSet) {
        const isResponsive = className.includes(':');
        const [prefixKey, rawClass] = isResponsive ? className.split(':') : [null, className];
        // console.log(prefixKey, rawClass)

        const prefixes = Object.keys(config);

        for (const prefix of prefixes) {
            if (!rawClass.startsWith(prefix) && !rawClass.startsWith(`-${prefix}`)) continue;

            const props = config[prefix];
            const isNegative = rawClass.startsWith(`-${prefix}`);
            let value = rawClass.slice(prefix.length)

            if (value.startsWith('-')) value = value.slice(1)

            let val = '';

            if (value === 'px') {
                val = isNegative ? '-1px' : '1px';
            } else if (!isNaN(parseFloat(value))) {
                val = `${isNegative ? '-' : ''}${parseFloat(value) * 4}px`
            }

            isDev && debug(className, rawClass, prefix, value, props, isNegative, prefixKey)

            let rule = null;
            if (prefixKey && responsiveMap[prefixKey]) {
                rule = `.${escapeClass(className)} {\n ${props.map(p => `\t\t${p}: ${val};`).join(' \n ')} \n\t}`;
                responsiveRules[prefixKey].push(rule);
            } else {
                rule = `.${escapeClass(className)} {\n ${props.map(p => `\t${p}: ${val};`).join(' \n ')} \n}`;
                rules.push(rule)
            }

        }
    }

    // console.log(responsiveRules)

    css += rules.join('\n\n');

    for (const key in responsiveRules) {
        const rules = responsiveRules[key];
        if (rules.length) {
            css += `\n\n@media (min-width: ${responsiveMap[key]}px) {\n\t${rules.join('\n')}\n}`;
        }
    }

    return isDev ? css : css.replace(/\s/g, '');
}

function debug(cls, rawCls, prefix, value, props, isNegative, prefixKey) {
    console.log(`Debug:\n\nClassName: ${cls}\nRawClass: ${rawCls}\nPrefix: ${prefix}\nValue: ${value}\nProps: ${props}\nIsNegative: ${isNegative}\nPrefixKey: ${prefixKey}\n\n`)
}