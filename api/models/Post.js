/**
* Post.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    body: {
      type: 'string',
      required: true
    },
    secret: {
      model: 'secret'
    },
    slug: {
      type: 'string',
      unique: true
    },
    category:{
      type: 'string',
      enum: ['uncategorized', 'person', 'place', 'thing', 'other'],
      defaultsTo: 'uncategorized'
    },
    img: {
      type: 'json'
    },
    status: {
      type: 'string',
      enum: ['published', 'draft', 'banned'],
      defaultsTo: 'published'
    },
    likes: {
      collection: 'like',
      via: 'post'
    },
    flags: {
      collection: 'flag',
      via: 'post'
    },
    purchases: {
      collection: 'purchase',
      via: 'post'
    }, 
    comments: {
      collection: 'comment',
      via: 'post'
    },
    owner: {
      model: 'user'
    },
    toJSON: function() {
      var obj = this.toObject();
      if(obj)
        delete obj.secret;
      return obj;
    }
  },

  beforeCreate: function( values, next){

    // base64 encode the slug based on the nano time
    if (values.slug === null || values.slug === '') {
      var cuid = require('cuid');
      values.slug = cuid();
    }
    
    next();
  },

  afterValidation: function(values, next) {

    // base64 encode the slug based on the nano time
    if (values.slug === null || values.slug === '') {
      var cuid = require('cuid');
      values.slug = cuid();
    }

    next();
  }

};

