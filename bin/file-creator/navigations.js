var currentDir = process.cwd();

const errorInstance = require("../instances/error");
const Constants = require("../config/constants.config");
const fileUtils = require("./file.utils");
const commandShell = require("../config/shell.config");
const reactNavigationIndexTemplate = require("./templates/ReactNavigationIndex");
let reactNavigationStackTemplate = require("./templates/ReactNavigationStack");
let reactNavigationDrawerTemplate = require("./templates/ReactNavigationDrawer");
let reactNavigationBottomTabsTemplate = require("./templates/ReactNavigationBottomTabs");
let reactNavigationMaterialBottomTabs = require("./templates/ReactNavigationMaterialBottomTabs");
let reactNavigationMaterialTopTabs = require("./templates/ReactNavigationMaterialTopTabs");

const reduxReactNavigationIndexTemplate = require("./templates/redux-navigation/ReduxReactNavigationIndex");
let reduxReactNavigationStackTemplate = require("./templates/redux-navigation/ReduxReactNavigationStack");
let reduxReactNavigationDrawerTemplate = require("./templates/redux-navigation/ReduxReactNavigationDrawer");
let reduxReactNavigationBottomTabsTemplate = require("./templates/redux-navigation/ReduxReactNavigationBottomTabs");
let reduxReactNavigationMaterialBottomTabs = require("./templates/redux-navigation/ReduxReactNavigationMaterialBottomTabs");
let reduxReactNavigationMaterialTopTabs = require("./templates/redux-navigation/ReduxReactNavigationMaterialTopTabs");

let appTemplate = require("./templates/AppTemplate");
let appReduxTemplate = require("./templates/AppReduxTemplate");

var options = {};

afterInstallReactNavigation = dataToCarryForward => {
  let command = Constants.reactNavigationCmd.dependency;
  if (
    fileUtils.checkDependencyInstall(Constants.reactNavigationLib.reactNativeReAnimated) &&
    fileUtils.checkDependencyInstall(Constants.reactNavigationLib.gestureHandle) &&
    fileUtils.checkDependencyInstall(Constants.reactNavigationLib.reactNativeScreens) &&
    fileUtils.checkDependencyInstall(Constants.reactNavigationLib.reactNativeSafeAreaContext) &&
    fileUtils.checkDependencyInstall(Constants.reactNavigationLib.reactNativeMaskedView)
  ) {
    afterInstallReactNavigationDependency(dataToCarryForward);
  } else {
    if (dataToCarryForward) {
      commandShell(
        command,
        afterInstallReactNavigationDependency,
        dataToCarryForward
      );
    }
  }

};

afterInstallReactNavigationDependency = dataToCarryForward => {
  if (dataToCarryForward) {
    createNavigationIndex(dataToCarryForward);
  }
};

createNavigationIndex = dataToCarryForward => {
  if(dataToCarryForward.redux) {
    fileUtils.createfile(
      `${Constants.navDir}/index.js`,
      reduxReactNavigationIndexTemplate
    );
  } else {
    fileUtils.createfile(
      `${Constants.navDir}/index.js`,
      reactNavigationIndexTemplate
    );
  }

  // update app.js file if indicated in options
  if(dataToCarryForward.updateRootFile) {
    if(dataToCarryForward.redux) {      
      fileUtils.updateFile(`${currentDir}/App.js`, appReduxTemplate);
    } else {
      fileUtils.updateFile(`${currentDir}/App.js`, appTemplate);
    }
  }
  
  if (dataToCarryForward.type === "stack") {
    let commandStack = Constants.reactNavigationCmd.stack;

    if (fileUtils.checkDependencyInstall(Constants.reactNavigationLib.stack)) {
      createDipDirectory(dataToCarryForward);
    } else {
      commandShell(commandStack, createDipDirectory, dataToCarryForward);
    }
  }

  if (dataToCarryForward.type === "drawer") {
    let commandDrawer = Constants.reactNavigationCmd.drawer;

    if (fileUtils.checkDependencyInstall(Constants.reactNavigationLib.drawer)) {
      createDipDirectory(dataToCarryForward);
    } else {
      commandShell(commandDrawer, createDipDirectory, dataToCarryForward);
    }
  }

  if (dataToCarryForward.type === "bottomTabs") {
    let commandDrawer = Constants.reactNavigationCmd.bottomTabs;

    if (fileUtils.checkDependencyInstall(Constants.reactNavigationLib.bottomTabs)) {
      createDipDirectory(dataToCarryForward);
    } else {
      commandShell(commandDrawer, createDipDirectory, dataToCarryForward);
    } 
  }

  if (dataToCarryForward.type === "materialBottomTabs") {
    let commandDrawer = Constants.reactNavigationCmd.materialBottomTabs;
    if (
      fileUtils.checkDependencyInstall(Constants.reactNavigationLib.materialBottomTabs) &&
      fileUtils.checkDependencyInstall(Constants.reactNavigationLib.materialBottomTabsReactNativePaper)
    ) {
      createDipDirectory(dataToCarryForward);
    } else {
      commandShell(commandDrawer, createDipDirectory, dataToCarryForward);
    }
  }

  if (dataToCarryForward.type === "materialTopTabs") {
    let commandDrawer = Constants.reactNavigationCmd.materialTopTabs;

    if (
      fileUtils.checkDependencyInstall(Constants.reactNavigationLib.materialTopTabs) &&
      fileUtils.checkDependencyInstall(Constants.reactNavigationLib.materialTopTabsReactNativeTabView)
    ) {
      createDipDirectory(dataToCarryForward);
    } else {
      commandShell(commandDrawer, createDipDirectory, dataToCarryForward);
    }
  }
};

createDipDirectory = dataToCarryForward => {
  if (dataToCarryForward) {
    let deepDirectory = [];
    let dir = dataToCarryForward._[0] != undefined ? dataToCarryForward._[0] : "Navigation";

    deepDirectory = dir.split("/");

    if (deepDirectory.length > 1) {
      let tempPath = `${Constants.navDir}`;
      let lastIndexToConsider = deepDirectory.length - 1;

      for (i in deepDirectory) {
        if (i != lastIndexToConsider) {
          tempPath += `/${deepDirectory[i]}`;
          fileUtils.createDir(tempPath);
        }
      }
    }

    let data = "";

    if (dataToCarryForward.type === "stack") {
      if(dataToCarryForward.redux) {
        data = reduxReactNavigationStackTemplate.replace(
          /-STACK_NAME-/g,
          dir.replace(/\//g, "")
        );
      } else {
        data = reactNavigationStackTemplate.replace(
          /-STACK_NAME-/g,
          dir.replace(/\//g, "")
        );
      }
    }

    if (dataToCarryForward.type === "drawer") {
      if(dataToCarryForward.redux) {
        data = reduxReactNavigationDrawerTemplate.replace(
          /-DRAWER_NAME-/g,
          dir.replace(/\//g, "")
        );
      } else {
        data = reactNavigationDrawerTemplate.replace(
          /-DRAWER_NAME-/g,
          dir.replace(/\//g, "")
        );
      }
    }

    if (dataToCarryForward.type === "bottomTabs") {
      if(dataToCarryForward.redux) {
        data = reduxReactNavigationBottomTabsTemplate.replace(
          /-BOTTOM_TAB_NAME-/g,
          dir.replace(/\//g, "")
        );
      } else {
        data = reactNavigationBottomTabsTemplate.replace(
          /-BOTTOM_TAB_NAME-/g,
          dir.replace(/\//g, "")
        );
      }
    }

    if (dataToCarryForward.type === "materialBottomTabs") {
      if(dataToCarryForward.redux) {
        data = reduxReactNavigationMaterialBottomTabs.replace(
          /-BOTTOM_TAB_NAME-/g,
          dir.replace(/\//g, "")
        );
      } else {
        data = reactNavigationMaterialBottomTabs.replace(
          /-BOTTOM_TAB_NAME-/g,
          dir.replace(/\//g, "")
        );
      }
    }

    if (dataToCarryForward.type === "materialTopTabs") {
      if(dataToCarryForward.redux) {
        data = reduxReactNavigationMaterialTopTabs.replace(
          /-TOP_TAB_NAME-/g,
          dir.replace(/\//g, "")
        );
      } else {
        data = reactNavigationMaterialTopTabs.replace(
          /-TOP_TAB_NAME-/g,
          dir.replace(/\//g, "")
        );
      }
    }

    fileUtils.createfile(`${Constants.navDir}/${dir}.js`, data);
  }
};

createNavigation = options => {
  fileUtils.checkOrMakeSrc();
  fileUtils.checkOrMakeNavigationsDir();
  let command = Constants.reactNavigationCmd.main;
  try {
    if (!fileUtils.checkDependencyInstall(Constants.reactNavigationLib.main)) {
      commandShell(command, afterInstallReactNavigation, options);
    } else {
      afterInstallReactNavigation(options);
    }
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = {
  createNavigation
};
