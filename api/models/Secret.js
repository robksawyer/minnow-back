/**
* Secret.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    body: {
      type: 'string'
    },
    price: {
      type: 'float'
    },
    status: {
      type: 'string',
      enum: ['hidden', 'public', 'private', 'banned'],
      defaultsTo: 'hidden'
    },
    post: {
      model: 'post'
    },
    toJSON: function() {
      var obj = this.toObject();
      if(obj){
        delete obj.body;
      }
      return obj;
    }
  },

  beforeCreate: function( values, next){
    // Encrypt the secret
    if(typeof values.body !== 'undefined'){
      var bcrypt = require('bcrypt');
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(values.body, salt);
      values.body = hash; 
    }   

    next();
  },

  beforeUpdate: function( values, next){
    // Encrypt the secret
    if(typeof values.body !== 'undefined'){
      var bcrypt = require('bcrypt');
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(values.body, salt);
      values.body = hash;    
    }

    next();
  }

};

