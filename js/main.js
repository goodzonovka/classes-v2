import {config} from "./config";
import {extractMatchingClasses} from "./utils/extractClasses.js";
import {generateCssFromClasses} from "./utils/generateCss.js";

(function () {
    const PROD_DOMAINS = ['tradersunion.com']
    const isDevMode = !PROD_DOMAINS.includes(location.hostname);
    const elements = document.querySelectorAll('[class]');
    const classSet = extractMatchingClasses(elements, config, isDevMode);
    const css = generateCssFromClasses(classSet, config, isDevMode);

    if (css) {
        const styleTag = document.createElement('style');
        styleTag.textContent = css;
        document.head.appendChild(styleTag);
    }
})();