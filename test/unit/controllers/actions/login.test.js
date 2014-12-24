'use strict';

var proxyquire = require('proxyquire');
var chai = require('chai'),
    expect = chai.expect,
    should = chai.should(),
    assert = chai.assert;

describe('actions', function(){
  describe('login', function(){
    it('should assume auth method if only one is required', function(done){
      global.waterlock = {
        _utils: {
          countTopLevel: function(){
            return 1;
          },
          allParams: function(){
            return {};
          },
          accessObjectLikeArray: function(){
            return {
              authType: 'shake'
            };
          }
        },
        methods:{
          shake: {
            actions: {
              login: function(req, res){
                done();
              }
            }
          }
        }
      };
      var req = {};
      var res = {};
      var login = require('../../../../node_modules/waterlock/lib/controllers/actions/login');
      login.apply(this, [req, res]);
    });
    it('should call badRequest if authType is not found in waterlock.methods', function(done){
      global.waterlock = {
        _utils: {
          countTopLevel: function(){
            return 1;
          },
          allParams: function(){
            return {};
          },
          accessObjectLikeArray: function(){
            return {
              authType: 'NOT FOUND'
            };
          }
        },
        methods:{}
      };
      var req = {};
      var res = {
        badRequest: function(){
          done();
        }
      };
      var login = require('../../../../node_modules/waterlock/lib/controllers/actions/login');

      login.apply(this, [req, res]);
    });
    it('should call badRequest if authType is undefined', function(done){
      global.waterlock = {
        _utils: {
          countTopLevel: function(){
            return 1;
          },
          allParams: function(){
            return {};
          },
          accessObjectLikeArray: function(){
            return {
            };
          }
        },
        methods:{}
      };
      var req = {};
      var res = {
        badRequest: function(){
          done();
        }
      };
      var login = require('../../../../node_modules/waterlock/lib/controllers/actions/login');

      login.apply(this, [req, res]);
    });
    it('should trigger login on found waterlock.methods.*.actions', function(done){
      global.waterlock = {
        _utils: {
          countTopLevel: function(){
            return 2;
          },
          allParams: function(){
            return {type: 'shake'};
          },
          accessObjectLikeArray: function(){
            return {
            };
          }
        },
        methods:{
          shake:{
            actions: {
              login: function(){
                done();
              }
            }
          }
        }
      };
      var req = {};
      var res = {};
      var login = require('../../../../node_modules/waterlock/lib/controllers/actions/login');

      login.apply(this, [req, res]);
    });
    it('should trigger badRequest if params.type is not defined and multiple auth methods are defined', function(done){
      global.waterlock = {
        _utils: {
          countTopLevel: function(){
            return 2;
          },
          allParams: function(){
            return {};
          },
          accessObjectLikeArray: function(){
            return {
            };
          }
        },
        methods:{}
      };
      var req = {};
      var res = {
        badRequest: function(){
          done();
        }
      };
      var login = require('../../../../node_modules/waterlock/lib/controllers/actions/login');

      login.apply(this, [req, res]);
    });
  });
});