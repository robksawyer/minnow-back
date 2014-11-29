/**
 * Test File: Testing UserController
 * File location: test/controllers/UserController.test.js
 */
'use strict';

var DataService = require('../../../api/services/DataService');
var request = require('supertest'),
    expect = require('chai').expect,
    should = require('chai').should,
    assert = require('chai').assert;

describe('UserController', function(){

  describe('DataService requests', function(){
    
    it('should not be empty', function(done){
      DataService.getUsers(null, function(err, users){
        assert(!err, err);
        expect(users.length).to.be.above(0);
      });
      done();
    });

    it('should be valid', function(done){
      DataService.getUsers(null, function(err, users){
        assert(!err, err);
        expect(users[0].id).to.be.above(0);
      });
      done();
    });

  });

});
 