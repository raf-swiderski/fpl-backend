const axios = require('axios').default;

async function getApiData(url, headers) {
    try {
      const response = await axios.get(url, headers);
      return response.data;
    } catch (error) {
      console.error(error);
    }
}

module.exports = getApiData;