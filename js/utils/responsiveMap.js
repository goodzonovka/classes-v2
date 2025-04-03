export const responsiveMap = {
    sm: 587,
    md: 768,
    lg: 993,
    xl: 1200,
}

export const responsivePrefixes = Object.keys(responsiveMap);

export const responsiveRules = Object.fromEntries(
    responsivePrefixes.map(key => [key, []])
);