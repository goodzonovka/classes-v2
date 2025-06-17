const {margin} = require("./margin.js");
const {padding} = require("./padding.js");
const {spaceBetween} = require("./spaceBetween.js");

const spacingConfig = {
  ...margin,
  ...padding,
  ...spaceBetween,
}

module.exports = { spacingConfig };
