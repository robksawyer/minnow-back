'use strict';

var proxyquire = require('proxyquire');
var chai = require('chai'),
    expect = chai.expect,
    should = chai.should(),
    assert = chai.assert;

describe('actions', function(){
  describe('logout', function(){
    it('should trigger default logout if params.type is undefined', function(done){
      global.waterlock ={
        _utils: {
          allParams: function(){
            return {};
          }
        },
        cycle: {
          logout: function(){
            done();
          }
        }
      };

      var req = {};
      var res = {};
      var logout = require('../../../../node_modules/waterlock/lib/controllers/actions/logout');

      logout.apply(this, [req, res]);
    });
    it('should trigger default logout if params.type is cannot be found', function(done){
      global.waterlock ={
        _utils: {
          allParams: function(){
            return {type: 'NOPE'};
          }
        },
        cycle: {
          logout: function(){
            done();
          }
        },
        methods: {
          shake:{
            actions:{
              logout: function(){
                done();
              }
            }
          }
        }
      };

      var req = {};
      var res = {};
      var logout = require('../../../../node_modules/waterlock/lib/controllers/actions/logout');

      logout.apply(this, [req, res]);
    });
    it('should trigger auth methods logout', function(done){
      global.waterlock ={
        _utils: {
          allParams: function(){
            return {type: 'shake'};
          }
        },
        cycle: {
          logout: function(){
            done();
          }
        },
        methods: {
          shake:{
            actions:{
              logout: function(){
                done();
              }
            }
          }
        }
      };

      var req = {};
      var res = {};
      var logout = require('../../../../node_modules/waterlock/lib/controllers/actions/logout');

      logout.apply(this, [req, res]);
    });
  });
});