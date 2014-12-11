/**
 * Test File: Testing SecretController
 * File location: test/controllers/SecretController.test.js
 */
'use strict';

var DataService = require('../../../api/services/DataService'),
    EncryptionService = require('../../../api/services/EncryptionService'),
    PostData = require('../../fixtures/Post.json'),
    loginHelper = require('../../helpers/login'),
    request = require('supertest'),
    expect = require('chai').expect,
    should = require('chai').should, 
    assert = require('chai').assert;

describe('SecretController', function(){

  var access_token = ''; //The test token
  
  describe('should', function(){

    it('generate a token', function(done){
      loginHelper.getToken(1, function(token){
        access_token = token;
        expect(access_token).to.be.ok;

        done();
      });
    });

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


    it('update secret', function(done){
        var message =  'This is a new secret.';
        Secret.update({ post: 1, salt: 1 },
        {
          body: message,
          price: 110.00,
          post: 2
        }).exec(function(err, secrets){
          assert(!err, err);
          
          sails.log.warn(secrets);

          expect(message).to.be.ok;
          expect(secrets).to.not.equal(message);
          expect(secrets.salt.value).to.be.ok;

          done();
        });

    });

  });

});