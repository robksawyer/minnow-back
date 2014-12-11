'use strict';
/**
 * Test File: Testing Auth
 * File location: test/models/Auth.test.js
 */
 
var request = require('supertest'),
    expect = require('chai').expect,
    should = require('chai').should,
    assert = require('chai').assert;

describe('Auth', function authModel(){

 describe('to have', function(){

    it('attributes', function(done){

      Auth.findOne({id: 1}).exec(function(err, res){
        assert(!err, err);
        if(err){
          done(err);
        }

        expect(res).to.have.property('id');
        expect(res).to.have.property('name');
        expect(res).to.have.property('phone');
        expect(res).to.have.property('email');
        expect(res).to.have.property('facebookId');
        expect(res).to.have.property('resetToken');
        expect(res).to.have.property('password');
        expect(res).to.have.property('createdAt');
        expect(res).to.have.property('updatedAt');

        done();
      });
    });


    it('attributes toJSON', function(done){

      Auth.findOne({id: 1}).exec(function(err, res){
        assert(!err, err);
        if(err){
          done(err);
        }

        var resJson = res.toJSON();

        //expect(resJson.body).to.have.string('Lorem Ipsum is simply dummy text of the printing and typesetting industry.');

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
    });

  });
});