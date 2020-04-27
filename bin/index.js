#!/usr/bin/env node
const yargsConfig = require("./config/yargs.config");
const welcomeInstance = require("./instances/welcome");
const generatorInstance = require("./instances/generator");

const options = yargsConfig.options();

if (Object.keys(options).length <= 2) {
  welcomeInstance.showMsg();
} else {
    generatorInstance.generate(options);
}
