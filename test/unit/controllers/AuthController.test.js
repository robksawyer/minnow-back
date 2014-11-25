var sinon = require('sinon'),
    assert = require('assert'),
    request = require('supertest'),
    agent = request.agent('http://localhost:1337');

/*describe('AuthController', function() {
  describe('GET /auth/login', function(){
    it('should create a new user', function (done) {
      agent.post('/auth/login')
        .set('email', 'test@test.com')
        .set('password', 'testtesting')
        .expect(200)
        .end(function(err, res){
          if(err) throw err;
          done();
        });
    });
  });
});*/


