'use strict';
/**
 * Test File: Testing FlickrService.test.js
 * File location: test/unit/services/FlickrService.test.js
 */

var request = require('supertest'),
    //loginHelper = require('../../helpers/login'),
    //FlickrService = require('../../services/FlickrService'),
    chai = require('chai'),
    expect = chai.expect,
    should = chai.should(),
    assert = chai.assert;


describe('FlickrService', function(){

  describe('should', function(){

    var access_token = ''; //The test token
    /*it('generate a token', function(done){
      loginHelper.getToken(1, function(token){
        access_token = token;
        expect(access_token).to.be.ok;
        done();
      });
    });*/

    it('fail request', function(done){
      request(sails.hooks.http.app)
        .get('/service/searchFlickr')
        .query({
          q: 'monster'
        })
        .expect(403)
        .end(function(err, res){
          if (err) {
            sails.log.error(err);
            expect(err.text.status).to.be.equal(403);
          }
          done(err);
        });
    });


    it('make successful request', function(done){
      request(sails.hooks.http.app)
        .get('/service/searchFlickr')
        .query({
          q: 'monster',
          access_token: access_token
        })
        .expect(200)
        .end(function(err, res){
          assert(!err, err);
          if (err) {
            sails.log.error(err);
          }
          //Test to see if results exist
          expect(res.status).to.be.equal(200);
          expect(res.photos.length).to.be.equal(15);

          done(err);
        });
    });

  });

});