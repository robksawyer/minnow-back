/**
 * Test File: Testing HomeController
 * File location: test/controllers/HomeController.test.js
 */
var HomeController = require('../../../api/controllers/HomeController'),
    sinon = require('sinon'),
    assert = require('assert');

describe('The Home Controller', function() {  
  describe('when we invoke the index action', function() {
    it('should return welcome message', function() {

      // Mocking res.send() method by using a sinon spy
      var send = sinon.spy();

      // Executes controller action
      /*HomeController.index(null, {
        'json': send
      });*/

      // Asserts send() method was called and that it was called
      // with the correct arguments: 'Hello World'
      /*assert(send.called);
      assert(send.calledWith('Hello World'));*/
    });
  });
});