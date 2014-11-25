var sinon = require('sinon'),
    assert = require('assert'),
    request = require('supertest'),
    Barrels = require('barrels'),
    barrels = new Barrels(),
    agent = request.agent('http://localhost:1337');

/*describe('UsersController', function() {
  describe('GET /user/jwt', function() {
    it('should NOT return a JWT token', function (done) {
      request(sails.hooks.http.app)
        .post('/user/jwt')
        .send({ access_token: '289723kjhkj2h3kjh23kj2h32k3h23kjh23232323'})
        .expect(302)
        .expect('location','/user/jwt', done);
    });
  });

});

describe('UsersController', function() {
  describe('GET /user', function() {
    it('should return forbidden', function (done) {
      agent.get('/user')
        .expect(403, done);
    });
  });
});*/