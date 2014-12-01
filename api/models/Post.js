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
      type: 'string'
    },
    price: {
      type: 'float'
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
    // Generate and sanitanize slug
    var getSlug = require('speakingurl');
    var bcrypt = require('bcrypt');
    if (values.slug === null || values.slug === '') {
      values.slug = values.body.toString().substr(0,15);
    }
    values.slug = getSlug(values.slug);
    values.slug = bcrypt.hashSync(values.slug, 8);

    next();
  },

  afterValidation: function(values, next) {

    // Generate and sanitanize slug
    var getSlug = require('speakingurl');
    var bcrypt = require('bcrypt');
    if (values.slug === null || values.slug === '') {
      values.slug = values.title;
    }
    values.slug = getSlug(values.slug);
    values.slug = bcrypt.hashSync(values.slug, 8);

    next();
  }

};

