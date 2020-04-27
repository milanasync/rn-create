const errorInstance = require("../instances/error");
const componentFileCreator = require("../file-creator/component");
const screenFileCreator = require("../file-creator/screen");
const navigationFileCreator = require("../file-creator/navigations");
const reduxCreator = require("../file-creator/redux");
const apiCreator = require("../file-creator/api");
const Constants = require("../config/constants.config");
const generator = Constants.generator;

const isNameValid = name => {
  if(typeof name != 'string') return false;
  return !name.includes("-");
};

const generateComponent = options => {
  let componentName = options._[0];
  if (!isNameValid(componentName)) {
    errorInstance.showError(Constants.errors.invalidName);
    return false;
  }

  componentFileCreator.createComponent(
    componentName,
    options.stateless,
    options.redux
  );
};

const generateScreen = options => {
  let screenName = options._[0];
  if (!isNameValid(screenName)) {
    errorInstance.showError(Constants.errors.invalidName);
    return false;
  }
  screenFileCreator.createScreen(screenName, options.stateless, options.redux, options.saga);
};

const generateNavigation = options => {
  let name = options._[0];
  if (!isNameValid(name)) {
    errorInstance.showError(Constants.errors.invalidName);
    return false;
  }
  
  navigationFileCreator.createNavigation(options);
};

const generateRedux = options => {
  reduxCreator.createRedux(options);
};

const generateApi = options => {
  apiCreator.createApi(options);
};

const generateReduxAction = options => {
  let screenName = options._[0];
  if (!isNameValid(screenName)) {
    errorInstance.showError(Constants.errors.invalidName);
    return false;
  }
  screenFileCreator.createActionsOfScreen(screenName);
};

const generateReduxReducer = options => {
  let screenName = options._[0];
  if (!isNameValid(screenName)) {
    errorInstance.showError(Constants.errors.invalidName);
    return false;
  }
  screenFileCreator.createReducerOfScreen(screenName);
};

const generateReduxActionReducer = options => {
  let screenName = options._[0];
  if (!isNameValid(screenName)) {
    errorInstance.showError(Constants.errors.invalidName);
    return false;
  }
  screenFileCreator.createActionsOfScreen(screenName);
  screenFileCreator.createReducerOfScreen(screenName);
};

const generate = options => {
  if (options.g != "" && options.g != undefined) {
    let generatorName = options.g;
    switch (generatorName) {
      case "component":
        generateComponent(options);
        break;
      case "screen":
        generateScreen(options);
        break;
      case "navigation":
        generateNavigation(options);
        break;
      case "redux":
        generateRedux(options);
        break;
      case "api":
        generateApi(options);
        break;
      case "redux-action":
        generateReduxAction(options);
        break;
      case "redux-reducer":
        generateReduxReducer(options);
        break;
      case "redux-action-reducer":
        generateReduxActionReducer(options);
        break;
      default:
        errorInstance.showError(
          "Only Supported fields are as below.\n" + generator.join("\n")
        );
        break;
    }
  } else {
    errorInstance.showError(
      "Name of the file is required and should be string and must be either of following.\n" +
        generator.join("\n")
    );
  }
};

module.exports = {
  generate
};
