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


})

