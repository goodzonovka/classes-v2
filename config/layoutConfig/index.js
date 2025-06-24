const {display} = require("./display.js");
const {position} = require("./position.js");
const {overflow} = require("./overflow.js");
const {columns} = require("./columns.js");
const {objectFit} = require("./objectFit.js");
const {objectPosition} = require("./objectPosition.js");
const {offset} = require("./offset.js");
const {zIndex} = require("./zIndex.js");
const {visibility} = require("./visibility.js");
const {aspectRatio} = require("./aspectRatio.js");

const layoutConfig = {
    ...display,
    ...position,
    ...overflow,
    ...columns,
    ...objectFit,
    ...objectPosition,
    ...offset,
    ...zIndex,
    ...visibility,
    ...aspectRatio,
};


module.exports = {layoutConfig}
