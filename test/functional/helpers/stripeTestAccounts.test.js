'use strict';
/**
 * Test File: Testing stripeTestAccounts.test.js
 * File location: test/functional/helpers/stripeTestAccounts.test.js
 */

var request = require('supertest'),
    stripeCards = require('../../helpers/stripeTestAccounts'),
    chai = require('chai'),
    expect = chai.expect,
    should = chai.should(),
    assert = chai.assert;


describe('StripeHelper', function(){

  describe('stripeTestAccounts', function(){

    describe('action getRecDebit', function(){

      it('should return random card', function(done){
        var card = stripeCards.getRecDebitCard();
        expect(card).to.be.ok;
        done();
      });

      it('should return certain card', function(done){
        var card = stripeCards.getRecDebitCard(1);
        expect(card).to.be.ok;
        done();
      });
    });

    describe('action getSuccessCard', function(){

      it('should return random card', function(done){
        var card1 = stripeCards.getSuccessCard();
        expect(card1).to.be.ok;
        done();
      });

      it('should return certain card', function(done){
        var card = stripeCards.getSuccessCard(1);
        expect(card).to.be.ok;
        done();
      });
    });

    describe('action getFailCard', function(){

      it('should return random card', function(done){
        var card1 = stripeCards.getFailCard();
        expect(card1).to.be.ok;
        done();
      });

      it('should return certain card', function(done){
        var card = stripeCards.getFailCard(1);
        expect(card).to.be.ok;
        done();
      });

    });

    describe('action getBankAccount', function(){

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
});