'use strict';
/**
 * Test File: Testing UserController
 * File location: test/controllers/UserController.test.js
 */

var request = require('supertest'),
    expect = require('chai').expect,
    should = require('chai').should,
    assert = require('chai').assert;

describe('UserController', function(){

  describe('action get', function(){
    
    it('users should not be empty', function(done){
      User.find().exec(function(err, res){
        expect(res.length).to.be.above(0);
        done();
      });
    });

    it('should return a single user', function(done){
      User.find({id: 1}).exec(function(err, res){
        
        expect(res.length, 1);

        done();
      });
    });

  });

});
 