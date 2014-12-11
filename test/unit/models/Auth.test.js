'use strict';
/**
 * Test File: Testing Auth
 * File location: test/models/Auth.test.js
 */
 
var request = require('supertest'),
    expect = require('chai').expect,
    should = require('chai').should,
    assert = require('chai').assert;

describe('AuthModel', function authModel(){

 describe('to have', function(){

    var Auth = require('../../../api/models/auth');

    it('attributes', function(done){

        var attributes = Auth.attributes;

        expect(attributes).to.have.property('name');
        expect(attributes).to.have.property('phone');
        expect(attributes).to.have.property('email');
        expect(attributes).to.have.property('facebookId');
        expect(attributes).to.have.property('resetToken');
        expect(attributes).to.have.property('password');

        done();
    });


    /*it('attributes (public)', function(done){

      Auth.findOne(1).exec(function(err, res){
        assert(!err, err);
        if(err){
          done(err);
        }

        expect(res).to.have.property('id');
        expect(res).to.not.have.property('name');
        expect(res).to.not.have.property('phone');
        expect(res).to.not.have.property('email');
        expect(res).to.not.have.property('facebookId');
        expect(res).to.have.property('resetToken');
        expect(res).to.not.have.property('password');
        expect(res).to.have.property('createdAt');
        expect(res).to.have.property('updatedAt');

        done();
      });
    });*/

  });
});