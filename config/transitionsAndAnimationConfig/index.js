const {transitionProperty} = require("./transitionProperty.js");
const {transitionDuration} = require("./transitionDuration.js");

const transitionsAndAnimationConfig = {
  ...transitionProperty,
  ...transitionDuration,
};

module.exports = {transitionsAndAnimationConfig}
