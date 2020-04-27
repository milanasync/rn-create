module.exports = `import { getHeaders, handleServerError } from "./helper";

const get = async (URL, headers = {}) => {
  try {
    let response = await fetch(URL, {
      headers: getHeaders(headers)
    });
    if (response.status === 200) {
      return await response.json();
    } else {
      handleServerError(response.status);
      return false;
    }
  } catch (error) {
    alert(error.message);
    // client side errors
    return false;
  }
};

export default get;
`;