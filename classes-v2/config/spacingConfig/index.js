const {margin} = require("./margin.js");
const {padding} = require("./padding.js");
const {offset} = require("./offset.js");

const spacingConfig = {
  ...margin,
  ...padding,
  ...offset,
/*  'mgt-': ['margin-top'],
  'mgr-': ['margin-right'],
  'mgb-': ['margin-bottom'],
  'mgl-': ['margin-left'],
  'mgy-': ['margin-top', 'margin-bottom'],
  'mgx-': ['margin-left', 'margin-right'],
  'mg-': ['margin'],
  'pt-': ['padding-top'],
  'pr-': ['padding-right'],
  'pb-': ['padding-bottom'],
  'pl-': ['padding-left'],
  'py-': ['padding-top', 'padding-bottom'],
  'px-': ['padding-left', 'padding-right'],
  'p-': ['padding'],
  'top-': ['top'],
  'right-': ['right'],
  'bottom-': ['bottom'],
  'left-': ['left'],
  'inset-': ['inset'],
  'inset-x-': ['left', 'right'],
  'inset-y-': ['top', 'bottom'],*/
}

module.exports = { spacingConfig };
