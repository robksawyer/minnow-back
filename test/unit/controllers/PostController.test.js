var should = require('chai').should(),
    appHelper = require('../../helpers/appHelper'),
    postFixtures = require('../../fixtures/posts'),
    assert = require('chai').assert,
    sinon = require('sinon'),
    request = require('supertest');


describe('Posts', function() {
  it('should return some posts', function(done){

    console.log(fixtures['posts']);
    /*Post.find().exec(function(err, posts) {
      if (err)
        return done(err);
      
      var gotPost = (fixtures['posts'].length > 0);
      var postsAreInTheDb = (posts.length === fixtures['posts'].length);

      should(gotPost && postsAreInTheDb).be.ok;

      User.find().exec(function(err, users) {
        if (err)
          return done(err);

        posts.length.should.be.eql(users.length,
          'Post and users should have equal amount of entries!'
        );
        done();
      });

    });*/
  });
});