const axios = require('axios').default;

async function getApiData(url) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(error);
    }
}

module.exports = getApiData;