const {borderCollapse} = require("./borderCollapse.js");
const {tableLayout} = require("./tableLayout.js");

const tableConfig = {
  ...borderCollapse,
  ...tableLayout,
}

module.exports = { tableConfig };
