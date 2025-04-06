import {responsiveRules} from "./responsive.js";
import {createRule, resolveCssValue} from "./cssUtils.js";
import {RESPONSIVE_MAP} from "../config/constants.js";
import {specialLogic} from "./mappings.js";

export function generateCssFromClasses(classSet, config, isDev) {
    let css = '';

    const rules = [];

    for (const className of classSet) {
        const isClassParts = className.includes(':');
        let [prefixKey, rawClass] = isClassParts ? className.split(':') : [null, className];

        const isImportant = rawClass.startsWith('!');

        rawClass = isImportant ? rawClass.slice(1) : rawClass;

        const prefixes = Object.keys(config);

        for (const prefix of prefixes) {
            if (!rawClass.startsWith(prefix) && !rawClass.startsWith(`-${prefix}`)) continue;

            const props = config[prefix];
            const isStatic = Boolean(specialLogic?.[props.join()]);
            const isNegative = rawClass.startsWith(`-${prefix}`);

            if (isStatic && rawClass !== prefix) continue;

            let value = rawClass.slice(prefix.length)

            if (value.startsWith('-')) value = value.slice(1)

            let [val, isSpecialValue] = resolveCssValue(value, isNegative, props, rawClass, prefix, isStatic);

            isDev && debug(className, rawClass, prefix, value, props, isNegative, isImportant, prefixKey, isStatic, isSpecialValue)

            if (!val) continue;

            let rule = null;

            if (RESPONSIVE_MAP[prefixKey]) {
                rule = createRule(className, props, val, isImportant, true);
                responsiveRules[prefixKey].push(rule);
            } else {
                rule = createRule(className, props, val, isImportant)
                rules.push(rule)
            }
            break;
        }
    }

    css += rules.join('\n\n');

    for (const key in responsiveRules) {
        const rules = responsiveRules[key];
        if (rules.length) {
            css += `\n\n@media (min-width: ${RESPONSIVE_MAP[key]}px) {\n\t${rules.join('\n\t')}\n}`;
        }
    }

    return isDev ? css : css.replace(/\s/g, '');
}

function debug(cls, rawCls, prefix, value, props, isNegative, isImportant, prefixKey, isStatic, isSpecialValue) {
    console.log(`Debug:\n\nClassName: ${cls}\nRawClass: ${rawCls}\nPrefix: ${prefix}\nValue: ${value}\nProps: ${props}\nIsNegative: ${isNegative}\nIsImportant: ${isImportant}\nPrefixKey: ${prefixKey}\nIsStatic: ${isStatic}\nIsSpecialValue: ${isSpecialValue}\n\n`)
}
