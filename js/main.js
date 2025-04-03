import {config} from "./config";
import {extractMatchingClasses} from "./utils/extractClasses.js";
import {generateCssFromClasses} from "./utils/generateCss.js";

(function () {
    const isDev = true
    const elements = document.querySelectorAll('[class]');
    const classSet = extractMatchingClasses(elements, config, isDev);
    const css = generateCssFromClasses(classSet, config, isDev);

    if (css) {
        const styleTag = document.createElement('style');
        styleTag.textContent = css;
        document.head.appendChild(styleTag);
    }
})();