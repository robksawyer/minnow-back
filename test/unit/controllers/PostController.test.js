/**
 * Test File: Testing PostController
 * File location: test/controllers/PostController.test.js
 */
'use strict';

var DataService = require('../../../api/services/DataService'),
    loginHelper = require('../../helpers/login'),
    _ = require('lodash'),
    request = require('supertest'),
    chai = require('chai'),
    expect = chai.expect,
    should = chai.should(),
    assert = chai.assert;

describe('PostController', function(){

  var access_token = ''; //The test token
  it('should generate a token', function(done){
    loginHelper.getToken(1, function(token){
      access_token = token;
      expect(access_token).to.be.ok;
      done();
    });
  });

  describe('DataService requests', function(){

    describe('action getPost slug', function(){

      it('should have value', function(done){
        DataService.getPost({id:1}, function(err, post){
          assert(!err, err);
          expect(post.slug).to.exist;
        });
        done();
      });

    });

    describe('action getPosts', function(){

      it('should return posts', function(done){
        DataService.getPosts(null, 10, 0, function(err, posts){
          assert(!err, err);
          expect(posts.length).to.be.above(0);
        });
        done();
      });

      it('should be valid result', function(done){
        DataService.getPosts(null, 10, 0, function(err, posts){
          assert(!err, err);
          expect(posts[0].id).to.be.above(0);
        });
        done();
      });

      it('should have owner data', function(done){
        DataService.getPosts(null, 10, 0, function(err, posts){
          assert(!err, err);
          expect(posts[0].owner.id).to.be.above(0);
        });
        done();
      });

    });

    describe('action getPostUser', function(){

      it('should get proper result', function(done){
        DataService.getPostUser({id: 1}, function(err, res){
          assert(!err, err);
          expect(res.owner.id).to.be.equal(1);
        });
        done();
      });

    });
    
  });


  describe('action create', function(){

      it('should create a post', function(done){        
        var postData = global.fixtures.post[0];
        var tokenData = { access_token: access_token };
        var submissionData = _.merge(postData, tokenData);

        //Check the results before sending
        expect(submissionData.access_token).to.be.ok;
        delete submissionData.id;
        expect(submissionData.id).to.not.exist;

        //Delete other associated items
        delete submissionData.comments;
        expect(submissionData.comments).to.not.exist; 
        delete submissionData.owner;
        expect(submissionData.owner).to.not.exist;
        delete submissionData.flags;
        expect(submissionData.flags).to.not.exist;
        delete submissionData.purchases;
        expect(submissionData.purchases).to.not.exist;
        delete submissionData.likes;
        expect(submissionData.likes).to.not.exist;
        delete submissionData.secret;
        expect(submissionData.secret).to.not.exist;
        delete submissionData.slug;
        expect(submissionData.slug).to.not.exist;
        delete submissionData.createdAt;
        expect(submissionData.createdAt).to.not.exist;
        delete submissionData.updatedAt;
        expect(submissionData.updatedAt).to.not.exist;
        //
        submissionData.secret = {
          body: 'Some secret'
        };

        submissionData.body = 'Let\'s see if this works.';

        //Set the owner details
        submissionData.owner = 1;

        //Send the results
        request(sails.hooks.http.app)
            .post('/post/create')
            .send(submissionData)
            .expect(200)
            .end(function(err, res) {
                assert(!err, err);
                if (err) {
                  sails.log.error(err);
                }
                assert.typeOf(res, 'object');
                done(err);
            });
      });


      it('should FAIL to create a post', function(done){
        var postData = global.fixtures.post[0];
        var submissionData = postData;
        
        //Check the results before sending
        delete submissionData.id;
        expect(submissionData.id).to.not.exist;

        //Delete other associated items
        delete submissionData.comments;
        expect(submissionData.comments).to.not.exist; 
        delete submissionData.owner;
        expect(submissionData.owner).to.not.exist;
        delete submissionData.flags;
        expect(submissionData.flags).to.not.exist;
        delete submissionData.purchases;
        expect(submissionData.purchases).to.not.exist;
        delete submissionData.likes;
        expect(submissionData.likes).to.not.exist;
        delete submissionData.secret;
        expect(submissionData.secret).to.not.exist;
        delete submissionData.slug;
        expect(submissionData.slug).to.not.exist;
        delete submissionData.createdAt;
        expect(submissionData.createdAt).to.not.exist;
        delete submissionData.updatedAt;
        expect(submissionData.updatedAt).to.not.exist;
        //
      
        //Send the results
        request(sails.hooks.http.app)
            .post('/post/create')
            .send(submissionData)
            .expect(403)
            .end(function(err, res) {
                assert(!err, err);
                if (err) {
                  sails.log.error(err);
                  expect(err.status).to.be.equal(403);
                }
                done(err);
            });
      });


      it('should FAIL to create a post w/o content', function(done){
        var postData = global.fixtures.post[0];
        var tokenData = { access_token: access_token };
        var submissionData = _.merge(postData, tokenData);

        //Check the results before sending
        expect(submissionData.body).to.be.ok;
        delete submissionData.id;
        expect(submissionData.id).to.not.exist;
        delete submissionData.body;
        expect(submissionData.body).to.not.exist;

        //Delete other associated items
        delete submissionData.comments;
        expect(submissionData.comments).to.not.exist; 
        delete submissionData.owner;
        expect(submissionData.owner).to.not.exist;
        delete submissionData.flags;
        expect(submissionData.flags).to.not.exist;
        delete submissionData.purchases;
        expect(submissionData.purchases).to.not.exist;
        delete submissionData.likes;
        expect(submissionData.likes).to.not.exist;
        delete submissionData.secret;
        expect(submissionData.secret).to.not.exist;
        delete submissionData.slug;
        expect(submissionData.slug).to.not.exist;
        delete submissionData.createdAt;
        expect(submissionData.createdAt).to.not.exist;
        delete submissionData.updatedAt;
        expect(submissionData.updatedAt).to.not.exist;
        //
        

        //Send the results
        request(sails.hooks.http.app)
            .post('/post/create')
            .send(submissionData)
            .expect(403)
            .end(function(err, res) {
                assert(!err, err);
                if (err) {
                  sails.log.error(err);
                  expect(err.status).to.be.equal(403);
                }
                done(err);
            });
      });

    });

});