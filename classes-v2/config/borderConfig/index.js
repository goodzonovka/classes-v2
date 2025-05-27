const {borderWidth} = require("./borderWidth.js");
const {borderStyle} = require("./borderStyle.js");
const {borderRadius} = require("./borderRadius.js");

const borderConfig = {
    ...borderStyle,
    ...borderWidth,
    ...borderRadius,
}

module.exports = { borderConfig };
