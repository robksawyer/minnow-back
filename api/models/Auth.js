/**
 * Auth
 *
 * @module      :: Model
 * @description :: Holds all authentication methods for a User
 * @docs        :: http://waterlock.ninja/documentation
 */

module.exports = {

  attributes: require('waterlock').models.auth.attributes({
    
    /* e.g.
    nickname: 'string'
    */
    email: {
      unique: false
    },
    phone: {
      unique: false
    },
    toJSON: function() {
      var obj = this.toObject();
      if(obj){
        delete obj.password;
        delete obj.email;
        delete obj.phone;
      }
      return obj;
    }

  }),
  
  beforeCreate: require('waterlock').models.auth.beforeCreate,
  beforeUpdate: require('waterlock').models.auth.beforeUpdate
};
