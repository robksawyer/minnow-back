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
 var Use = require('../../../api/models/flag');
 describe('to have', function(){

    describe('attributes', function(){

      var attributes = Use.attributes;

      it('should be a object', function(done){
        expect(attributes).to.be.an('object');
        done();
      });

      describe('.post', function(){
        it('should exist', function(done){
          expect(attributes).to.have.property('post');
          done();
        });
      });
      describe('.owner', function(){
        it('should exist', function(done){
          expect(attributes).to.have.property('owner');
          done();
        });
      });

    });

    it('attributes toJSON', function(done){

      Flag.findOne({id: 1}).exec(function(err, res){
        assert(!err, err);
        if(err){
          done(err);
        }

        var resJson = res.toJSON();

        //expect(resJson.body).to.have.string('Lorem Ipsum is simply dummy text of the printing and typesetting industry.');

        describe('.id', function(){
          it('should exist', function(done){
            expect(attributes).to.have.property('id');
            done();
          });
        });
        describe('.post', function(){
          it('should exist', function(done){
            expect(attributes).to.have.property('post');
            done();
          });
        });
        describe('.owner', function(){
          it('should exist', function(done){
            expect(attributes).to.have.property('owner');
            done();
          });
        });
        describe('.createdAt', function(){
          it('should exist', function(done){
            expect(attributes).to.have.property('createdAt');
            done();
          });
        });
        describe('.updatedAt', function(){
          it('should exist', function(done){
            expect(attributes).to.have.property('updatedAt');
            done();
          });
        });
        
      });
    });

  });
});
