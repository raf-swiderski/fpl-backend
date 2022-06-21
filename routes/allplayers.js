const express = require('express')
const router = express.Router()
const API_URL = process.env.API_URL 

const { getBoostrapStaticFromApi } = require('./getApiData')
const { addTeamNamesToMyTeam, convertPlayerPricing, reduceFirstNameOfPlayersToOneName, sortPlayers } = require('../data-logic/myteamMiddleware')

router.get('/', getBoostrapStaticFromApi, async (req, res, next) => {

    var allPlayerData = req.elements;

    addTeamNamesToMyTeam(allPlayerData, req.premTeams);
    convertPlayerPricing(allPlayerData);
    reduceFirstNameOfPlayersToOneName(allPlayerData);
    sortPlayers(allPlayers, "points")

    res.status(200).json(allPlayerData);

})

module.exports = router;