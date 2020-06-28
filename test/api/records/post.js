process.env.NODE_ENV = 'test';

var expect = require('chai').expect;
var request = require('supertest');

var app = require('../../../app.js')

//Mocha api tests for post records end point
describe('POST /records', () =>{
    it('OK, listing records works', ()=>{
        request(app).post('/records')
            .send({
            "startDate": "2016-01-26",
            "endDate": "2018-02-02",
            "minCount": 2700,
            "maxCount": 3000
            })
            .then((res) => {
                expect(res).to.have.status(200);
                const body = res.body
                expect(body).to.contain.property('records')
                expect(body).to.contain.property('msg')
                expect(body.msg).to.equals("success")
                expect(body).to.contain.property('code')
                expect(body.code).to.equals(0)
                done();
            })
            .catch((err) => done(err));
    });

    it('Fail, listing records requires valid Date as endDate ', ()=>{
        request(app).post('/records')
            .send({
                "startDate": "2016-01-26",
                "endDate": "dasdasd",
                "minCount": 2700,
                "maxCount": 3000
            })
            .then((res) => {
                const body = res.body
                expect(body).to.contain.property('code')
                expect(body.code).to.equals(500)
            })
            .catch((err) => done(err));
    });
})