'use strict';
/**
 * Test File: Testing Comment
 * File location: test/models/Comment.test.js
 */

var request = require('supertest'),
    chai = require('chai'),
    expect = chai.expect,
    should = chai.should(),
    assert = chai.assert;

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

      Comment
        .findOne()
        .where({id: 1})
        .populate('post')
        .populate('owner')
        .then(function(comment){

            sails.log(comment);
            /*expect(comment).to.be.ok;
            expect(comment).to.have.property('id');
            expect(comment).to.have.property('body');
            expect(comment).to.have.property('commentId');
            expect(comment).to.have.property('status');
            expect(comment).to.have.property('post');
            expect(comment).to.have.property('owner');
            expect(comment).to.have.property('createdAt');
            expect(comment).to.have.property('updatedAt');*/

            done();
        })
        .catch(done);

    });
  });
});