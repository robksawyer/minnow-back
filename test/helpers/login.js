'use strict';

var request = require('supertest'),
    config = require('../waterlock').waterlock,
    proxyquire = require('proxyquire'),
    jwt = require('../../node_modules/waterlock/lib/controllers/actions/jwt');

/**
 * Generic helper function to authenticate specified user with current sails testing instance. Function
 * will call specified callback function with response (res) body, which contains all necessary user data
 * and Json Web Token, which is required to make actual API calls to backend.
 *
 * @param   {String}    user    User which to use within login
 * @param   {Function}  next    Callback function which is called after login attempt
 */
module.exports.authenticate = function (user, next) {

    // Static credential information, which are used within tests.
    var credentials = {
        demo: {
            phone: '1113332222',
            password: 'demodemodemo',
            type: 'local'
        },
        facebook_user: {
            facebookId: '32234234234234234',
            type: 'facebook'
        },
        admin: {
            email: 'me@me.com',
            password: 'adminadminadmin',
            type: 'local'
        }
    };

    sails.log.warn('Authenticating user with the following details:');
    sails.log.warn(credentials[user]);

    request(sails.hooks.http.app)
        .post('/auth/login')
        .send(credentials[user])
        .set('Content-Type', 'application/json')
        .expect(200)
        .end(
            function(err, result) {
                if (err) {
                    sails.log.error(err);
                    next(err);
                } else {
                    sails.log(result.res);
                    next(null, result.res.body);
                }
            }
        );
};

module.exports.getToken = function (user, next){
    if(typeof user !== 'string') {
        user = 'demo';
    }

    var credentials = {
        demo: {
            phone: '1113332222',
            password: 'demodemodemo',
            type: 'local'
        },
        facebook_user: {
            facebookId: '32234234234234234',
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
        .send(credentials[user])
        .set('Content-Type', 'application/json')
        .expect(200)
        .end(
            function(error, result) {
                if (error) {
                    sails.log.error(error);
                    next(error);
                } else {
                    sails.log(result.res.body);
                    next(null, result.res.body);
                }
            }
        );
};

module.exports.getToken = function (userId, next){
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

