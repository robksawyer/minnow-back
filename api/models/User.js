/**
 * User
 *
 * @module      :: Model
 * @description :: This is the base user model
 * @docs        :: http://waterlock.ninja/documentation
 */

//var uuid = require('uuid');

module.exports = {

  attributes: require('waterlock').models.user.attributes({

    // 
    // email, password are managed by waterlock.
    // 
    phone: {
      type: 'string',
      unique: true
    },
    emailConfirmationStatus: {
      type: 'boolean'
    },
    phoneConfirmationStatus: {
      type: 'boolean'
    },
    customer: {
      type: 'json'
    },
    recipient: {
      type: 'json'
    },
    likes: {
      type: 'integer',
      defaultsTo: 0
    },
    comments: {
      collection: 'comment',
      via: 'owner'
    },
    posts: {
      collection: 'post',
      via: 'owner'
    },
    status: {
      type: 'string',
      enum: ['active', 'unconfirmed', 'banned'],
      defaultsTo: 'active'
    },
    roles: {
      type: 'array',
      enum: ['anonymous','admin','moderator'],
      defaultsTo: ['anonymous']
    }
    
  }),
  
  beforeCreate: require('waterlock').models.user.beforeCreate,
  beforeUpdate: require('waterlock').models.user.beforeUpdate
};
