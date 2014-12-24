'use strict';

var proxyquire = require('proxyquire');
var chai = require('chai'),
    expect = chai.expect,
    should = chai.should(),
    assert = chai.assert;
var config = require('../../../waterlock').waterlock;

describe('actions', function(){
  describe('jwt', function(){
    var jwt =  require('../../../../node_modules/waterlock/lib/controllers/actions/jwt');
    it('should return forbidden if session not authenticated', function(done){
      var req = {
        session:{
          authenticated: false
        }
      };
      var res = {
        forbidden:function(str){
          str.should.be.a('string');
          done();
        }
      };
      jwt(req, res);
    });
    it('should create a jwt', function(done){
      var req = {
        session:{
          authenticated: true,
          user:{
            id: 1
          }
        }
      };
      var res = {
        json:function(obj){
          obj.should.be.a('object');
          obj.should.have.property('token');
          obj.should.have.property('expires');
          obj.token.should.be.a('string');
          done();
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
      global.waterlock = {config: config};

      jwt.apply(this, [req, res]);
    });
    it('should return a serverError if a jwt cannot be created', function(done){
      var req = {
        session:{
          authenticated: true,
          user:{
            id: 1
          }
        }
      };
      var res = {
        serverError:function(str){
          str.should.be.a('string');
          done();
        }
      };
      global.Jwt = {
        create: function(){
          return {
            exec: function(cb){
              cb('agh');
            }
          };
        }
      };
      global.waterlock = {config: config};

      jwt.apply(this, [req, res]);
    });
  });
});