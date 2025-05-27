const {templateColumns} = require("./templateColumns.js");
const {gridColumnStartEnd} = require("./gridColumnStartEnd.js");

const gridConfig = {
    ...templateColumns,
    ...gridColumnStartEnd,
}

module.exports = { gridConfig };
