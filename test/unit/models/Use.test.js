'use strict';
/**
 * Test File: Testing Use
 * File location: test/models/Use.test.js
 */
 
var request = require('supertest'),
    expect = require('chai').expect,
    should = require('chai').should,
    assert = require('chai').assert;

describe('UseModel', function(){
 var Use = require('../../../api/models/use');
 describe('to have', function(){

    describe('attributes', function(){

      var attributes = Use.attributes;

      it('should be a object', function(done){
        expect(attributes).to.be.an('object');
        done();
      });

      describe('.remoteAddress', function(){
        it('should exist', function(done){
          expect(attributes).to.have.property('remoteAddress');
          done();
        });
      });
      describe('.jsonWebToken', function(){
        it('should exist', function(done){
          expect(attributes).to.have.property('jsonWebToken');
          done();
        });
      });

    });

  });
});