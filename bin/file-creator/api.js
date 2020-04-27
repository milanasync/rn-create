var currentDir = process.cwd();
const errorInstance = require("../instances/error");
const Constants = require("../config/constants.config");
const commandShell = require("../config/shell.config");
const fileUtils = require("./file.utils");

// templates
let helperFile = require("./templates/api/helper");
let getFile = require("./templates/api/get");
let postFile = require("./templates/api/post");
let putFile = require("./templates/api/put");
let deleteFile = require("./templates/api/delete");

createApi = options => {
  if (
    options.lib === "axios" &&
    !fileUtils.checkDependencyInstall(Constants.apiLib.axios)
  ) {
    commandShell(Constants.apiLibCmd.axios, afterInstallLib, options);
  } else {
    afterInstallLib(options);
  }
};

const validateArgsForSaga = options => {
  if(typeof options.watch != 'string') {
    errorInstance.showError('Please specify the action name which have to watch in the saga.')
    return false;
  }

  if(typeof options.resolve != 'string') {
    errorInstance.showError('Please specify the action name which have to resolve after api call in the saga.')
    return false;
  }
  return true;
};

const createEndPoint = options => {
  let endPoints = options._[0];
  let prefix = options.prefix != undefined ? options.prefix : "";

  if (options.saga) {
    if (!validateArgsForSaga(options)) return false;
  }

  if (endPoints != undefined) {
    let deepDirectory = [];
    let dir = endPoints;

    deepDirectory = dir.split("/");
    deepDirectory = deepDirectory.filter(d => isNaN(parseInt(d)));
    if (deepDirectory.length > 1) {
      let tempPath = `${Constants.apiDir}`;
      let lastIndexToConsider = deepDirectory.length - 1;

      for (i in deepDirectory) {
        if (i != lastIndexToConsider) {
          tempPath += `/${deepDirectory[i]}`;
          fileUtils.createDir(tempPath);
        }
      }
    }

    // create js file
    let data = getFunctionTemplate(options);
    let endPointCreated = fileUtils.createfile(
      `${Constants.apiDir}/${deepDirectory.join("/")}${prefix}.js`,
      data
    );

    if (endPointCreated) {
      // append in index file to export to app
      let functionToCall = "get";
      if (options.post) {
        functionToCall = "post";
      } else if (options.put) {
        functionToCall = "put";
      } else if (options.delete) {
        functionToCall = "deleteAPI";
      }
      let functionName = getNameOfFunctionFromEndPoint(
        deepDirectory.join("/"),
        functionToCall
      );
      let importAndExportApi = `import ${functionName}${prefix} from './${deepDirectory.join(
        "/"
      )}${prefix}';
export const ${functionName}${prefix}Call = ${functionName}${prefix};

`;
      fileUtils.checkOrCreateEndpointsFile(importAndExportApi);

      // create saga file for this api.
      if (options.saga) {
        createSagaForThisAPI(options, `${functionName}${prefix}`);
      }
    } else {
      errorInstance.showError(`File and directory for the path given in allready created in project.

for example if you have url like
https://example.com/posts and
https://example.com/posts/1

for the second instance please specify the prefix like --prefix="Details" in command.
`);
    }
  }
};

const createSagaForThisAPI = (options, functionName) => {
  let resolveAction = options.resolve;
  let watchAction = options.watch;

  let sagaContent = `import { takeEvery, call, put } from 'redux-saga/effects'
import { ${functionName}Call } from "../../api";
function* fetchData () {
  const data = yield call(${functionName}Call);
  yield yield put({ type: '${resolveAction}', data});
}

export default function* watch${functionName}() {
  yield takeEvery('${watchAction}', fetchData)
}
`;
  let fileCreated = fileUtils.createfile(
    `${Constants.reduxSagaList}/${functionName}.js`,
    sagaContent
  );

  if (fileCreated) {
    let sagaIndex = `
import ${functionName} from './${functionName}';
SagaList.push(${functionName}());
`;
    fileUtils.appendFile(`${Constants.reduxSagaList}/index.js`, sagaIndex);
  }
};

const getFunctionTemplate = options => {
  return `${getimportList(options)}

${getFunctionBody(options)}`;
};

const getNameOfFunctionFromEndPoint = (url, method) => {
  if (typeof url === "string") {
    let arr = url.split("/");
    arr = arr.filter(d => isNaN(parseInt(d)));
    let name = method;
    arr.map(a => {
      name += a.charAt(0).toUpperCase() + a.slice(1);
    });
    name = name.replace(/-/g, "");
    return name;
  }
  return `function_${new Date()}`;
};

getFunctionBody = options => {
  let endPoints = options._[0];

  let requiredParamGiven = options.requiredParams;
  requiredParamGiven =
    typeof requiredParamGiven === "string" ? requiredParamGiven.split(",") : [];

  let requiredParams = `[`;
  if (Array.isArray(requiredParamGiven)) {
    requiredParamGiven.map(requiredParam => {
      requiredParams += `'${requiredParam}', `;
    });
  }
  requiredParams += `]`;

  let functionToCall = "get";
  if (options.post) {
    functionToCall = "post";
  } else if (options.put) {
    functionToCall = "put";
  } else if (options.delete) {
    functionToCall = "deleteAPI";
  }
  let functionName = getNameOfFunctionFromEndPoint(endPoints, functionToCall);

  return `const ${functionName} = async (params = {}) => {
  return await ${functionToCall}( getBaseURL() + '${endPoints}', params);
};
export default ${functionName};`;
};

const getimportList = options => {
  let endPoints = options._[0];
  let deepDirectory = endPoints.split("/");
  deepDirectory = deepDirectory.filter(d => isNaN(parseInt(d)));
  let deepDirectoryLength = deepDirectory.length - 1;

  let directoryPrefix = "./";

  while (deepDirectoryLength > 0) {
    directoryPrefix += "../";
    deepDirectoryLength--;
  }

  let importString = `import {getBaseURL} from '${directoryPrefix}helper';`;
  if (options.post) {
    importString += `
import post from '${directoryPrefix}post';`;
  } else if (options.put) {
    importString += `
import put from '${directoryPrefix}put';`;
  } else if (options.delete) {
    importString += `
import deleteAPI from '${directoryPrefix}delete';`;
  } else {
    importString += `
import get from '${directoryPrefix}get';`;
  }
  return importString;
};

const afterInstallLib = options => {
  if (options) {
    let baseURL = options.baseUrl != undefined ? options.baseUrl : "localhost";

    fileUtils.checkOrCreateAPIDir();
    helperFile = helperFile.replace("-BaseURL-", baseURL);
    fileUtils.checkOrCreateHelperFile(helperFile);

    if (options.lib === "axios") {
    }

    fileUtils.checkOrCreateGetFile(getFile);
    fileUtils.checkOrCreatePostFile(postFile);
    fileUtils.checkOrCreatePutFile(putFile);
    fileUtils.checkOrCreateDeleteFile(deleteFile);
    fileUtils.checkOrCreateEndpointsFile();
    // generate endpoint here
    createEndPoint(options);
  }
};
module.exports = {
  createApi
};
