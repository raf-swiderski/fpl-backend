import express from 'express';
const request = require("request");
require("dotenv").config();
const app = express()
const port = process.env.PORT

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.ORIGIN || "*");
    next();
});



app.get('/', (req, res) => { 
    
    const id = req.query["id"]

    const url = `https://fantasy.premierleague.com/api/entry/${id}/history`;

    request(url).pipe(res);
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
