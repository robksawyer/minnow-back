'use strict';
/**
* Test File: Testing CommentController
* File location: test/controllers/CommentController.test.js
*/

var DataService = require('../../../api/services/DataService');
var request = require('supertest'),
    chai = require('chai'),
    expect = chai.expect,
    should = chai.should(),
    assert = chai.assert;

describe('CommentController', function(){

  describe('DataService requests', function(){

    describe('getComment', function(){

      it('should be valid result', function(done){
        DataService.getComment({id: 1}, function(err, results){
          assert(!err, err);
          sails.log.warn(results);
          expect(results[0].id).to.be.above(0);
        });
        done();
      });

    });

    describe('getComments', function(){
      
      it('should return five comments', function(done){
        DataService.getComments({}, 5, null, function(err, results){
          assert(!err, err);
          expect(results.length).to.be(5);
        });
        done();
      });

      it('should be valid result (limit:5)', function(done){
        DataService.getComments({id: 1}, 5, null, function(err, results){
          assert(!err, err);
          expect(results[0].id).to.be.above(0);
        });
        done();
      });

      it('should be valid result (limit:null)', function(done){
        DataService.getComments({id: 1}, null, null, function(err, results){
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
});