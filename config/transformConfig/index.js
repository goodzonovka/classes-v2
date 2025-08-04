const {rotate} = require("./rotate.js");
const {translate} = require("./translate.js");
const {scale} = require("./scale.js");
const {skew} = require("./skew.js");
const {transform} = require("./transform.js");
const {transformOrigin} = require("./transformOrigin.js");

const transformConfig = {
    ...rotate,
    ...translate,
    ...scale,
    ...skew,
    ...transform,
    ...transformOrigin,
}

module.exports = { transformConfig };
