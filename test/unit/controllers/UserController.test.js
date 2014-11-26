var Sails = require('sails'),
    sinon = require('sinon'),
    assert = require('assert'),
    request = require('supertest'),
    agent = request.agent('http://localhost:1337');