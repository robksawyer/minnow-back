'use strict';
/**
* Test File: Testing CashController
* File location: test/controllers/CashController.test.js
*/

var request = require('supertest'),
    expect = require('chai').expect,
    should = require('chai').should,
    assert = require('chai').assert;


describe('CashController', function(){

  describe('action transfer', function(){

    it('should NOT fail', function(done){
      var payload = {
        amount: 100
      };
      /*request(sails.hooks.http.app)
                      .post('/cash/transfer')
                      .send(payload)
                      .end(function(err, res) {
                          if (err) {
                            done(err);
                          }
                          expect(res.res.body).to.be.a('object');
                          done();
                      });*/
      done();
    }); 

  });

});