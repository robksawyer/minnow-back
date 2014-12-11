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

    it('attributes', function(done){

      Jwt.findOne({id: 1}).exec(function(err, res){
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
    });


    it('attributes toJSON', function(done){

      Jwt.findOne({id: 1}).exec(function(err, res){
        assert(!err, err);
        if(err){
          done(err);
        }

        var resJson = res.toJSON();

        //expect(resJson.body).to.have.string('Lorem Ipsum is simply dummy text of the printing and typesetting industry.');

        expect(res).to.have.property('id');
        expect(res).to.have.property('uses');
        expect(res).to.have.property('revoked');
        expect(res).to.have.property('createdAt');
        expect(res).to.have.property('updatedAt');

        done();
      });
    });

  });
});