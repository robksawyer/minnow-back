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

    email: {
      type: 'string',
      unique: true
    },
    phone: {
      type: 'string',
      unique: true
    },
    facebookId: { 
      type: 'string',
      unique: true
    },
    emailConfirmationStatus: {
      type: 'string',
      defaultsTo: 'unconfirmed'
    },
    phoneConfirmationStatus: {
      type: 'string',
      defaultsTo: 'unconfirmed'
    },
    likes: {
      type: 'int',
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
    toJSON: function() {
      var obj = this.toObject();
      delete obj.auth.password;
      return obj;
    }
    
  }),
  
  beforeCreate: require('waterlock').models.user.beforeCreate,
  beforeUpdate: require('waterlock').models.user.beforeUpdate
};
