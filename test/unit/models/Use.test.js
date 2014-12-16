'use strict';
/**
 * Test File: Testing Use
 * File location: test/models/Use.test.js
 */
 
var request = require('supertest'),
    chai = require('chai'),
    expect = chai.expect,
    should = chai.should(),
    assert = chai.assert;

describe('UseModel', function(){

 describe('to have', function(){

    var Use = require('../../../api/models/use');

    it('attributes', function(done){

        var attributes = Use.attributes;

        expect(attributes).to.have.property('remoteAddress');
        expect(attributes).to.have.property('jsonWebToken');

        done();
    });


    /*it('attributes (public)', function(done){

      Use.findOne(1).exec(function(err, res){
        assert(!err, err);
        if(err){
          done(err);
        }

        expect(res).to.have.property('id');
        expect(res).to.have.property('token');
        expect(res).to.have.property('createdAt');
        expect(res).to.have.property('updatedAt');

        done();
      });
    });*/

  });
});