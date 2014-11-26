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
    role: {
      type: 'string',
      defaultsTo: 'anonymous'
    },
    toJSON: function() {
      var obj = this.toObject();
      if(obj.auth)
        delete obj.auth.password;
      return obj;
    }
    
  }),
  
  beforeCreate: require('waterlock').models.user.beforeCreate,
  beforeUpdate: require('waterlock').models.user.beforeUpdate
};
