const axios = require('axios').default;
const API_URL = process.env.API_URL;
require("dotenv").config();

async function getApiData(url, headers) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(error);
    }
}

async function getBoostrapStaticFromApi(req, res, next) {
  try {
    let url = `${API_URL}/bootstrap-static/`
    const bootstrap = await getApiData(url)
    .then( bootstrap => {
        req.premTeams = bootstrap.teams;
        req.elements = bootstrap.elements;
        req.events = bootstrap.events;
    })
    next()
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getApiData,
  getBoostrapStaticFromApi
};