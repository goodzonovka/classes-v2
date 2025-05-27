const {margin} = require("./margin.js");
const {padding} = require("./padding.js");
const {offset} = require("./offset.js");
const {spaceBetween} = require("./spaceBetween.js");

const spacingConfig = {
  ...margin,
  ...padding,
  ...offset,
  ...spaceBetween,
}

module.exports = { spacingConfig };
