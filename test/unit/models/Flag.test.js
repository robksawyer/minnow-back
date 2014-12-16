'use strict';
/**
 * Test File: Testing Flag
 * File location: test/models/Flag.test.js
 */
 
var request = require('supertest'),
    chai = require('chai'),
    expect = chai.expect,
    should = chai.should(),
    assert = chai.assert;

describe('FlagModel', function flagModel(){

 describe('to have', function(){

    it('attributes', function(done){

        var attributes = Flag.attributes;

        expect(attributes).to.have.property('post');
        expect(attributes).to.have.property('owner');

        done();

    });

    it('attributes (public)', function(done){

      Flag.findOne(1).exec(function(err, res){
        assert(!err, err);
        if(err){
          done(err);
        }

        expect(res).to.be.ok;
        expect(res).to.have.property('id');
        expect(res).to.have.property('post');
        expect(res).to.have.property('owner');
        expect(res).to.have.property('createdAt');
        expect(res).to.have.property('updatedAt');
        
        done();
      });
    });

  });
});
