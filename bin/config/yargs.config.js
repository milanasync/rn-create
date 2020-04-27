const yargs = require("yargs");

const arguments = [
  {
    name: "g",
    alias: "generate",
    describe: `
==========================================

To generate files for react native project
==========================================

component <name> [--stateless] [--redux]
==========================================

screen <name> [--stateless] [--redux]
==========================================

navigaion [--type] <stack, drawer, bottom-tabs, material-bottom-tabs, material-top-tabs> <name> [--redux]
==========================================

api <name> [--http-method](get / post / put / delete) [--base-url]<baseUrl> [--saga] [--watch] [--resolve]
==========================================

redux [--update-roor-file]
redux-action <name>
redux-reducer <name>
redux-action-reducer <name>
`,
    type: "string",
    demandOption: false
  }
];

const setArguments = () => {
  let yargsArg = yargs.usage("Usage: -n <name>");

  arguments.map(argument => {
    yargsArg.option(argument.name, {
      alias: argument.alias,
      describe: argument.describe,
      type: argument.type,
      demandOption: argument.demandOption
    });
  });
  return yargsArg.argv;
};

module.exports = {
  options: setArguments
};
