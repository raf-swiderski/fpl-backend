const express = require('express')
const router = express.Router()
const API_URL = process.env.API_URL 

// id = 821650
// https://fpl-api-raf.herokuapp.com/?<path>

const { addTeamNames, sortTeamByPosition, getCurrentGW, convertPlayerPricing } = require('../data-logic/myteamMiddleware')
const getApiData = require('./getApiData')


router.get('/', async (req, res, next) => {

    let url = `${API_URL}/bootstrap-static`
    const bootstrap = await getApiData(url)
    .then( bootstrap => {
        req.premTeams = bootstrap.teams;
        req.elements = bootstrap.elements;
        req.events = bootstrap.events;
    })
    next()

}, async (req, res, next) => { 
   
 //821650
    const id = req.query["id"]

    const currentGameweek = getCurrentGW(req.events)

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
    addTeamNames(myTeamData, req.premTeams);
    convertPlayerPricing(myTeamData);

    res.status(200).json(myTeamData);

})

module.exports = router;