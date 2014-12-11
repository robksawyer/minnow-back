'use strict';
/**
 * Test File: Testing Flag
 * File location: test/models/Flag.test.js
 */
 
var request = require('supertest'),
    expect = require('chai').expect,
    should = require('chai').should,
    assert = require('chai').assert;

describe('FlagModel', function(){
 //var Flag = require('../../../api/models/flag');
 describe('to have', function(){

    describe('attributes', function(){

      it('should be a object', function(done){
        expect(Flag.attributes).to.be.an('object');
        done();
      });

      describe('.post', function(){
        it('should exist', function(done){
          expect(Flag.attributes).to.have.property('post');
          done();
        });
      });
      describe('.owner', function(){
        it('should exist', function(done){
          expect(Flag.attributes).to.have.property('owner');
          done();
        });
      });

    });

    it('attributes (public)', function(done){

      Flag.findOne(1).exec(function(err, res){
        assert(!err, err);
        if(err){
          done(err);
        }

        expect(res).to.have.property('id');
        expect(res).to.have.property('post');
        expect(res).to.have.property('owner');
        expect(res).to.have.property('createdAt');
        expect(res).to.have.property('updatedAt');
        
      });
    });

  });
});
