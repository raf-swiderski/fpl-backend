// const request = require("request");
const express = require("express");
const app = express()
const port = 3000

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});



app.get('/', (req, res) => { 
    
    // const id = req.query["id"]

    // const url = `https://fantasy.premierleague.com/api/entry/${id}/history`;

    // request(url).pipe(res);
    res.send('hello')
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
