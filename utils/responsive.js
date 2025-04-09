export const RESPONSIVE_MAP = {
    sm: 587,
    md: 768,
    lg: 993,
    xl: 1200,
};

export const responsivePrefixes = Object.keys(RESPONSIVE_MAP);

export const responsiveRules = Object.fromEntries(
    responsivePrefixes.map(key => [key, []])
);