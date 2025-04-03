export const extractMatchingClasses = (elements, configMap, isDev) => {
    const classSet = new Set();
    const responsivePrefixes = ['sm', 'md', 'lg', 'xl'];

    elements.forEach(el => {
        el.classList.forEach(cls => {
            let target = cls;

            if (cls.includes(':')) {
                const [prefix, actualClass] = cls.split(':');
                if (responsivePrefixes.includes(prefix)) {
                    target = actualClass;
                }
            }

            for (const prefix in configMap) {
                const isMatch = target.startsWith(prefix) || target.startsWith(`-${prefix}`);

                isMatch && classSet.add(cls);
            }
        });
    })

    isDev && console.log(classSet)

    return classSet;
}