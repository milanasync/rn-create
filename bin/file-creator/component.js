const errorInstance = require("../instances/error");
const Constants = require("../config/constants.config");
const fileUtils = require("./file.utils");

let componentTemplate = require("./templates/Component");
let StateLessComponentTemplate = require("./templates/StateLessComponent");
let reduxComponentTemplate = require('./templates/ReduxComponent');
let reduxStateLessComponent = require('./templates/ReduxStateLessComponent');

createComponent = (componentName, stateLess = false, redux = false) => {
  if (componentName === undefined || componentName === "") {
    errorInstance.showError(Constants.errors.nameRequired);
    return false;
  }
  fileUtils.checkOrMakeSrc();
  fileUtils.checkOrMakeComponentsDir();

  let deepDirectory = componentName.split("/");

  if (deepDirectory.length > 1) {
    let tempPath = `${Constants.componentDir}`;
    let lastIndexToConsider = deepDirectory.length - 1;

    for (i in deepDirectory) {
      if (i != lastIndexToConsider) {
        tempPath += `${deepDirectory[i]}`;
        fileUtils.createDir(tempPath);
      }
    }
  }

  if (!fileUtils.checkComponentFileExist(componentName)) {
    const componentPath = `${Constants.componentDir}/${componentName}.js`;
    let data = "";
    if (stateLess) {      
      if(redux) {
        data = reduxStateLessComponent.replace(
          /-COMPONENT_NAME-/g,
          componentName.replace(/\//g, "")
        );
      } else {
        data = StateLessComponentTemplate.replace(
          /-COMPONENT_NAME-/g,
          componentName.replace(/\//g, "")
        );
      }
    } else {
      if(redux) {
        data = reduxComponentTemplate.replace(
          /-COMPONENT_NAME-/g,
          componentName.replace(/\//g, "")
        );
      } else {
        data = componentTemplate.replace(
          /-COMPONENT_NAME-/g,
          componentName.replace(/\//g, "")
        );
      }
    }

    fileUtils.createfile(componentPath, data);
  } else {
    errorInstance.showError(componentName + ': ' + Constants.errors.componentExist);
    return false;
  }
};
module.exports = {
  createComponent
};
