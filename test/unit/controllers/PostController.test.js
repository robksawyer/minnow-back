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
  it('should return posts', function(done){
    DataService.getPosts(null, function(err, posts){
      expect(err).to.be.null;
      expect(posts.length).to.be.above(0);
      sails.log.warn(posts);
    });
  });
});