'use strict';
/**
 * Test File: Testing User
 * File location: test/models/User.test.js
 */


var request = require('supertest'),
    expect = require('chai').expect,
    should = require('chai').should,
    assert = require('chai').assert;

describe('User', function userModel(){

 describe('to have', function(){

    it('attributes', function(done){

      User.findOne({id: 1}).exec(function(err, res){
        assert(!err, err);
        if(err){
          done(err);
        }
        expect(res).to.have.property('id');
        expect(res).to.have.property('emailConfirmationStatus');
        expect(res).to.have.property('phoneConfirmationStatus');
        expect(res).to.have.property('customerId');
        expect(res).to.have.property('likes');
        expect(res).to.have.property('comments');
        expect(res).to.have.property('posts');
        expect(res).to.have.property('status');
        expect(res).to.have.property('role');
        expect(res).to.have.property('createdAt');
        expect(res).to.have.property('updatedAt');

        done();
      });
    });

    it('attributes toJSON', function(done){

      User.findOne({id: 1}).exec(function(err, res){
        assert(!err, err);
        if(err){
          done(err);
        }

        var resJson = res.toJSON();

        expect(resJson).to.have.property('id');
        expect(resJson).to.not.have.property('emailConfirmationStatus');
        expect(resJson).to.not.have.property('phoneConfirmationStatus');
        expect(resJson).to.not.have.property('customerId');
        expect(resJson).to.have.property('likes');
        expect(resJson).to.have.property('comments');
        expect(resJson).to.have.property('posts');
        expect(resJson).to.not.have.property('status');
        expect(resJson).to.not.have.property('role');
        expect(resJson).to.have.property('createdAt');
        expect(resJson).to.have.property('updatedAt');

        done();
      });
    });

  });
});