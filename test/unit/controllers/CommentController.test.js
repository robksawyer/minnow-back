'use strict';
/**
* Test File: Testing CommentController
* File location: test/controllers/CommentController.test.js
*/

var DataService = require('../../../api/services/DataService');
var request = require('supertest'),
    expect = require('chai').expect,
    should = require('chai').should,
    assert = require('chai').assert;

describe('CommentController', function(){
  describe('DataService requests', function(){

    it('should return five comments', function(done){
      DataService.getComments({}, 5, null, function(err, results){
        assert(!err, err);
        expect(results.length).to.be(5);
      });
      done();
    });

    it('should be valid result', function(done){
      DataService.getComments({id: 1}, 10, null, function(err, results){
        assert(!err, err);
        expect(results[0].id).to.be.above(0);
      });
      done();
    });

    it('should have owner data', function(done){
      DataService.getComments({id: 1}, 10, null, function(err, results){
        assert(!err, err);
        expect(results[0].owner.id).to.be.above(0);
      });
      done();
    });

    it('should have post data', function(done){
      DataService.getComments({id: 1}, 10, null, function(err, results){
        assert(!err, err);
        expect(results[0].post.id).to.be.above(0);
      });
      done();
    });
    
  });
});