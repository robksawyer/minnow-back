/**
 * Test File: Testing PostController
 * File location: test/controllers/PostController.test.js
 */
'use strict';

var DataService = require('../../../api/services/DataService');
var request = require('supertest'),
    expect = require('chai').expect,
    should = require('chai').should,
    assert = require('chai').assert;

describe('PostController', function(){

  describe('DataService requests', function(){

    it('should return posts', function(done){
      DataService.getPosts(null, function(err, posts){
        assert(!err, err);
        expect(posts.length).to.be.above(0);
      });
      done();
    });

    it('should be valid result', function(done){
      DataService.getPosts(null, function(err, posts){
        assert(!err, err);
        expect(posts[0].id).to.be.above(0);
      });
      done();
    });

    it('should have owner data', function(done){
      DataService.getPosts(null, function(err, posts){
        assert(!err, err);
        expect(posts[0].owner.id).to.be.above(0);
      });
      done();
    });
    
  });

});