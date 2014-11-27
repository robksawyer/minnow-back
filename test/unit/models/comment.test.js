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

 describe('to have', function(){

    it('attributes', function(done, Comment){
      Comment.find({id: 1}).exec(function(err, res){
        
        expect(res[0]).to.have.property('body');
        expect(res[0]).to.have.property('summary');
        expect(res[0]).to.have.property('post');
        expect(res[0]).to.have.property('status');
        expect(res[0]).to.have.property('owner');

        done();
      });
    });

  });
});