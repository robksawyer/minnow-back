'use strict';
/**
 * Test File: Testing stripeTestAccounts.test.js
 * File location: test/functional/helpers/stripeTestAccounts.test.js
 */

var request = require('supertest'),
    expect = require('chai').expect,
    assert = require('chai').assert,
    stripeCards = require('../../helpers/stripeTestAccounts'),
    should = require('chai').should;


describe('stripeTestAccounts', function(){

  describe('action getRecDebit', function(){

    it('getRecDebitCard should return random card', function(done){
      var card = stripeCards.getRecDebitCard();
      expect(card).to.be.ok;
      done();
    });

    it('getRecDebitCard should return certain card', function(done){
      var card = stripeCards.getRecDebitCard(1);
      expect(card).to.be.ok;
      done();
    });

    it('getSuccessCard should return random card', function(done){
      var card1 = stripeCards.getSuccessCard();
      expect(card1).to.be.ok;
      done();
    });

    it('getSuccessCard should return certain card', function(done){
      var card = stripeCards.getSuccessCard(1);
      expect(card).to.be.ok;
      done();
    });


    it('getFailCard should return random card', function(done){
      var card1 = stripeCards.getFailCard();
      expect(card1).to.be.ok;
      done();
    });

    it('getFailCard should return certain card', function(done){
      var card = stripeCards.getFailCard(1);
      expect(card).to.be.ok;
      done();
    });


    it('getBankAccount should return random card', function(done){
      var card1 = stripeCards.getBankAccount();
      expect(card1).to.be.ok;
      done();
    });

    it('getBankAccount should return certain card', function(done){
      var card = stripeCards.getBankAccount(1);
      expect(card).to.be.ok;
      done();
    });



  });
});