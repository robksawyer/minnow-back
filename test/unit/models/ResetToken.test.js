'use strict';
/**
 * Test File: Testing ResetToken
 * File location: test/models/ResetToken.test.js
 */
 
var request = require('supertest'),
    chai = require('chai'),
    expect = chai.expect,
    should = chai.should(),
    assert = chai.assert;

describe('ResetTokenModel', function resetTokenModel(){

 describe('to have', function(){

    var ResetToken = require('../../../api/models/resettoken');

    it('attributes', function(done){

        var attributes = ResetToken.attributes;

        expect(attributes).to.have.property('token');

        done();
    });


    /*it('attributes (public)', function(done){

      ResetToken.findOne(1).exec(function(err, res){
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