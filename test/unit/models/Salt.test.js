'use strict';
/**
 * Test File: Testing Salt
 * File location: test/models/Salt.test.js
 */
 
var request = require('supertest'),
    expect = require('chai').expect,
    should = require('chai').should,
    assert = require('chai').assert;

describe('SaltModel', function SaltModel(){

 describe('to have', function(){

    describe('attributes', function(){

        var attributes = Salt.attributes;

        expect(attributes).to.have.property('value');
        expect(attributes).to.have.property('secret');

        done();

    });

    it('attributes (public)', function(done){

      Salt.findOne(1).exec(function(err, res){
        assert(!err, err);
        if(err){
          done(err);
        }

        expect(res).to.be.ok;
        expect(res).to.have.property('id');
        expect(res).to.have.property('value');
        expect(res).to.have.property('secret');
        expect(res).to.have.property('createdAt');
        expect(res).to.have.property('updatedAt');
        
      });
    });

  });
});
