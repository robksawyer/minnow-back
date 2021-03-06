/**
* Secret.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var EncryptionService = require('../services/EncryptionService');

module.exports = {

  attributes: {
    body: {
      type: 'string'
    },
    price: {
      type: 'float',
      defaultsTo: 0.00
    },
    status: {
      type: 'string',
      enum: ['hidden', 'public', 'private', 'banned'],
      defaultsTo: 'hidden'
    },
    post: {
      model: 'post'
    },
    salt: {
      model: 'salt'
    },
    toJSON: function() {
      var obj = this.toObject();
      if(obj){
        delete obj.salt;
        delete obj.body;
      }
      return obj;
    }
  },

  beforeCreate: function(values, next){
    // Encrypt the secret
    if(typeof values.body !== 'undefined'){
      //Generate a key
      var salt = EncryptionService.generateKeySync();
      //Create the salt object
      values.salt = {
        value: salt
      };
      values.body = EncryptionService.encrypt(values.body, salt);
    }

    next();
  },

  beforeUpdate: function(values, next){
    sails.log(values);
    // Encrypt the secret
    if(typeof values.body !== 'undefined'){
      
      var salt = EncryptionService.generateKeySync();
      //Create the salt object
      values.salt = {
        value: salt
      };
      values.body = EncryptionService.encrypt(values.body, salt);
    }
    
    next();
  }

};

