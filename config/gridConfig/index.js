const {templateColumns} = require("./templateColumns.js");
const {templateRows} = require("./templateRows.js");
const {gridColumnStartEnd} = require("./gridColumnStartEnd.js");
const {placeItems} = require("./placeItems.js");
const {justifyItems} = require("./justifyItems.js");
const {justifySelf} = require("./justifySelf.js");
const {placeContent} = require("./placeContent.js");
const {placeSelf} = require("./placeSelf.js");

const gridConfig = {
    ...templateColumns,
    ...templateRows,
    ...gridColumnStartEnd,
    ...placeItems,
    ...justifyItems,
    ...justifySelf,
    ...placeContent,
    ...placeSelf,
}

module.exports = { gridConfig };
