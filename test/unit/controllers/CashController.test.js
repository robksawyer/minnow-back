'use strict';
/**
* Test File: Testing CashController
* File location: test/controllers/CashController.test.js
*/

var request = require('supertest'),
    stripeCards = require('../../helpers/stripeTestAccounts'),
    loginHelper = require('../../helpers/login'),
    expect = require('chai').expect,
    should = require('chai').should(),
    assert = require('chai').assert;


describe('CashController', function(){

  var access_token = ''; //The test token
  /*it('should generate a token', function(done){
    loginHelper.getToken(1, function(token){
      access_token = token;
    });
    expect(access_token).to.be.ok;
    done();
  });*/

  describe('action transfer', function(){

    it('should NOT fail', function(done){
      var payload = {
        amount: 100,
        sender: {
          recipient: {
            default_card: stripeCards.getSuccessCard()
          }
        },
        post: {
          id: 1
        },
        secret: {
          id: 3
        },
        receiver: {
          recipient: {
            id:1
          }
        },
        access_token: access_token 
      };
      request(sails.hooks.http.app)
            .post('/cash/transfer')
            .send(payload)
            .end(function(err, res) {
                if (err) {
                  done(err);
                }
                //sails.log.warn(res);
                expect(res.body).to.be.a('object');
                done();
            });
    }); 

  });

});