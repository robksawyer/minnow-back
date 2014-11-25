var sinon = require('sinon'),
    assert = require('assert'),
    request = require('supertest');

describe('UserController', function() {
  describe('index', function() {
    it('should return forbidden', function (done) {
      request(sails.hooks.http.app)
        .get('/user')
        .expect(403, done);
    });
  });
});