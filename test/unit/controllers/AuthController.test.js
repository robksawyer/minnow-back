'use strict';
/**
 * Test File: Testing AuthController
 * File location: test/controllers/AuthController.test.js
 */

var request = require('supertest'),
    https = require('follow-redirects').https,
    expect = require('chai').expect,
    assert = require('chai').assert,
    should = require('chai').should(),
    login = require('./../../helpers/login');


describe('AuthController', function AuthController() {

    describe('action login (empty data)', function loginTest() {
      [
          {
              payload: null, 
              status: 400
          },
          //2
          {
              payload: '', 
              status: 400
          },
          //3
          {
              payload: {},
              status: 400
          },
          {
              payload: 'foobar',
              status: 400
          }
      ].forEach(function testCaseFunc(testCase, index) {
          describe('with testCase #' + (parseInt(index, 10) + 1), function loginTest() {
              it('should return expected HTTP status ' + testCase.status + ' and object as response body', function it(done) {
                  request(sails.hooks.http.app)
                      .post('/auth/login')
                      .send(testCase.payload)
                      .expect(testCase.status)
                      .end(function(err, res) {
                          if (err) {
                            sails.log.error(err);
                            done(err);
                          }
                          expect(res.res.body).to.be.a('object');
                          done();
                      });
              });
          });
      });
    });
  
    describe('action facebook login', function(){
      
      it('should redirect to auth/facebook_oauth2', function(done){
          request(sails.hooks.http.app)
            .get('/auth/login?type=facebook')
            .end(
              function(err, res) {
                assert(!err, err);
                if(err){
                  done(err);
                }
                assert.include(res.header.location, 'https://www.facebook.com/dialog/oauth?client_id=');
                assert.equal(res.statusCode, 302);
                done();
              }
            );
      });

      //TODO: Figure out how to make this check the results after the redirect.
      /*it('should have valid results', function(done){
  
          https.get('https://www.facebook.com/dialog/oauth?client_id='+process.env.FACEBOOK_APP_ID+'&redirect_uri=http%3A%2F%2Flocalhost%3A1337%2Fauth%2Ffacebook_oauth2&response_type=code&scope=public_profile%2Cemail', function(res){
              sails.log.error(res);
              var buffy;
              res.on('data', function(chunk) {
                buffy += chunk;
              });

              res.on('end', function(d) {
                var data = JSON.parse(buffy);
                sails.log.warn('Received data', data);
                setTimeout(function() {
                   sails.log.warn(data);
                }, 60000);
              });

            }).on('error', function(e){
              sails.log.error(e);
            });
            done();
        });*/

    });

    /*describe('action login (some data)', function loginTest(validationError) {
      [
          {
              payload: { 
                  email: '',
                  password: '',
                  type: 'local'
              },
              status: 200
          }
      ].forEach(function testCaseFunc(testCase, index) {
          describe('with testCase #' + (parseInt(index, 10) + 1), function loginTest() {
              it('should return error as response', function it(done) {
                  request(sails.hooks.http.app)
                      .post('/auth/login')
                      .send(testCase.payload)
                      //.expect.to.throw(validationError)
                      .end(
                          function(err, result) {
                              //should.exist(err);
                              sails.log.warn(err);
                              //expect(result.res.body).to.be.a('object');
                              //expect.to.throw(Error);

                              done();
                          }
                      );
              });
          });
      });
    });*/

    /*describe('action login (more data)', function loginTest() {
      [
          //1
          {
              payload: {
                  email: 'foo',
                  password: '',
                  type: 'local'
              },
              status: 403
          },
          //2
          {
              payload: {
                  email: '',
                  password: 'bar',
                  type: 'local'
              },
              status: 403
          },
          //3
          {
              payload: {
                  email: 'foo@gmail.com',
                  password: 'bar',
                  type: 'local'
              },
              status: 403
          },
          //4
          {
              payload: {
                  email: 'demo@gmail.com',
                  password: 'demodemodemo',
                  type: 'local'
              },
              status: 200
          },
          //5
          {
              payload: {
                  email: 'admin@gmail.com',
                  password: 'adminadminadmin',
                  type: 'local'
              },
              status: 200
          }
      ].forEach(function testCaseFunc(testCase, index) {
          describe('with testCase #' + (parseInt(index, 10) + 1), function loginTest() {
              it('should return expected HTTP status ' + testCase.status + ' and object as response body', function it(done) {
                  request(sails.hooks.http.app)
                      .post('/auth/login')
                      .send(testCase.payload)
                      .expect(testCase.status)
                      .end(
                          function(error, result) {
                              if (error) {
                                return done(error);
                              }
                      
                              expect(result.res.body).to.be.a('object');
                              
                              done();
                          }
                      );
              });
          });
      });
    });*/

    

});