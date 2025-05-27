const RESPONSIVE_MAP = {
    xs: 375,
    sm: 587,
    md: 768,
    lg: 993,
    xl: 1200,
    xxl: 1366,
    xxxl: 1440,
    xxxxl: 1600,
};

const responsivePrefixes = Object.keys(RESPONSIVE_MAP);

const responsiveRules = Object.fromEntries(
    responsivePrefixes.map(key => [key, []])
);

module.exports = {
  RESPONSIVE_MAP,
  responsivePrefixes,
  responsiveRules
};
