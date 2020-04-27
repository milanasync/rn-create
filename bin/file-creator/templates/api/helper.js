module.exports = `const getHeaders = (headers = {}) => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...headers
  };
};

const serverErrorMsg = {
  400: "Bad Request.",
  401: "Unathorized Request.",
  403: "Restricted Request.",
  404: "Resource not found.",
  405: "Request not allowed",
  500: "Server Error"
};
const handleServerError = statusCode => {
  // here you can handle the error msg according to status code from the response.
  alert(serverErrorMsg[statusCode]);
};

const getBaseURL = _ => {
  return "-BaseURL-";
};

const frontEndValidation = (param, requireFields) => {
  let requestParams = Object.keys(param);
  let requiredParamsNotGiven = requestParams.filter(
    paramKey => !requireFields.includes(paramKey)
  );

  if(requiredParamsNotGiven.length > 0) {
    alert("Field required : " + requestParams[0]);
    return false;
  }
  return true;
};

export {getHeaders, serverErrorMsg, handleServerError, getBaseURL, frontEndValidation};
`;
