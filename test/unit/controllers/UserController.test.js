var sinon = require('sinon'),
    assert = require('assert'),
    request = require('supertest'),
    agent = request.agent('http://localhost:1337');

describe('UserController', function() {
  describe('index', function() {
    it('should return forbidden', function (done) {
      agent.get('/user')
        .expect(403, done);
    });
  });
});