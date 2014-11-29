'use strict';
/**
 * Test File: Testing AuthController
 * File location: test/controllers/AuthController.test.js
 */

var request = require('supertest'),
    expect = require('chai').expect,
    should = require('chai').should,
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
                      .end(
                          function(err, result) {
                              if (err) {
                                return done(err);
                              }
                              expect(result.res.body).to.be.a('object');

                              done();
                          }
                      );
              });
          });
      });
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