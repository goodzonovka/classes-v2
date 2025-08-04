const {tableConfig} = require("./tableConfig");
const {layoutConfig} = require("./layoutConfig");
const {spacingConfig} = require("./spacingConfig");
const {typographyConfig} = require("./typographyConfig");
const {flexConfig} = require("./flexConfig");
const {size} = require("./size.js");
const {borderConfig} = require("./borderConfig");
const {gridConfig} = require("./gridConfig");
const {other} = require("./other.js");
const {transformConfig} = require("./transformConfig");
const {backgroundConfig} = require("./backgroundConfig");
const {interactivityConfig} = require("./interactivityConfig");
const {effectsConfig} = require("./effectsConfig");
const {filterConfig} = require("./filterConfig");
const {transitionsAndAnimationConfig} = require("./transitionsAndAnimationConfig");

const config = {
    ...tableConfig,
    ...gridConfig,
    ...flexConfig,
    ...layoutConfig,
    ...spacingConfig,
    ...typographyConfig,
    ...size,
    ...backgroundConfig,
    ...borderConfig,
    ...transformConfig,
    ...interactivityConfig,
    ...effectsConfig,
    ...filterConfig,
    ...transitionsAndAnimationConfig,
    ...other,
};


module.exports = config
