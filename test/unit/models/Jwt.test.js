'use strict';
/**
 * Test File: Testing Jwt
 * File location: test/models/Jwt.test.js
 */
 
var request = require('supertest'),
    expect = require('chai').expect,
    should = require('chai').should,
    assert = require('chai').assert;

describe('JwtModel', function jwtModel(){

 describe('to have', function(){

    var Jwt = require('../../../api/models/jwt');
    
    it('attributes', function(done){

        var attributes = Jwt.attributes;

        expect(attributes).to.have.property('uses');
        expect(attributes).to.have.property('revoked');

        done();
    });


    /*it('attributes (public)', function(done){

      Jwt.findOne(1).exec(function(err, res){
        assert(!err, err);
        if(err){
          done(err);
        }

        expect(res).to.have.property('id');
        expect(res).to.have.property('uses');
        expect(res).to.have.property('revoked');
        expect(res).to.have.property('createdAt');
        expect(res).to.have.property('updatedAt');

        done();
      });
    });*/

  });
});