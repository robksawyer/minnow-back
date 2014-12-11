'use strict';
/**
 * Test File: Testing Comment
 * File location: test/models/Comment.test.js
 */

var request = require('supertest'),
    expect = require('chai').expect,
    should = require('chai').should,
    assert = require('chai').assert;

describe('CommentModel', function commentModel(){

 describe('to have', function(){

    it('attributes', function(done){

        var attributes = Comment.attributes;

        expect(attributes).to.have.property('body');
        expect(attributes).to.have.property('commentId'); //This allows us to order the comments
        expect(attributes).to.have.property('post');
        expect(attributes).to.have.property('status');
        expect(attributes).to.have.property('owner');
        
        done();

    });


    it('attributes (public)', function(done){

      Comment.findOne(1).exec(function(err, res){
        assert(!err, err);
        if(err){
          done(err);
        }

        expect(res).to.be.ok;
        expect(res).to.have.property('id');
        expect(res).to.have.property('body');
        expect(res).to.have.property('commentId');
        expect(res).to.have.property('post');
        expect(res).to.have.property('status');
        expect(res).to.have.property('owner');
        expect(res).to.have.property('createdAt');
        expect(res).to.have.property('updatedAt');
        
      });
    });

  });
});