const express = require("express");
const app = express()

require("dotenv").config();
const axios = require('axios').default;
const cors = require('cors')


const port = process.env.PORT
const API_URL = process.env.API_URL // https://fpl-api-raf.herokuapp.com/

app.use(
  cors({
    origin: "http://localhost:3001"
  })
)

// id = 821650
// https://fpl-api-raf.herokuapp.com/?<path>
//   /myteam?id=821650

async function getApiData(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}


app.get('/myteam', async (req, res, next) => { 
    
  const id = req.query["id"]
  let url = `${API_URL}?path=entry/821650/event/35/picks/`;

  const myTeam = await getApiData(url)
  .then( myTeam => {
    req.myTeam = myTeam;
  })
  next()

}, async (req, res, next) => {

  let url = `${API_URL}?path=/bootstrap-static`
  const bootstrap = await getApiData(url)
  .then( bootstrap => {
    req.elements = bootstrap.elements;
  })
  next()
}, function (req, res) {

  const myTeamData = [];

  req.myTeam.picks.map(pick => {

    req.elements.forEach(element => {
      if (element.id === pick.element) {
        myTeamData.push(element);
      }
    });

  });

  console.log(myTeamData)
  res.status(200).json(myTeamData);

})

app.get('/', (req, res) => { 
    
    const path = req.query["path"]

    const url = `${API_URL}${path}`;

    request(url).pipe(res);
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
