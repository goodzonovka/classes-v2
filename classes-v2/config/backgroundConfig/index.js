const {background} = require("./background.js");
const {backgroundSize} = require("./backgroundSize.js");
const {backgroundRepeat} = require("./backgroundRepeat.js");

const backgroundConfig = {
    ...background,
    ...backgroundSize,
    ...backgroundRepeat,
}

module.exports = { backgroundConfig };
