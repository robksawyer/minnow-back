'use strict';
/**
 * Test File: Testing Purchase
 * File location: test/models/Purchase.test.js
 */
 
var request = require('supertest'),
    expect = require('chai').expect,
    should = require('chai').should,
    assert = require('chai').assert;

describe('PurchaseModel', function purchaseModel(){

 describe('to have', function(){

    it('attributes', function(done){

        var attributes = Purchase.attributes;

        expect(attributes).to.have.property('post');
        expect(attributes).to.have.property('user');

        done();
    });


    it('attributes (public)', function(done){

      Purchase.findOne(1).exec(function(err, res){
        assert(!err, err);
        if(err){
          done(err);
        }

        expect(res).to.have.property('id');
        expect(res).to.have.property('post');
        expect(res).to.have.property('user');
        expect(res).to.have.property('createdAt');
        expect(res).to.have.property('updatedAt');

        done();
      });
    });

  });
});