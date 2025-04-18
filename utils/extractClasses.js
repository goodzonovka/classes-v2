import {responsivePrefixes} from "./responsive.js";

export const extractMatchingClasses = (elements, configMap, isDev) => {
    const classSet = new Set();

    elements.forEach(el => {
        el.classList.forEach(className => {
            const isClassParts = className.includes(':');

            let [prefixKey, rawClass] = isClassParts ? className.split(':') : [null, className]

            const isResponsiveValid = responsivePrefixes.includes(prefixKey);

            if (isClassParts && !isResponsiveValid) return;

            rawClass = rawClass.startsWith('!') ? rawClass.slice(1) : rawClass;

            for (const prefix in configMap) {
                const isMatch = rawClass.startsWith(prefix) || rawClass.startsWith(`-${prefix}`);

                if (isMatch) {
                    classSet.add(className);
                    break;
                }
            }
        });
    })

    isDev && console.log(classSet)

    return classSet;
}