const {color} = require("./color.js");
const {fontSize} = require("./fontSize.js");
const {fontWeight} = require("./fontWeight.js");
const {fontStyle} = require("./fontStyle.js");
const {lineHeight} = require("./lineHeight.js");
const {textAlign} = require("./textAlign.js");
const {whiteSpace} = require("./whiteSpace.js");
const {userSelect} = require("./userSelect.js");
const {letterSpacing} = require("./letterSpacing.js");
const {textTransform} = require("./textTransform.js");
const {textDecoration} = require("./textDecoration.js");
const {textOverflow} = require("./textOverflow.js");

const textConfig = {
  ...fontWeight,
  ...fontStyle,
  ...fontSize,
  ...lineHeight,
  ...textAlign,
  ...whiteSpace,
  ...userSelect,
  ...color,
  ...letterSpacing,
  ...textTransform,
  ...textDecoration,
  ...textOverflow,
};

module.exports = {textConfig}
