var request = require('supertest'),
    expect = require('chai').expect,
    login = require("./../../helpers/login"),
    _ = require('lodash'),
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
          {
              payload: '',
              status: 400
          },
          {
              payload: 'foobar',
              status: 400
          },
          {
              payload: {},
              status: 400
          },
          {
              payload: {
                  email: '',
                  password: '',
                  type: 'local'
              },
              status: 400
          },
          {
              payload: {
                  email: 'foo',
                  password: '',
                  type: 'local'
              },
              status: 400
          },
          {
              payload: {
                  email: '',
                  password: 'bar',
                  type: 'local'
              },
              status: 401
          },
          {
              payload: {
                  email: 'foo@gmail.com',
                  password: 'bar',
                  type: 'local'
              },
              status: 401
          },
          {
              payload: {
                  email: 'demo@gmail.com',
                  password: 'demodemodemo',
                  type: 'local'
              },
              status: 200
          },
          {
              payload: {
                  email: 'admin@gmail.com',
                  password: 'adminadminadmin',
                  type: 'local'
              },
              status: 200
          }
      ].forEach(function testCase(testCase, index) {
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

                              sails.log.error(typeof result.res.body);
                              expect(result.res.body).to.be.a('object');
      
                              done();
                          }
                      );
              });
          });
      });
    });
});