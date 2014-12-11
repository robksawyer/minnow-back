'use strict';
/**
 * Test File: Testing User
 * File location: test/models/User.test.js
 */


var request = require('supertest'),
    expect = require('chai').expect,
    should = require('chai').should,
    assert = require('chai').assert;

describe('UserModel', function userModel(){

 describe('to have', function(){

    it('attributes', function(done){

        var attributes = User.attributes;
        expect(attributes).to.have.property('emailConfirmationStatus');
        expect(attributes).to.have.property('phoneConfirmationStatus');
        expect(attributes).to.have.property('customerId');
        expect(attributes).to.have.property('likes');
        expect(attributes).to.have.property('comments');
        expect(attributes).to.have.property('purchases');
        expect(attributes).to.have.property('posts');
        expect(attributes).to.have.property('status');
        expect(attributes).to.have.property('role');

        done();
    });

    it('attributes (public)', function(done){

      User.findOne(1)
        .populate('likes')
        .populate('comments')
        .populate('posts')
        .populate('purchases')
        .exec(function(err, res){
            assert(!err, err);
            if(err){
              done(err);
            }

            res = res.toJSON();

            expect(res).to.have.property('id');
            expect(res).to.not.have.property('emailConfirmationStatus');
            expect(res).to.not.have.property('phoneConfirmationStatus');
            expect(res).to.not.have.property('customerId');
            expect(res).to.have.property('likes');
            expect(res).to.have.property('comments');
            expect(res).to.have.property('posts');
            expect(res).to.not.have.property('status');
            expect(res).to.not.have.property('role');
            expect(res).to.have.property('createdAt');
            expect(res).to.have.property('updatedAt');

            done();
          });
    });

  });
});