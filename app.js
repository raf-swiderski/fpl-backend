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

app.get('/', (req, res) => { 
    
  const path = req.query["path"]

  const url = `${API_URL}${path}`;

  request(url).pipe(res);

})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
