var expect = require('chai').expect;
var request = require('supertest');
var app = require('../index');
var db = require('../models');

before(function(done) {
    db.sequelize.sync({ force: true }).then(function() {
        done();
    });
});

describe('GET /tacos', function() {
    it('should return a 200 response', function(done) {
        request(app).get('/tacos').expect(200, done);
    });
});

describe('POST /tacos', function() {
    it('should create and redirect to /tacos after posting a valid taco', function(done) {
        request(app).post('/tacos').type('form').send({
                //fake data to test
                name: 'DAT GOOD GOOD',
                amount: 120
            }).expect('Location', '/tacos') //this is how we test a redirect
            .expect(302, done);
    });
});
describe('DELETE /tacos/:id', function() {
    it('should return a 200 response on deleting a valid taco', function(done) {
        request(app).delete('/tacos/1')
            //end = something you do in supertest at end, which gives ability to do other checking off things
            .end(function(err, response) {
                expect(response.statusCode).to.equal(200);
                expect(response.body).to.have.property('msg');
                expect(response.body.msg).to.equal('success');
                done();
            })
    })
});




//aj's idea