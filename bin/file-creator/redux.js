var currentDir = process.cwd();
const errorInstance = require("../instances/error");
const Constants = require("../config/constants.config");
const commandShell = require("../config/shell.config");
const fileUtils = require("./file.utils");
const storeTemplateFile = require("./templates/redux/storeTemplate");
const reducerListFile = require("./templates/redux/reducerList");
const reducerIndexFile = require("./templates/redux/reducerIndex");
const actionsIndexFile = require("./templates/redux/actionsIndex");
const appReducerFile = require("./templates/redux/appReducer");
const appActionFile = require("./templates/redux/appActions");

const AppReduxTemplate = require("./templates/AppReduxTemplate");
const sagaIndexFileTemplate = require("./templates/redux/saga/IndexFile");
const sagaCheckTemplate = require("./templates/redux/saga/SagaCheck");
const sagaListTemplate = require("./templates/redux/saga/sagaList");

createRedux = options => {
  if (
    fileUtils.checkDependencyInstall(Constants.reduxLib.redux) &&
    fileUtils.checkDependencyInstall(Constants.reduxLib.reactRedux)
  ) {
    if (
      options.saga &&
      !fileUtils.checkDependencyInstall(Constants.reduxLib.reduxSaga)
    ) {
      commandShell(
        Constants.reduxCmd.reduxWithSaga,
        afterInstallRedux,
        options
      );
    } else {
      afterInstallRedux(options);
    }
  } else {
    commandShell(
      Constants.reduxCmd.redux,
      afterInstallRedux,
      options
    );
  }
};

const afterInstallRedux = options => {
  if (options) {
    fileUtils.checkOrMakeReduxDir();
    fileUtils.checkOrMakeReduxReducersDir();
    fileUtils.checkOrMakeReduxActionsDir();
    let storeTemplate = storeTemplateFile;
    // integrate saga in app
    if (options.saga) {
      storeTemplate = storeTemplate.replace(
        "//SAGA_IMPORT_FACTORY_CLASS",
        `import createSagaMiddleware from 'redux-saga'`
      );
      storeTemplate = storeTemplate.replace(
        "//IMPORT_APPLICATION_SAGA",
        `import AppSaga from './saga'`
      );
      storeTemplate = storeTemplate.replace(
        "//CREATE_MIDDLEWARE",
        `const sagaMiddleware = createSagaMiddleware()`
      );
      storeTemplate = storeTemplate.replace(
        "//APPLY_MIDDLEWARE",
        `applyMiddleware(sagaMiddleware)`
      );
      storeTemplate = storeTemplate.replace(
        "//RUN_SAGA",
        `sagaMiddleware.run(AppSaga)`
      );
      fileUtils.checkOrMakeSagaIndex(sagaIndexFileTemplate);

      fileUtils.checkOrCreateSagaListDir();
      fileUtils.checkOrMakeSagaListIndexFile(sagaListTemplate);
      fileUtils.checkOrMakeSagaCheckFile(sagaCheckTemplate);
    }
    fileUtils.checkOrMakeStoreFile(storeTemplate);

    fileUtils.checkOrMakeReducersListFile(reducerListFile);
    fileUtils.checkOrMakeReducersIndexFile(reducerIndexFile);
    fileUtils.checkOrMakeActionsIndexFile(actionsIndexFile);

    fileUtils.checkOrMakeReduxAppDir();

    let appReducerTemplate = appReducerFile;
    fileUtils.checkOrMakeReduxAppReducers(appReducerTemplate);

    fileUtils.checkOrMakeReduxActionApp();

    let appActionFileTemplate = appActionFile;
    fileUtils.checkOrMakeReduxActionAppFile(appActionFileTemplate);

    // update app.js file if indicated in options
    if (options.updateRootFile) {
      fileUtils.updateFile(`${currentDir}/App.js`, AppReduxTemplate);
    }
  }
};
module.exports = {
  createRedux
};
