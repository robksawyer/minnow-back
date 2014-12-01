'use strict';
/**
 * Test File: Testing Post
 * File location: test/models/Post.test.js
 */
 
var request = require('supertest'),
    expect = require('chai').expect,
    should = require('chai').should,
    assert = require('chai').assert;

describe('Post', function userModel(){

 describe('to have', function(){

    it('attributes', function(done){

      Post.findOne({id: 1}).exec(function(err, res){

        //expect(res).to.have.property('phone');

        done();
      });
      
    });

  });
});