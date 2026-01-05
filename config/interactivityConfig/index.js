const {cursor} = require("./cursor.js");
const {pointerEvents} = require("./pointerEvents.js");

const interactivityConfig = {
  ...cursor,
  ...pointerEvents,
};

module.exports = {interactivityConfig}
