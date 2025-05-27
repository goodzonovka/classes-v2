const {direction} = require("./direction.js");
const {gap} = require("./gap.js");
const {grow} = require("./grow.js");
const {shrink} = require("./shrink.js");
const {justifyContent} = require("./justifyContent.js");
const {alignItems} = require("./alignItems.js");
const {alignSelf} = require("./alignSelf.js");
const {alignContent} = require("./alignContent.js");
const {wrap} = require("./wrap.js");
const {order} = require("./order.js");
const {flex} = require("./flex.js");

const flexConfig = {
  ...direction,
  ...gap,
  ...grow,
  ...shrink,
  ...justifyContent,
  ...alignItems,
  ...alignSelf,
  ...alignContent,
  ...wrap,
  ...order,
  ...flex,
};

module.exports = {flexConfig}
