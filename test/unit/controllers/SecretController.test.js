/**
 * Test File: Testing SecretController
 * File location: test/controllers/SecretController.test.js
 */
'use strict';

var DataService = require('../../../api/services/DataService'),
    PostData = require('../../fixtures/Post.json'),
    loginHelper = require('../../helpers/login'),
    _ = require('lodash'),
    request = require('supertest'),
    expect = require('chai').expect,
    should = require('chai').should, 
    assert = require('chai').assert;

describe('SecretController', function(){

  var access_token = ''; //The test token
  it('should generate a token', function(done){
    loginHelper.getToken(1, function(token){
      access_token = token;
      expect(access_token).to.be.ok;
      done();
    });
  });

});