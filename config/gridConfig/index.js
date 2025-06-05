const {templateColumns} = require("./templateColumns.js");
const {templateRows} = require("./templateRows.js");
const {gridColumnStartEnd} = require("./gridColumnStartEnd.js");

const gridConfig = {
    ...templateColumns,
    ...templateRows,
    ...gridColumnStartEnd,
}

module.exports = { gridConfig };
