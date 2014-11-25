var sinon = require('sinon'),
    assert = require('assert');

describe('User', function() {
  it ('should not be empty', function(done) {
    User.find().exec(function(err, users) {
      //Find the length of the user fixtures
      users.length.should.be.eql(fixtures['users'].length);
      done();
    });
  });
});