'use strict';
/**
 * Test File: Testing Secret
 * File location: test/models/Secret.test.js
 */
 
var request = require('supertest'),
    chai = require('chai'),
    expect = chai.expect,
    should = chai.should(),
    assert = chai.assert;

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

      Secret
        .findOne()
        .where({id: 1})
        .populate('post')
        .exec(function(err, res){
            assert(!err, err);
            if(err){
              done(err);
            }
            
            expect(res).to.be.ok;
            
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