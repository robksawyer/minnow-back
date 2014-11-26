var sinon = require('sinon'),
    assert = require('assert'),
    request = require('supertest'),
    Barrels = require('barrels'),
    barrels = new Barrels(),
    agent = request.agent('http://localhost:1337');

//Load the fixtures in barrels
appHelper.fixtures(['users'], done, function(err, res){
   fixtures = res;
});

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

describe('UserController', function () {
  
  before(function (done) {
    User.create(fixtures[0], done);
  });
  
  after(function (done) {
    // Restart the server to get back to a clean state
    // (could just delete the user in this case, but sometimes this is easier)
    appHelper.lift(done);
  })
 
  describe('#findOneById', function (done) {
    it('should get forbidden', function (done) {
      request
        .get('/user/1')
        .expect(403, done);
    });
  });
});