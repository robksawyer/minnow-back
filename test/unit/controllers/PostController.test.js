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
        DataService.getPost({id:1}, 10, 0, function(err, post){
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
        DataService.getPostUser({id: 1}, 10, 0, function(err, res){
          assert(!err, err);
          expect(res.owner.id).to.eql(1);
        });
        done();
      });

    });
    
  });


  describe('action create', function(){

      it('should create a post', function(done){        
        var postData = global.fixtures.Post[0];
        var tokenData = { access_token: access_token };
        var submissionData = _.merge(postData, tokenData);

        //Check the results before sending
        expect(submissionData.access_token).to.be.ok;
        delete submissionData.id;
        expect(submissionData.id).to.not.exist;

        //Send the results
        request(sails.hooks.http.app)
            .post('/post/create')
            .send(submissionData)
            .expect(200)
            .end(function(err, res) {
                    assert(!err, err);
                    if (err) {
                      sails.log.error(err);
                      done(err);
                    }
                    expect(res.body).to.be.a('object');
                    done();
            });
      });


      it('should FAIL to create a post', function(done){
        var postData = global.fixtures.Post[0];
        var submissionData = postData;
      
        //Check the results before sending
        delete submissionData.id;
        expect(submissionData.id).to.not.exist;

        //Send the results
        request(sails.hooks.http.app)
            .post('/post/create')
            .send(submissionData)
            .expect(403)
            .end(function(err, res) {
                    assert(!err, err);
                    if (err) {
                      sails.log.error(err);
                      done(err);
                    }
                    expect(res.body).to.be.undefined;
                    done();
            });
      });


      it('should FAIL to create a post', function(done){
        var postData = global.fixtures.Post[0];
        var tokenData = { access_token: access_token };
        var submissionData = _.merge(postData, tokenData);
      
        //Check the results before sending
        expect(submissionData.body).to.be.ok;
        delete submissionData.id;
        expect(submissionData.id).to.not.exist;
        delete submissionData.body;
        expect(submissionData.body).to.not.exist;

        //Send the results
        request(sails.hooks.http.app)
            .post('/post/create')
            .send(submissionData)
            .expect(400)
            .end(function(err, res) {
                    assert(!err, err);
                    if (err) {
                      sails.log.error(err);
                      done(err);
                    }
                    expect(res.body).to.be.a('object');
                    done();
            });
      });

    });

});