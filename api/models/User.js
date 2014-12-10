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
    // email, password are managed by waterlock via Auth.js. 
    // 
    emailConfirmationStatus: {
      type: 'boolean'
    },
    phoneConfirmationStatus: {
      type: 'boolean'
    },
    customerId: {
      type: 'string',
      unique: true
    },
    likes: {
      collection: 'like',
      via: 'owner'
    },
    flags: {
      collection: 'flag',
      via: 'owner'
    },
    comments: {
      collection: 'comment',
      via: 'owner'
    },
    posts: {
      collection: 'post',
      via: 'owner'
    },
    purchases: {
      collection: 'purchase',
      via: 'user'
    },
    status: {
      type: 'string',
      enum: ['active', 'unconfirmed', 'banned'],
      defaultsTo: 'active'
    },
    role: {
      type: 'string',
      enum: ['anonymous','admin','moderator'],
      defaultsTo: 'anonymous'
    },

    toJSON: function() {
      var obj = this.toObject();
      if(obj){
        delete obj.emailConfirmationStatus;
        delete obj.phoneConfirmationStatus;
        delete obj.customerId;
        delete obj.role;
        delete obj.status;
      }
      return obj;
    }
    
  }),
  
  beforeCreate: require('waterlock').models.user.beforeCreate,
  beforeUpdate: require('waterlock').models.user.beforeUpdate
};
