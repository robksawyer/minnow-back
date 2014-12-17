'use strict';

var request = require('supertest'),
    config = require('../../config/waterlock').waterlock,
    jwt = require('../../node_modules/waterlock/lib/controllers/actions/jwt');

/**
 * Generic helper function to authenticate specified user with current sails testing instance. Function
 * will call specified callback function with response (res) body, which contains all necessary user data
 * and Json Web Token, which is required to make actual API calls to backend.
 *
 * @param   {String}    user    User which to use within login
 * @param   {Function}  next    Callback function which is called after login attempt
 */
module.exports.authenticate = function authenticate(user, next) {
    // Static credential information, which are used within tests.
    var credentials = {
        demo: {
            email: 'demo@demo.com',
            password: 'demodemodemo',
            type: 'local'
        },
        facebook_user: {
            type: 'facebook'
        },
        admin: {
            email: 'me@me.com',
            password: 'adminadminadmin',
            type: 'local'
        }
    };

    request(sails.hooks.http.app)
        .post('/auth/login')
        .set('Content-Type', 'application/json')
        .send(credentials[user])
        .expect(200)
        .end(
            function(error, result) {
                if (error) {
                    next(error);
                } else {
                    next(null, result.res.body);
                }
            }
        );
};

module.exports.getToken = function getToken(userId, next){
    if(!userId) {
        userId = 1;
    }
    var req = {
      session:{
        authenticated: true,
        user:{
          id: userId
        }
      }
    };
    var res = {
      json:function(obj){
        next(obj.token);
      }
    };
    global.Jwt = {
      create: function(){
        return {
          exec: function(cb){
            cb(null);
          }
        };
      }
    };
    global.waterlock = {
        config: config
    };
    jwt.apply(this, [req, res]);
};