const express = require('express')
const router = express.Router()

const { getBoostrapStaticFromApi } = require('./getApiData')
const { addTeamNamesToAllPlayers, formatPlayerPricing, sortPlayers, addTheInTeamProperty, addTrueValueProperty } = require('../data-logic/myteamMiddleware')

router.get('/', getBoostrapStaticFromApi, async (req, res, next) => {

    var allPlayers = req.elements;

    addTeamNamesToAllPlayers(allPlayers, req.premTeams);
    formatPlayerPricing(allPlayers, "now_cost");
    formatPlayerPricing(allPlayers, "true_value");
    sortPlayers(allPlayers, "total_points")
    addTheInTeamProperty(allPlayers);
    addTrueValueProperty(allPlayers)

    res.status(200).json(allPlayers);

})

module.exports = router;