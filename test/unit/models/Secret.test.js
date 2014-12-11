'use strict';
/**
 * Test File: Testing Secret
 * File location: test/models/Secret.test.js
 */
 
var request = require('supertest'),
    expect = require('chai').expect,
    should = require('chai').should,
    assert = require('chai').assert;

describe('SecretModel', function secretModel(){

 describe('to have', function(){

    it('attributes', function(done){

      Secret.findOne({id: 1}).exec(function(err, res){
        assert(!err, err);
        if(err){
          done(err);
        }

        expect(res).to.have.property('id');
        expect(res).to.have.property('post');
        expect(res).to.have.property('price');
        expect(res).to.have.property('body');
        expect(res).to.have.property('status');

        done();
      });
    });


    it('attributes toJSON', function(done){

      Secret.findOne({id: 1}).exec(function(err, res){
        assert(!err, err);
        if(err){
          done(err);
        }

        var resJson = res.toJSON();

        //expect(resJson.body).to.have.string('Lorem Ipsum is simply dummy text of the printing and typesetting industry.');

        expect(res).to.have.property('id');
        expect(res).to.have.property('post');
        expect(res).to.have.property('price');
        expect(res).to.have.property('body');
        expect(res).to.have.property('status');

        done();
      });
    });

  });
});