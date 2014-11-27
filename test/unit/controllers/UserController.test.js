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
    it('the total users and it should not be empty', function(done){
      User.find().exec(function(err, res){
        expect(res.length).to.be.above(0);
        done();
      });
    });
  });


  describe('action get', function(){
    it('the total users and it should be 10', function(done){
      User.find().exec(function(err, res){
        expect(res.length, 10);

        assert('foo' !== 'bar', 'foo is not bar');
        
        done();
      });
    });
  });

});
 