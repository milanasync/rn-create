const chalk = require("chalk");
const boxen = require("boxen");

const chalkConfig = require("../config/chalk.config");
const installConfig = require("../config/install.config");

const showMsg = _ => {
  let welcomeMsg = chalk.white.bold(installConfig.welcome);
  const msgBox = boxen(welcomeMsg, chalkConfig.boxenOptions);
  console.log(msgBox);
};

module.exports = {
  showMsg
};
