const express = require('express')
const router = express.Router()

const { getBoostrapStaticFromApi } = require('./getApiData')
const { addTeamNamesToAllPlayers, sortPlayers, addTheInTeamProperty, addTrueValueProperty } = require('../data-logic/myteamMiddleware')

router.get('/', getBoostrapStaticFromApi, async (req, res, next) => {

    var allPlayers = req.elements;

    addTrueValueProperty(allPlayers)
    addTeamNamesToAllPlayers(allPlayers, req.premTeams);
    sortPlayers(allPlayers, "total_points")
    addTheInTeamProperty(allPlayers);

    res.status(200).json(allPlayers);

})

module.exports = router;