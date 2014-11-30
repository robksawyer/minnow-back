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

        expect(res).to.have.property('phone');
        expect(res).to.have.property('emailConfirmationStatus');
        expect(res).to.have.property('phoneConfirmationStatus');
        expect(res).to.have.property('customer');
        expect(res).to.have.property('recipient');
        expect(res).to.have.property('likes');
        expect(res).to.have.property('comments');
        expect(res).to.have.property('posts');
        expect(res).to.have.property('status');
        expect(res).to.have.property('roles');

        done();
      });
    });

  });
});