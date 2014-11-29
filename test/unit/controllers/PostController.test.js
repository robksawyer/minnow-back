/**
 * Test File: Testing PostController
 * File location: test/controllers/PostController.test.js
 */
'use strict';

var DataService = require('../../../api/services/DataService');

describe('PostController', function(){
  it('should return posts', function(done){
    var posts = DataService.getPosts({}, done);
    sails.log.error(__filename + ":" + __line);
    sails.log.error(posts);
    done();
  });
});