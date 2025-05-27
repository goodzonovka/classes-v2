const {templateColumns} = require("./templateColumns.js");
const {gridColumnStartEnd} = require("./gridColumnStartEnd.js");
const {justifyItems} = require("./justifyItems.js");

const gridConfig = {
    ...templateColumns,
    ...gridColumnStartEnd,
    ...justifyItems,
}

module.exports = { gridConfig };
