const express = require("express");
const app = express()

require("dotenv").config();
const axios = require('axios').default;
const cors = require('cors')

const port = process.env.PORT
const API_URL = process.env.API_URL 

app.use(
  cors({
    origin: "http://localhost:3000"
  })
)

const myteamRouter = require('./routes/myteam')
app.use('/myteam', myteamRouter)

const allPlayersRouter = require('./routes/allplayers')
app.use('/allplayers', allPlayersRouter)

const premTeamsRouter = require('./routes/premteams')
app.use('/premteams', premTeamsRouter)

app.get('/', (req, res) => { 
  res.send("Routes: /myteam, /allplayers")
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})


module.exports = app;