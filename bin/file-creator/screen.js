const errorInstance = require("../instances/error");
const Constants = require("../config/constants.config");
const fileUtils = require("./file.utils");
let componentTemplate = require("./templates/Component");
let StateLessComponentTemplate = require("./templates/StateLessComponent");

let reduxComponentTemplate = require("./templates/ReduxComponent");
let reduxStateLessComponent = require("./templates/ReduxStateLessComponent");
let crudReducerTemplate = require("./templates/redux/crudReducers");
let crudActionsTemplate = require("./templates/redux/crudActions");

// create redux dir if not create
const reduxHelper = require("./redux");

const createDeepDir = (screenName, baseDir = `${Constants.screenDir}`) => {
  let deepDirectory = screenName.split("/");

  if (deepDirectory.length > 1) {
    let tempPath = baseDir;
    let lastIndexToConsider = deepDirectory.length - 1;

    for (i in deepDirectory) {
      if (i != lastIndexToConsider) {
        tempPath += `/${deepDirectory[i]}`;
        fileUtils.createDir(tempPath);
      }
    }
    return lastIndexToConsider;
  }

  return 0;
};

createScreen = (screenName, stateLess = false, redux = false, saga = false) => {
  if (screenName === undefined || screenName === "") {
    errorInstance.showError(Constants.errors.nameRequired);
    return false;
  }
  fileUtils.checkOrMakeSrc();
  fileUtils.checkOrMakeScreensDir();

  let deepDirectoryLength = createDeepDir(screenName);

  let directoryPrefix = "../";
  while (deepDirectoryLength > 0) {
    directoryPrefix += "../";
    deepDirectoryLength--;
  }

  let ApplicationActionsImport = `import ApplicationActions from '${directoryPrefix}redux/actions';`;

  if (!fileUtils.checkScreenFileExist(screenName)) {
    const screenPath = `${Constants.screenDir}/${screenName}.js`;
    let className = `${screenName.replace(/\//g, "")}`;

    let data = "";
    if (stateLess) {
      if (redux) {
        data = reduxStateLessComponent.replace(
          /-COMPONENT_NAME-/g,
          screenName.replace(/\//g, "")
        );
      } else {
        data = StateLessComponentTemplate.replace(
          /-COMPONENT_NAME-/g,
          screenName.replace(/\//g, "")
        );
      }
    } else {
      if (redux) {
        data = reduxComponentTemplate.replace(
          /-COMPONENT_NAME-/g,
          screenName.replace(/\//g, "")
        );

        data = data.replace("//ACTION_IMPORT", ApplicationActionsImport);

        data = data.replace(
          "//ACTION_TO_PROPS",
          `...ApplicationActions.${className}Actions`
        );

        // create necessary actions and reducers for this screen / component
        createReducerOfScreen(screenName, saga);
        createActionsOfScreen(screenName, saga);
      } else {
        data = componentTemplate.replace(
          /-COMPONENT_NAME-/g,
          screenName.replace(/\//g, "")
        );
      }
    }

    fileUtils.createfile(screenPath, data);
  } else {
    errorInstance.showError(screenName + ": " + Constants.errors.screenExist);
    return false;
  }
};

const createReducerOfScreen = (screenName, saga = false) => {
  let className = `${screenName.replace(/\//g, "")}`;

  reduxHelper.createRedux({
    updateRootFile: true,
    saga
  });

  createDeepDir(screenName, `${Constants.reduxReducersDir}`);

  let data = crudReducerTemplate.replace(/-COMPONENT_NAME-/g, className);
  let fileCreated = fileUtils.createfile(
    `${Constants.reduxReducersDir}/${screenName}.js`,
    data
  );

  if (fileCreated) {
    fileUtils.appendReducersListFile(`import ${className}Reducers from './${screenName}';
Reducers.${className}Reducers = ${className}Reducers;
    
`);
  }
};

const createActionsOfScreen = (screenName, saga = false) => {
  let className = `${screenName.replace(/\//g, "")}`;

  reduxHelper.createRedux({
    updateRootFile: true
  });

  createDeepDir(screenName, `${Constants.reduxActionsDir}`);

  let data = crudActionsTemplate.replace(/-COMPONENT_NAME-/g, className);
  let fileCreated = fileUtils.createfile(
    `${Constants.reduxActionsDir}/${screenName}.js`,
    data
  );
  if (fileCreated) {
    fileUtils.appendActionIndexFile(`import ${className}Actions from './${screenName}';
ApplicationActions.${className}Actions = ${className}Actions;

`);
  }
};

module.exports = {
  createScreen,
  createReducerOfScreen,
  createActionsOfScreen
};
