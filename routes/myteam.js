const express = require('express')
const router = express.Router()
const API_URL = process.env.API_URL 

// id = 821650
// https://fpl-api-raf.herokuapp.com/?<path>

const { addTeamNamesToMyTeam, sortTeamByPosition, getCurrentGW, convertPlayerPricing, reduceFirstNameOfPlayersToOneName } = require('../data-logic/myteamMiddleware')
const { getApiData, getBoostrapStaticFromApi } = require('./getApiData')


router.get('/', getBoostrapStaticFromApi, async (req, res, next) => { 
   
    const id = req.query["id"]

    const currentGameweek = getCurrentGW(req.events) // returns Integer
    let url = `${API_URL}/entry/${id}/event/${currentGameweek}/picks/`;

    const myTeam = await getApiData(url)
    .then( myTeam => {
        req.myTeam = myTeam;
    })
    next()

}, function (req, res) {

    var myTeamData = [];
    req.myTeam.picks.map(pick => {

        req.elements.forEach(element => {
            if (element.id === pick.element) {
                myTeamData.push(element);
            }
        });

    });

    sortTeamByPosition(myTeamData);
    addTeamNamesToMyTeam(myTeamData, req.premTeams);
    convertPlayerPricing(myTeamData);
    reduceFirstNameOfPlayersToOneName(myTeamData);

    res.status(200).json(myTeamData);
})

module.exports = router;