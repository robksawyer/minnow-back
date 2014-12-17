'use strict';
/**
 * Test File: Testing Like
 * File location: test/models/Like.test.js
 */
 
var request = require('supertest'),
    chai = require('chai'),
    expect = chai.expect,
    should = chai.should(),
    assert = chai.assert;

describe('LikeModel', function likeModel(){

 describe('to have', function(){

    it('attributes', function(done){

        var attributes = Like.attributes;

        expect(attributes).to.have.property('post');
        expect(attributes).to.have.property('owner');

        done();
    });


    it('attributes (public)', function(done){

      Like
        .findOne(1)
        .populate('post')
        .exec(function(err, res){
            assert(!err, err);
            if(err){
              done(err);
            }

            expect(res).to.be.ok;
            expect(res).to.have.property('id');
            expect(res).to.have.property('post');
            expect(res).to.have.property('owner');
            expect(res).to.have.property('createdAt');
            expect(res).to.have.property('updatedAt');

            done();
          });
        });

  });
});