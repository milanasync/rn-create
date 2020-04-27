const chalk = require("chalk");

const { exec } = require("child_process");
const runShellCommand = (command, callback, dataToCarryForward = true) => {
  let msg = chalk.green.bold("Running command ... \n");
  msg += chalk.yellow.bold(command);
  console.log(msg);
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(`${error.message}`);
      callback(false);
    }
    if (stderr) {
      console.log(`${stderr}`);
      callback(false);
    }
    console.log(`${stdout}`);
    callback(dataToCarryForward);
  });
};

module.exports = runShellCommand;
