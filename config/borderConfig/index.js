const {borderSpacing} = require("./borderSpacing.js");
const {borderWidth} = require("./borderWidth.js");
const {borderStyle} = require("./borderStyle.js");
const {borderRadius} = require("./borderRadius.js");
const {divideWidth} = require("./divideWidth.js");
const {divideColor} = require("./divideColor.js");

const borderConfig = {
    ...divideWidth,
    ...divideColor,
    ...borderSpacing,
    ...borderStyle,
    ...borderWidth,
    ...borderRadius,
}

module.exports = { borderConfig };
