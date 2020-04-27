const chalk = require("chalk");
const boxen = require("boxen");

const chalkConfig = require("../config/chalk.config");

const showError = error => {
  let errorMsg = chalk.red.bold(error);
  const erroBox = boxen(errorMsg, chalkConfig.boxenOptionsError);
  console.log(erroBox);
};

module.exports = {
  showError
};