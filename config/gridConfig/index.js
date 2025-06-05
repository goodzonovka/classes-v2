const {templateColumns} = require("./templateColumns.js");
const {templateRows} = require("./templateRows.js");
const {gridColumnStartEnd} = require("./gridColumnStartEnd.js");
const {placeItems} = require("./placeItems.js");

const gridConfig = {
    ...templateColumns,
    ...templateRows,
    ...gridColumnStartEnd,
    ...placeItems,
}

module.exports = { gridConfig };
