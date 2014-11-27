'use strict';
/**
 * Test File: Testing AuthController
 * File location: test/controllers/AuthController.test.js
 */

var request = require('supertest'),
    expect = require('chai').expect,
    login = require('./../../helpers/login'),
    Barrels = require('barrels'),
    barrels = new Barrels(),
    fixtures = barrels.data;


describe('AuthController', function AuthController() {
    describe('action login', function loginTest() {
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
              payload: 'foobar',
              status: 400
          },
          //4
          {
              payload: {},
              status: 400
          },
          //5
          {
              payload: { 
                  email: '',
                  password: '',
                  type: 'local'
              },
              status: 200
          },
          //6
          {
              payload: {
                  email: 'foo',
                  password: '',
                  type: 'local'
              },
              status: 403
          },
          //7
          {
              payload: {
                  email: '',
                  password: 'bar',
                  type: 'local'
              },
              status: 403
          },
          //8
          {
              payload: {
                  email: 'foo@gmail.com',
                  password: 'bar',
                  type: 'local'
              },
              status: 403
          },
          //9
          {
              payload: {
                  email: 'demo@gmail.com',
                  password: 'demodemodemo',
                  type: 'local'
              },
              status: 200
          },
          //10
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
              it('should return expected HTTP status and object as response body', function it(done) {
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
    });
});