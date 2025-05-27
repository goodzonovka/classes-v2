const {spacingConfig} = require("./spacingConfig");
const {textConfig} = require("./textConfig");
const {flexConfig} = require("./flexConfig");
const {position} = require("./position.js");
const {display} = require("./display.js");
const {size} = require("./size.js");
const {cursor} = require("./cursor.js");
const {zIndex} = require("./zIndex.js");
const {overflow} = require("./overflow.js");
const {objectFit} = require("./objectFit.js");
const {borderConfig} = require("./borderConfig");
const {gridConfig} = require("./gridConfig");
const {other} = require("./other.js");
const {transformConfig} = require("./transformConfig");
const {opacity} = require("./opacity.js");
const {backgroundConfig} = require("./backgroundConfig");

const config = {
    ...spacingConfig,
    ...textConfig,
    ...flexConfig,
    ...position,
    ...gridConfig,
    ...display,
    ...size,
    ...cursor,
    ...backgroundConfig,
    ...zIndex,
    ...overflow,
    ...objectFit,
    ...borderConfig,
    ...transformConfig,
    ...other,
    ...opacity,
};


module.exports = config
