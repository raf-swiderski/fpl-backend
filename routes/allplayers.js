const express = require('express')
const router = express.Router()
const API_URL = process.env.API_URL 

const { getBoostrapStaticFromApi } = require('./getApiData')

router.get('/', getBoostrapStaticFromApi, async (req, res, next) => {

    var allPlayerData = req.elements;

    addTeamNames(allPlayerData, req.premTeams);
    convertPlayerPricing(allPlayerData);

    res.status(200).json(allPlayerData);

})

module.exports = router;