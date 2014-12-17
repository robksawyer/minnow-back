'use strict';
/* jshint unused:false */

/**
 * hasJsonWebToken
 *
 * @module      :: Policy
 * @description :: Assumes that your request has an jwt;
 *
 * @docs        :: http://waterlock.ninja/documentation
 */
module.exports = function(req, res, next) {
  require('waterlock').validator.validateTokenRequest(req, function(err, user){
    sails.log.warn("Validating token");
    sails.log.warn(user);
    if(err){
      return res.forbidden(err);  
    }

    // valid request
    next();
  });
};
