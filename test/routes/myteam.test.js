var chai  = require('chai')
var chaiHttp  = require('chai-http')
var app = require('../../app')
var axios = require('axios');

//assertion style
chai.should();

chai.use(chaiHttp);

describe('FPL-backend', () => {

    //GET myteam route

    describe("GET /myteam", () => {
        it("it should have a response code of 200", (done) => {
            chai.request(app)
                .get("/myteam?id=821650")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array')
                    done()
                })
        })
    })

    //GET allplayers route

})

// it('My team route', function(done) {
//     axios('http://localhost:4000/myteam' , function(error, response, body) {
//         expect(response.statusCode).to.equal(200);
//         console.log(response.statusCode)
//         done();
//     });
// });











// import chai from 'chai'
// import chaiHttp from 'chai-http'
// import app from '../../app/lib/app.js'

// chai.use(chaiHttp)
// chai.should()

// describe('App', () => {
//   describe('GET /myteam', () => {
//     describe('When route is valid', () => {
//       it('reponds with 200', (done) => {
//         chai.request(app)
//           .get('/myteam')
//           .end((err, res) => {
//             if (err) { console.error(`Error connecting to server: ${err}`) }
//             res.status.should.be.equal(200)
//             done()
//           })
//       })
//     })

//     describe('When route is invalid', () => {
//       it('reponds with 404', (done) => {
//         chai.request(app)
//           .get('/index')
//           .end((err, res) => {
//             if (err) { console.error(`Error connecting to server: ${err}`) }
//             res.status.should.be.equal(404)
//             done()
//           })
//       })
//     })
//   })
// })