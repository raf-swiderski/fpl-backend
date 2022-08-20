const express = require('express')
const router = express.Router()
const API_URL = process.env.API_URL 

const { getBoostrapStaticFromApi } = require('./getApiData')


router.get('/', getBoostrapStaticFromApi, async (req, res, next) => { 

    res.status(200).json(req.premTeams);

})

module.exports = router;