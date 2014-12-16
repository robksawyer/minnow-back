/**
 * Test File: Testing UserController
 * File location: test/controllers/UserController.test.js
 */
'use strict';

var DataService = require('../../../api/services/DataService');
var request = require('supertest'),
    chai = require('chai'),
    expect = chai.expect,
    should = chai.should(),
    assert = chai.assert;

describe('UserController', function(){

  describe('Model', function(){
    it('should have attributes', function(done){
      sails.log.warn(User);
      User.findOne()
        .where({id: 1})
        .populate('likes')
        .populate('comments')
        .populate('posts')
        .populate('purchases')
        .then(function(res){

            res = res.toJSON();

            expect(res).to.have.property('id');
            expect(res).to.not.have.property('emailConfirmationStatus');
            expect(res).to.not.have.property('phoneConfirmationStatus');
            expect(res).to.not.have.property('customerId');
            expect(res).to.have.property('likes');
            expect(res).to.have.property('comments');
            expect(res).to.have.property('posts');
            expect(res).to.not.have.property('status');
            expect(res).to.not.have.property('role');
            expect(res).to.have.property('createdAt');
            expect(res).to.have.property('updatedAt');

            done();
        })
        .catch(done);
        
    });
  });

  describe('DataService requests', function(){

    describe('action getUsers', function(){
    
      it('should not be empty', function(done){
        DataService.getUsers(null, function(err, users){
          assert(!err, err);
          expect(users.length).to.be.above(0);
          done();
        });
      });

      it('should be valid', function(done){
        DataService.getUsers(null, function(err, users){
          assert(!err, err);
          expect(users[0].id).to.be.above(0);
          done();
        });
      });

    });

    describe('action getUserSignInData', function(){
    
      it('should not be empty', function(done){
        DataService.getUserSignInData(1, function(err, users){
          assert(!err, err);
          expect(users.length).to.be.above(0);
          done();
        });
      });

      it('should be valid', function(done){
        DataService.getUserSignInData(1, function(err, users){
          assert(!err, err);
          expect(users[0].id).to.be.above(0);
          done();
        });
      });

    });

  });

});
 