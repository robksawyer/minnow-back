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

    var Attempt = require('../../../api/models/attempt');

    it('attributes', function(done){

        var attributes = Attempt.attributes;

        expect(attributes).to.have.property('user');
        expect(attributes).to.have.property('successful');
        expect(attributes).to.have.property('ip');
        expect(attributes).to.have.property('port');

        done();
    });


    /*it('attributes (public)', function(done){

      Attempt.findOne(1).exec(function(err, res){
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
    });*/

  });
});