const chalk = require("chalk");

var fs = require("fs");
var path = require("path");
var currentDir = process.cwd();

const errorInstance = require("../instances/error");
const Constants = require("../config/constants.config");

createDir = (dir, showError = false) => {
  const dirToCreate = currentDir + "/" + dir;
  if (fs.existsSync(dirToCreate)) {
    if (showError) {
      errorInstance.showError("Directory allready exists.");
    }
    return false;
  } else {
    fs.mkdirSync(dirToCreate);

    let msg = chalk.green.bold("Created ");
    msg += chalk.white.bold(dir);
    console.log(msg);

    return true;
  }
};

createfile = (file, data, showError = false, update = false) => {
  if (fs.existsSync(file)) {
    if (update) {
      fs.writeFileSync(file, data);
      let msg = chalk.green.bold("Updated ");
      msg += chalk.white.bold(file);
      console.log(msg);

      return true;
    }

    if (showError) {
      errorInstance.showError("File allready exists.");
    }
    return false;
  } else {
    fs.writeFileSync(file, data);
    let msg = chalk.green.bold("Created ");
    msg += chalk.white.bold(file);
    console.log(msg);

    return true;
  }
};

appendFile = (file, data = "") => {
  fs.appendFileSync(file, data);
  let msg = chalk.green.bold("Updated ");
  msg += chalk.white.bold(file);
  console.log(msg);
};

checkOrMakeSrc = () => createDir(Constants.srcDir);
checkOrMakeComponentsDir = () => createDir(Constants.componentDir);
checkOrMakeScreensDir = () => createDir(Constants.screenDir);
checkOrMakeNavigationsDir = () => createDir(Constants.navDir);

checkComponentFileExist = componentName =>
  fs.existsSync(Constants.componentDir + componentName + ".js");

checkScreenFileExist = screenName =>
  fs.existsSync(Constants.screenDir + screenName + ".js");

readFile = file => fs.readFileSync(file, "utf8");

updateFile = (file, data) => createfile(file, data, false, true);

checkDependencyInstall = depenedencyName => {
  let packageJsonData = readFile(`${currentDir}/package.json`);
  packageJsonData = JSON.parse(packageJsonData);
  let dependency = packageJsonData.dependencies;
  return dependency[depenedencyName] !== undefined;
};

// redux files
checkOrMakeReduxDir = () => createDir(Constants.reduxDir);
checkOrMakeReduxReducersDir = () => createDir(Constants.reduxReducersDir);
checkOrMakeReduxActionsDir = () => createDir(Constants.reduxActionsDir);
checkOrMakeStoreFile = data =>
  createfile(`${Constants.reduxDir}/store.js`, data);

checkOrMakeReducersIndexFile = data =>
  createfile(`${Constants.reduxReducersDir}/index.js`, data);

checkOrMakeReducersListFile = data =>
  createfile(`${Constants.reduxReducersDir}/reducerList.js`, data);

appendReducersListFile = data =>
  appendFile(`${Constants.reduxReducersDir}/reducerList.js`, data);

// app reducers
checkOrMakeReduxAppDir = () => createDir(`${Constants.reduxReducersDir}/app`);
checkOrMakeReduxAppReducers = data =>
  createfile(`${Constants.reduxReducersDir}/app/appReducers.js`, data);

checkOrMakeActionsIndexFile = data =>
  createfile(`${Constants.reduxActionsDir}/index.js`, data);

appendActionIndexFile = data =>
  appendFile(`${Constants.reduxActionsDir}/index.js`, data);

// app actions
checkOrMakeReduxActionApp = () => createDir(`${Constants.reduxActionsDir}/app`);
checkOrMakeReduxActionAppFile = data =>
  createfile(`${Constants.reduxActionsDir}/app/appActions.js`, data);

// api
checkOrCreateAPIDir = () => createDir(Constants.apiDir);
checkOrCreateGetFile = (data = "") =>
  createfile(`${Constants.apiDir}/get.js`, data);
checkOrCreatePostFile = (data = "") =>
  createfile(`${Constants.apiDir}/post.js`, data);
checkOrCreatePutFile = (data = "") =>
  createfile(`${Constants.apiDir}/put.js`, data);
checkOrCreateDeleteFile = (data = "") =>
  createfile(`${Constants.apiDir}/delete.js`, data);
checkOrCreateHelperFile = (data = "") =>
  createfile(`${Constants.apiDir}/helper.js`, data);
checkOrCreateEndpointsFile = (data = "") =>
  appendFile(`${Constants.apiDir}/index.js`, data);

// saga
checkOrMakeSagaIndex = data => {
  createfile(`${Constants.reduxDir}/saga.js`, data);
};

checkOrCreateSagaListDir = _ => {
  createDir(`${Constants.reduxSagaList}`);
}

checkOrMakeSagaListIndexFile = data => {
  createfile(`${Constants.reduxSagaList}/index.js`, data);
};

checkOrMakeSagaCheckFile = data => {
  createfile(`${Constants.reduxSagaList}/SagaCheck.js`, data);
};

module.exports = {
  currentDir,
  createDir,
  checkOrMakeSrc,
  checkOrMakeComponentsDir,
  checkComponentFileExist,
  createfile,
  updateFile,

  checkOrMakeScreensDir,
  checkScreenFileExist,

  checkOrMakeNavigationsDir,

  readFile,
  checkDependencyInstall,

  checkOrMakeReduxDir,
  checkOrMakeReduxReducersDir,
  checkOrMakeReduxActionsDir,

  checkOrMakeStoreFile,
  checkOrMakeReducersIndexFile,
  checkOrMakeActionsIndexFile,

  checkOrMakeReduxAppDir,
  checkOrMakeReduxAppReducers,

  checkOrMakeReduxActionApp,
  checkOrMakeReduxActionAppFile,

  checkOrCreateAPIDir,
  checkOrCreateGetFile,
  checkOrCreatePostFile,
  checkOrCreatePutFile,
  checkOrCreateDeleteFile,
  checkOrCreateHelperFile,
  checkOrCreateEndpointsFile,

  checkOrMakeReducersListFile,
  appendReducersListFile,
  appendActionIndexFile,

  checkOrMakeSagaIndex,
  checkOrCreateSagaListDir,
  checkOrMakeSagaCheckFile,
  checkOrMakeSagaListIndexFile,

  appendFile
};
