'use strict';
/**
 * Test File: Testing Crypto
 * File location: test/models/Crypto.test.js
 */
 
var crypto = require('crypto'),
    expect = require('chai').expect,
    should = require('chai').should,
    assert = require('chai').assert;

var key = 'Right away sir',
    message = 'My coffee please';

describe('Crypto', function purchaseModel(){

 describe('should', function(){

    it('verify secret', function(done){
      expect(key).to.equal('Right away sir');
      done();
    });

    it('verify key', function(done){
      expect(message).to.equal('My coffee please');
      done();
    });

    it('encrypt (aes-256-cbc)', function(done){

      var cipher = crypto.createCipher('aes-256-cbc', key);
      var encrypted = cipher.update(message,'utf8','hex');
      encrypted += cipher.final('hex');

      expect(encrypted).to.not.equal(message);
      expect(encrypted).to.have.length.above(5);

      //sails.log('Encrypting "%s" using passphrase "%s": %s', message, key, encrypted);

      done();
    });

    it('decrypt (aes-256-cbc)', function(done){

      var cipher = crypto.createCipher('aes-256-cbc', key);
      var encrypted = cipher.update(message,'utf8','hex');
      encrypted += cipher.final('hex');

      var decipher = crypto.createDecipher('aes-256-cbc', key);

      var decrypted = decipher.update(encrypted,'hex','utf8');
      decrypted += decipher.final('utf8');

      expect(decrypted).to.equal(message);

      //sails.log('Decrypted "%s" using passphrase "%s": %s', message, key, decrypted);

      done();
    });

  });
});