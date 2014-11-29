'use strict';
/**
 * Test File: Testing Comment
 * File location: test/models/Comment.test.js
 */

var request = require('supertest'),
    expect = require('chai').expect,
    should = require('chai').should,
    assert = require('chai').assert;

describe('Comment', function userModel(){

 describe('should have', function(){

    it('the attributes', function(done){
      Comment.findOne({id: 1}).exec(function(err, res){
        
        sails.log.warn(res);
        expect(res).to.have.property('body');
        expect(res).to.have.property('summary');
        expect(res).to.have.property('post');
        expect(res).to.have.property('status');
        expect(res).to.have.property('owner');

        done();
      });
    });

  });
});