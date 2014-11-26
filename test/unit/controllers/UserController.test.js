var Sails = require('sails'),
    sinon = require('sinon'),
    assert = require('assert'),
    request = require('supertest'),
    agent = request.agent('http://localhost:1337');

//fixtures = appHelper.fixtures('users');
//sails.log.warn(fixtures);
//
/*describe('UserController', function () {
  
  before(function(done){
    appHelper.lift(done);
  });

  it('should have populated db now', function(done){
    
    User.find().exec(function(err, users){
      if (err)
        return done(err);

      sails.log.warn(users);
    });

    done();
  });

});


after(function (done) {
  // Restart the server to get back to a clean state
  // (could just delete the user in this case, but sometimes this is easier)
  appHelper.lower(done);
});*/