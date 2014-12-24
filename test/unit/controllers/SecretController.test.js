/**
 * Test File: Testing SecretController
 * File location: test/controllers/SecretController.test.js
 */
'use strict';

var DataService = require('../../../api/services/DataService'),
    EncryptionService = require('../../../api/services/EncryptionService'),
    loginHelper = require('../../helpers/login'),
    request = require('supertest'),
    chai = require('chai'),
    expect = chai.expect,
    should = chai.should(),
    assert = chai.assert;

describe('SecretController', function(){

  var access_token = ''; //The test token
  
  describe('should', function(){

    /*it('generate a token', function(done){
      loginHelper.getToken(1, function(token){
        access_token = token;
        expect(access_token).to.be.ok;

        done();
      });
    });*/

    it('generate a key', function(done){
      var salt = EncryptionService.generateKeySync();
      expect(salt).to.be.ok;
      expect(salt).to.have.length.above(7);
      done();
    });

    it('create secret', function(done){
        var message =  'This is a secret.';
        Secret.create({
          body: message,
          price: 101.00,
          post: 1
        }).exec(function(err, secret){
          assert(!err, err);
          
          expect(message).to.be.ok;
          expect(secret).to.not.equal(message);
          expect(secret.salt.value).to.be.ok;

          done();
        });

    });


    it('update secrets', function(done){
        var message =  'This is a new secret.';
        Secret
          .update(
            {id: 1},
            {
              body: message,
              price: 110.00,
              post: 2
            }
          )
          .exec(function(err, updated){
            assert(!err, err);
      
            expect(message).to.be.ok;
            expect(updated.length).to.be.above(0);
            //Ensure the secret was hashed
            expect(updated[0].body).to.not.equal(message);
            expect(updated[0].salt.value).to.be.ok;

            done();
          });

    });


    it('update encrypt secret when updating', function(done){
        var message =  'This is a new secret.';
        Secret
          .update(
            {id: 1},
            {
              body: message,
            }
          )
          .exec(function(err, updated){
            assert(!err, err);
      
            //Ensure the secret was hashed
            expect(updated[0].body).to.not.equal(message);
            expect(updated[0].salt.value).to.be.ok;

            done();
          });

    });

  });

});