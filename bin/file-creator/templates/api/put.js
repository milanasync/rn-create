module.exports = `import { getHeaders, handleServerError } from "./helper";

const put = async (URL, data, headers = {}) => {
  try {
    let response = await fetch(URL, {
      method: "PUT",
      headers: getHeaders(headers),
      body: JSON.stringify(data)
    });
    if (response.status === 200) {
      return await response.json();
    } else {
      handleServerError(response.status);
      return false;
    }
  } catch (error) {
    alert(error.message);
    return false;
  }
};

export default put;
`;