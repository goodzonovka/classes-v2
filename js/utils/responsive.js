import {RESPONSIVE_MAP} from "../config/constants.js";

export const responsivePrefixes = Object.keys(RESPONSIVE_MAP);

export const responsiveRules = Object.fromEntries(
    responsivePrefixes.map(key => [key, []])
);