'use strict';

var request = require('supertest');
var expect = require('chai').expect;
var login = require("./../../helpers/login");
var _ = require('lodash');

describe('Generic controller test', function controllerTest() {
    [
        {
            controller: 'PostController',
            url: '/post/',
            identifier: 2,
            count: 48,
            data: {
                identifier: {
                    releaseDate: new Date("1937-01-01T00:00:00.000Z"),
                    secret: "The Hobbit",
                    type: "movie",
                    price: 1.00,
                    content: "I just saw the best movie ever. Want a reccomendation?",
                    user: 1
                },
                newRecord: {
                    releaseDate: new Date("1885-01-01T00:00:00.000Z"),
                    secret: "He was rear-ended!",
                    type: "punchline",
                    price: 100.00,
                    content: "What kind of accident did the proctologist have?",
                    user: 2
                }
            }
        },
        {
            controller: 'CommentController',
            url: '/comment/',
            identifier: 1,
            count: 1,
            data: {
                identifier: {
                    avatar: 1,
                    owner: 3,
                    post: 1,
                    message: "The movie was great, thanks for the reccomendation."
                },
                newRecord: {
                    avatar: 4,
                    owner: 5,
                    post: 2,
                    message: "That joke was poop."
                }
            }
        },
        {
            controller: 'UserController',
            url: '/user/',
            identifier: 1,
            count: 2,
            data: {
                identifier: {
                    email: "admin@some.domain",
                    role: 'anonymous',
                    auth: 1
                },
                newRecord: {
                    email: "schwarzenegger@some.domain",
                    role: 'anonymous',
                    auth: 2
                },
                updateRecord: {
                    email: "stallone@some.domain",
                    role: 'admin',
                    auth: 3
                }

            }
        }
    ].forEach(function testCase(testCase) {
        describe('for \'' + testCase.controller + '\' API endpoints', function controllerTest() {
            describe('with invalid headers', function withInvalidAuthorizationHeaders() {
                describe('GET ' + testCase.url, function getRequestTests() {
                    describe('no authorization header given', function getRequest() {
                        describe('GET ' + testCase.url, function getRequest() {
                            it('should complain about missing authorization header', function it(done) {
                                request(sails.hooks.http.app)
                                    .get(testCase.url)
                                    .set('Content-Type', 'application/json')
                                    .expect(401)
                                    .end(
                                        function end(error, result) {
                                            if (error) {
                                                return done(error);
                                            }
    
                                            expect(result.res.body.message).to.equal('No authorization header was found');
    
                                            done();
                                        }
                                    );
                            });
                        });
                    });
                    
                    describe('invalid format on authorization header', function getRequest() {
                        it('should complain about wrong format', function it(done) {
                            request(sails.hooks.http.app)
                                .get(testCase.url)
                                .set('Authorization', 'foobar123')
                                .set('Content-Type', 'application/json')
                                .expect(401)
                                .end(
                                    function end(error, result) {
                                        if (error) {
                                            return done(error);
                                        }

                                        expect(result.res.body.message).to.equal('Invalid authorization header format. Format is Authorization: Bearer [token]');

                                        done();
                                    }
                                );
                        });
                    });

                    describe('authorization header with valid format', function getRequest() {
                        it('should complain about not valid authorization token', function it(done) {
                            request(sails.hooks.http.app)
                                .get(testCase.url)
                                .set('Authorization', 'bearer foobar123')
                                .set('Content-Type', 'application/json')
                                .expect(401)
                                .end(
                                    function end(error, result) {
                                        if (error) {
                                            return done(error);
                                        }

                                        expect(result.res.body.message).to.equal('Given authorization token is not valid');

                                        done();
                                    }
                                );
                        });
                    });
                });

                describe('GET ' + testCase.url + testCase.identifier, function getRequestTests() {
                    describe('no authorization header given', function withoutAuthorizationHeader() {
                        it('should complain about missing authorization header', function it(done) {
                            request(sails.hooks.http.app)
                                .get(testCase.url + testCase.identifier)
                                .set('Content-Type', 'application/json')
                                .expect(401)
                                .end(
                                    function end(error, result) {
                                        if (error) {
                                            return done(error);
                                        }

                                        expect(result.res.body.message).to.equal('No authorization header was found');

                                        done();
                                    }
                                );
                        });
                    });

                    describe('invalid format on authorization header', function getRequest() {
                        it('should complain about wrong format', function it(done) {
                            request(sails.hooks.http.app)
                                .get(testCase.url + testCase.identifier)
                                .set('Authorization', 'foobar123')
                                .set('Content-Type', 'application/json')
                                .expect(401)
                                .end(
                                    function end(error, result) {
                                        if (error) {
                                            return done(error);
                                        }

                                        expect(result.res.body.message).to.equal('Invalid authorization header format. Format is Authorization: Bearer [token]');

                                        done();
                                    }
                                );
                        });
                    });

                    describe('authorization header with valid format', function getRequest() {
                        it('should complain about not valid authorization token', function it(done) {
                            request(sails.hooks.http.app)
                                .get(testCase.url + testCase.identifier)
                                .set('Authorization', 'bearer foobar123')
                                .set('Content-Type', 'application/json')
                                .expect(401)
                                .end(
                                    function end(error, result) {
                                        if (error) {
                                            return done(error);
                                        }

                                        expect(result.res.body.message).to.equal('Given authorization token is not valid');

                                        done();
                                    }
                                );
                        });
                    });
                });

                describe('GET ' + testCase.url + 'count', function getRequestTests() {
                    describe('no authorization header given', function getRequest() {
                        it('should complain about missing authorization header', function it(done) {
                            request(sails.hooks.http.app)
                                .get(testCase.url + 'count')
                                .set('Content-Type', 'application/json')
                                .expect(401)
                                .end(
                                    function end(error, result) {
                                        if (error) {
                                            return done(error);
                                        }

                                        expect(result.res.body.message).to.equal('No authorization header was found');

                                        done();
                                    }
                                );
                        });
                    });

                    describe('invalid format on authorization header', function getRequest() {
                        it('should complain about wrong format', function it(done) {
                            request(sails.hooks.http.app)
                                .get(testCase.url + 'count')
                                .set('Authorization', 'foobar123')
                                .set('Content-Type', 'application/json')
                                .expect(401)
                                .end(
                                function end(error, result) {
                                    if (error) {
                                        return done(error);
                                    }

                                    expect(result.res.body.message).to.equal('Invalid authorization header format. Format is Authorization: Bearer [token]');

                                    done();
                                }
                            );
                        });
                    });

                    describe('authorization header with valid format', function getRequest() {
                        it('should complain about not valid authorization token', function it(done) {
                            request(sails.hooks.http.app)
                                .get(testCase.url + 'count')
                                .set('Authorization', 'bearer foobar123')
                                .set('Content-Type', 'application/json')
                                .expect(401)
                                .end(
                                    function end(error, result) {
                                        if (error) {
                                            return done(error);
                                        }

                                        expect(result.res.body.message).to.equal('Given authorization token is not valid');

                                        done();
                                    }
                                );
                        });
                    });
                });

                describe('POST ' + testCase.url, function postRequestTests() {
                    describe('no authorization header given', function postRequest() {
                        it('should complain about missing authorization header', function it(done) {
                            request(sails.hooks.http.app)
                                .post(testCase.url)
                                .set('Content-Type', 'application/json')
                                .send(testCase.data.identifier)
                                .expect(401)
                                .end(
                                    function end(error, result) {
                                        if (error) {
                                            return done(error);
                                        }

                                        expect(result.res.body.message).to.equal('No authorization header was found');

                                        done();
                                    }
                                );
                        });
                    });

                    describe('invalid format on authorization header', function postRequest() {
                        it('should complain about wrong format', function it(done) {
                            request(sails.hooks.http.app)
                                .post(testCase.url)
                                .set('Authorization', 'foobar123')
                                .set('Content-Type', 'application/json')
                                .send(testCase.data.identifier)
                                .expect(401)
                                .end(
                                    function end(error, result) {
                                        if (error) {
                                            return done(error);
                                        }

                                        expect(result.res.body.message).to.equal('Invalid authorization header format. Format is Authorization: Bearer [token]');

                                        done();
                                    }
                                );
                        });
                    });

                    describe('authorization header with valid format', function postRequest() {
                        it('should complain about not valid authorization token', function it(done) {
                            request(sails.hooks.http.app)
                                .post(testCase.url)
                                .set('Authorization', 'bearer foobar123')
                                .set('Content-Type', 'application/json')
                                .send(testCase.data.identifier)
                                .expect(401)
                                .end(
                                    function end(error, result) {
                                        if (error) {
                                            return done(error);
                                        }

                                        expect(result.res.body.message).to.equal('Given authorization token is not valid');

                                        done();
                                    }
                                );
                        });
                    });
                });

                describe('PUT ' + testCase.url  + testCase.identifier, function putRequestTests() {
                    describe('no authorization header given', function putRequest() {
                        it('should complain about missing authorization header', function it(done) {
                            request(sails.hooks.http.app)
                                .put(testCase.url + testCase.identifier)
                                .set('Content-Type', 'application/json')
                                .send(testCase.data.identifier)
                                .expect(401)
                                .end(
                                    function end(error, result) {
                                        if (error) {
                                            return done(error);
                                        }

                                        expect(result.res.body.message).to.equal('No authorization header was found');

                                        done();
                                    }
                                );
                        });
                    });

                    describe('invalid format on authorization header', function putRequest() {
                        it('should complain about wrong format', function it(done) {
                            request(sails.hooks.http.app)
                                .put(testCase.url  + testCase.identifier)
                                .set('Authorization', 'foobar123')
                                .set('Content-Type', 'application/json')
                                .send(testCase.data.identifier)
                                .expect(401)
                                .end(
                                    function end(error, result) {
                                        if (error) {
                                            return done(error);
                                        }

                                        expect(result.res.body.message).to.equal('Invalid authorization header format. Format is Authorization: Bearer [token]');

                                        done();
                                    }
                                );
                        });
                    });

                    describe('authorization header with valid format', function putRequest() {
                        it('should complain about not valid authorization token', function it(done) {
                            request(sails.hooks.http.app)
                                .put(testCase.url  + testCase.identifier)
                                .set('Authorization', 'bearer foobar123')
                                .set('Content-Type', 'application/json')
                                .send(testCase.data.identifier)
                                .expect(401)
                                .end(
                                    function end(error, result) {
                                        if (error) {
                                            return done(error);
                                        }

                                        expect(result.res.body.message).to.equal('Given authorization token is not valid');

                                        done();
                                    }
                                );
                        });
                    });
                });

                describe('DELETE ' + testCase.url  + testCase.identifier, function deleteRequestTests() {
                    describe('no authorization header given', function deleteRequest() {
                        it('should complain about missing authorization header', function it(done) {
                            request(sails.hooks.http.app)
                                .del(testCase.url + testCase.identifier)
                                .expect(401)
                                .end(
                                    function end(error, result) {
                                        if (error) {
                                            return done(error);
                                        }

                                        expect(result.res.body.message).to.equal('No authorization header was found');

                                        done();
                                    }
                                );
                        });
                    });

                    describe('invalid format on authorization header', function deleteRequest() {
                        it('should complain about wrong format', function it(done) {
                            request(sails.hooks.http.app)
                                .del(testCase.url  + testCase.identifier)
                                .set('Authorization', 'foobar123')
                                .expect(401)
                                .end(
                                    function end(error, result) {
                                        if (error) {
                                            return done(error);
                                        }

                                        expect(result.res.body.message).to.equal('Invalid authorization header format. Format is Authorization: Bearer [token]');

                                        done();
                                    }
                                );
                        });
                    });

                    describe('authorization header with valid format', function deleteRequest() {
                        it('should complain about not valid authorization token', function it(done) {
                            request(sails.hooks.http.app)
                                .del(testCase.url  + testCase.identifier)
                                .set('Authorization', 'bearer foobar123')
                                .expect(401)
                                .end(
                                    function end(error, result) {
                                        if (error) {
                                            return done(error);
                                        }

                                        expect(result.res.body.message).to.equal('Given authorization token is not valid');

                                        done();
                                    }
                                );
                        });
                    });
                });
            });

            describe('with valid headers', function withCorrectJwt() {
                var token = '';
                var createdRecordId = 0;

                before(function beforeTest(done) {
                    login.authenticate('demo', function callback(error, result) {
                        if (!error) {
                            token = result.token;
                        }

                        done(error);
                    });
                });

                describe('GET ' + testCase.url, function findRecords() {
                    it('should return correct number of objects', function it(done) {
                        request(sails.hooks.http.app)
                            .get(testCase.url)
                            .set('Authorization', 'bearer ' + token)
                            .set('Content-Type', 'application/json')
                            .expect(200)
                            .end(
                                function end(error, result) {
                                    if (error) {
                                        return done(error);
                                    }

                                    expect(result.res.body).to.be.a('array');
                                    expect(result.res.body).to.have.length(testCase.count);

                                    result.res.body.forEach(function(value) {
                                        expect(value).to.be.a('object');
                                    });


                                    done();
                                }
                            );
                    });
                });

                describe('GET ' + testCase.url + testCase.identifier, function findOneRecord() {
                    it('should return expected object', function it(done) {
                        request(sails.hooks.http.app)
                            .get(testCase.url + testCase.identifier)
                            .set('Authorization', 'bearer ' + token)
                            .set('Content-Type', 'application/json')
                            .expect(200)
                            .end(
                                function end(error, result) {
                                    if (error) {
                                        return done(error);
                                    }

                                    expect(result.res.body).to.be.a('object');

                                    _.forEach(testCase.data.identifier, function iterator(value, key) {
                                        expect(result.res.body).to.have.property(key);

                                        if (_.isDate(value)) {
                                            value = value.toISOString();
                                        }

                                        expect(result.res.body[key]).to.equal(value);
                                    });

                                    done();
                                }
                            );
                    });
                });

                describe('GET ' + testCase.url + 666, function findOneRecord() {
                    it('should not return any data', function it(done) {
                        request(sails.hooks.http.app)
                            .get(testCase.url + 666)
                            .set('Authorization', 'bearer ' + token)
                            .set('Content-Type', 'application/json')
                            .expect(404)
                            .end(
                                function end(error, result) {
                                    if (error) {
                                        return done(error);
                                    }

                                    expect(result.res.text).to.equal('No record found with the specified `id`.');

                                    done();
                                }
                            );
                    });
                });

                describe('GET ' + testCase.url + 'count', function findOneRecord() {
                    it('should return expected response', function it(done) {
                        request(sails.hooks.http.app)
                            .get(testCase.url + 'count')
                            .set('Authorization', 'bearer ' + token)
                            .set('Content-Type', 'application/json')
                            .expect(200)
                            .end(
                                function end(error, result) {
                                    if (error) {
                                        return done(error);
                                    }

                                    expect(result.res.body).to.be.a('object');
                                    expect(result.res.body).to.deep.equal({count: testCase.count});

                                    done();
                                }
                            );
                    });
                });

                describe('POST ' + testCase.url, function createRecord() {
                    it('should create new record', function it(done) {
                        request(sails.hooks.http.app)
                            .post(testCase.url)
                            .set('Authorization', 'bearer ' + token)
                            .set('Content-Type', 'application/json')
                            .send(testCase.data.newRecord)
                            .expect(200)
                            .end(
                                function end(error, result) {
                                    if (error) {
                                        return done(error);
                                    }

                                    expect(result.res.body).to.be.a('object');

                                    _.forEach(testCase.data.newRecord, function iterator(value, key) {
                                        expect(result.res.body).to.have.property(key);

                                        if (_.isDate(value)) {
                                            value = value.toISOString();
                                        }

                                        expect(result.res.body[key]).to.equal(value);
                                    });

                                    createdRecordId = result.res.body.id;

                                    done();
                                }
                            );
                    });
                });

                describe('PUT ' + testCase.url + ' (created record)', function updateRecord() {
                    it('should update specified record', function it(done) {
                        var dataToUpdate = testCase.data.updateRecord || testCase.data.identifier;

                        request(sails.hooks.http.app)
                            .put(testCase.url + createdRecordId)
                            .set('Authorization', 'bearer ' + token)
                            .set('Content-Type', 'application/json')
                            .send(dataToUpdate)
                            .expect(200)
                            .end(
                                function end(error, result) {
                                    if (error) {
                                        return done(error);
                                    }

                                    expect(result.res.body).to.be.a('object');

                                    _.forEach(dataToUpdate, function iterator(value, key) {
                                        expect(result.res.body).to.have.property(key);

                                        if (_.isDate(value)) {
                                            value = value.toISOString();
                                        }

                                        expect(result.res.body[key]).to.equal(value);
                                    });

                                    expect(result.res.body.id).to.equal(createdRecordId);

                                    done();
                                }
                            );
                    });
                });

                describe('DELETE ' + testCase.url + ' (created record)', function deleteRecord() {
                    it('should delete specified record', function it(done) {
                        request(sails.hooks.http.app)
                            .del(testCase.url + createdRecordId)
                            .set('Authorization', 'bearer ' + token)
                            .expect(200)
                            .end(
                                function end(error, result) {
                                    if (error) {
                                        return done(error);
                                    }

                                    expect(result.res.body).to.be.a('object');

                                    var dataToUpdate = testCase.data.updateRecord || testCase.data.identifier;

                                    _.forEach(dataToUpdate, function iterator(value, key) {
                                        expect(result.res.body).to.have.property(key);

                                        if (_.isDate(value)) {
                                            value = value.toISOString();
                                        }

                                        expect(result.res.body[key]).to.equal(value);
                                    });

                                    expect(result.res.body.id).to.equal(createdRecordId);

                                    done();
                                }
                            );
                    });
                });
            });
        });
    });
});