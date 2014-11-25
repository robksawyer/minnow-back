'use strict';

/*
 * Location: /test/index.test.js
 *
 * @description :: This file is run before all other tests.
 */
var should = require('should'),
    appHelper = require('./helpers/appHelper');
 
before(function (done) {
  appHelper.lift(done);
});
 
describe('Barrels', function() {

  // Load fixtures into memory
  describe('constructor', function() {
    it('should load all the json files from default folder', function() {
      Object.keys(fixtures).length.should.be.greaterThan(1,
        'At least two fixture files should be loaded!');
    });

    it('should set generate lowercase property names for models', function() {
      var oneWord = Object.keys(fixtures).join();
      oneWord.toLowerCase().should.be.eql(oneWord,
        'Property names should be in lowercase!');
    });
  });

  // Populate DB with fixtures
  describe('populate()', function() {
    describe('populate(cb)', function() {
      before(function(done) {
        barrels.populate(['users','posts'], done);
      });

      it('should populate the DB with users and posts', function(done) {

        Post.find().exec(function(err, posts) {
          if (err)
            return done(err);

          console.log(posts);
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

        });
      });

      it('should assign a post to each user', function(done) {
        User.find().populate('posts').exec(function(err, users) {
          if (err)
            return done(err);

          async.each(users, function(user, nextPost) {
            should(user.post.name).not.be.empty;

            nextPost();
          }, done);
        });
      });

      it('should assign at least two comments to each user', function(done) {
        User.find().populate('comments').exec(function(err, users) {
          if (err)
            return done(err);

          async.each(users, function(user, nextPost) {
            should(user.comments.length).be.greaterThan(1);

            nextPost();
          }, done);
        });
      });
    });

    describe('populate(cb, false)', function() {
      before(function(done) {
        barrels.populate(done, false);
      });

      it('should keep the associations-related fields', function(done) {
        User.find().exec(function(err, users) {
          if (err)
            return done(err);

          async.each(users, function(user, nextPost) {
            user.posts.should.be.an.Array;
            user.comments.should.be.an.Array;

            nextPost();
          }, done);
        });
      });
    });

    describe('populate(modelList, cb)', function() {
      before(function(done) {
        User.destroy().exec(function(err) {
          if (err)
            return done(err);
            
          Post.destroy().exec(function(err) {
            if (err)
              return done(err);

            barrels.populate(['users', 'comments'], done);
          });
        });
      });

      /*it('should populate users but not posts', function(done) {
        User.find().exec(function(err, users) {
          if (err)
            return done(err);

          users.length.should.be.greaterThan(1);
        });

        Post.find().exec(function(err, posts) {
          if (err)
            return done(err);
          posts.length.should.be.eql(0);
        });

        done();
      });*/

    });
  });
});

after(function (done) {
  appHelper.lower(done);
});