'use strict';
/**
 * Test File: Testing Attempt
 * File location: test/models/Attempt.test.js
 */
 
var request = require('supertest'),
    expect = require('chai').expect,
    should = require('chai').should,
    assert = require('chai').assert;

describe('AttemptModel', function attemptModel(){

 describe('to have', function(){

    it('attributes', function(done){

      Attempt.findOne({id: 1}).exec(function(err, res){
        assert(!err, err);
        if(err){
          done(err);
        }

        expect(res).to.have.property('id');
        expect(res).to.have.property('user');
        expect(res).to.have.property('successful');
        expect(res).to.have.property('ip');
        expect(res).to.have.property('port');
        expect(res).to.have.property('createdAt');
        expect(res).to.have.property('updatedAt');

        done();
      });
    });


    it('attributes toJSON', function(done){

      Attempt.findOne({id: 1}).exec(function(err, res){
        assert(!err, err);
        if(err){
          done(err);
        }

        var resJson = res.toJSON();

        //expect(resJson.body).to.have.string('Lorem Ipsum is simply dummy text of the printing and typesetting industry.');

        expect(res).to.have.property('id');
        expect(res).to.have.property('user');
        expect(res).to.have.property('successful');
        expect(res).to.have.property('ip');
        expect(res).to.have.property('port');
        expect(res).to.have.property('createdAt');
        expect(res).to.have.property('updatedAt');

        done();
      });
    });

  });
});