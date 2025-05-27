const {rotate} = require("./rotate.js");
const {translate} = require("./translate.js");

const transformConfig = {
    ...rotate,
    ...translate,
}

module.exports = { transformConfig };
