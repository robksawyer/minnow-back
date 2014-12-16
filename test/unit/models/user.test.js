'use strict';
/**
 * Test File: Testing User
 * File location: test/models/User.test.js
 */


var request = require('supertest'),
    chai = require('chai'),
    expect = chai.expect,
    should = chai.should(),
    assert = chai.assert;

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

  });
});