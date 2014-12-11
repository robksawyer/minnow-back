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

        var attributes = Secret.attributes;

        expect(attributes).to.have.property('post');
        expect(attributes).to.have.property('price');
        expect(attributes).to.have.property('body');
        expect(attributes).to.have.property('status');

        done();
    });


    it('attributes (public)', function(done){

      Secret.findOne(1).exec(function(err, res){
        assert(!err, err);
        if(err){
          done(err);
        }
        
        sails.log(res);
        
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