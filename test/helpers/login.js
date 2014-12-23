'use strict';

var request = require('supertest'),
    config = require('../../config/waterlock').waterlock,
    jwt = require('../../node_modules/waterlock/lib/controllers/actions/jwt'),
    chai = require('chai'),
    expect = chai.expect,
    should = chai.should(),
    assert = chai.assert;

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

    assert(credentials[user], 'object');

    request(sails.hooks.http.app)
        .post('/auth/login')
        .set('Content-Type', 'application/json')
        .send(credentials[user])
        .expect(200)
        .end(
            function(error, result) {
                if (error) {
                    sails.log.error(error);
                    next(error);
                } else {
                    sails.log.warn(result.res);
                    next(null, result.res.body);
                }
            }
        );
};

/*module.exports.getToken = function (next){
    request(sails.hooks.http.app)
            .get('/user/jwt')
            .set('Content-Type', 'application/json')
            .expect(200)
            .end(
                function(error, token) {
                    if (error) {
                        sails.log.error(error);
                        next(error);
                    } else {
                        sails.log.warn(token);
                        next(null, token.res.body);
                    }
                }
            );
};*/

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

