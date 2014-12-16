'use strict';

/**
 * Dependencies
 */
var chai = require('chai'),
    expect = chai.expect,
    should = chai.should(),
    assert = chai.assert,
    async = require('async');

describe('Barrels', function() {

  // Load fixtures into memory
  describe('constructor', function() {
    it('should load all the json files from default folder', function() {
      Object.keys(global.fixtures).length.should.be.greaterThan(1, 'At least two fixture files should be loaded!');
    });

    it('should set generate lowercase property names for models', function() {
      var oneWord = Object.keys(global.fixtures).join();
      oneWord.toLowerCase().should.be.eql(oneWord, 'Property names should be in lowercase!');
    });
  });

  // Populate DB with fixtures
  describe('populate()', function() {
    describe('populate(cb)', function() {

      it('should populate the DB with users', function(done) {
        User
          .find()
          .exec(function(err, users) {
            if (err)
              return done(err);

            var gotUsers = (global.fixtures['user'].length > 0);
            var usersAreInTheDb = (users.length === global.fixtures['user'].length);
            expect(gotUsers && usersAreInTheDb).be.ok;

            done();
          });
      });

      it('should populate the DB with posts and comments', function(done) {
        Post.find().exec(function(err, posts) {
          if (err)
            return done(err);

          var gotPosts = (global.fixtures['post'].length > 0);
          var postsAreInTheDb = (posts.length === global.fixtures['post'].length);
          expect(gotPosts && postsAreInTheDb).be.ok;

          Comment
            .find()
            .populate('post')
            .exec(function(err, comments) {
              if (err)
                return done(err);

              posts.length.should.be.below(comments.length,
                'Posts and comments should have equal amount of entries!'
              );
              done();
            });
          });
      });

      it('should assign a secret to each post', function(done) {
        Secret
          .find()
          .populate('post')
          .exec(function(err, secrets) {
            if (err)
              return done(err);

            async.each(secrets, function(secret, nextPost) {
              
              expect(secret.post.name).not.be.empty;

              nextPost();
            }, done);
          });
      });

      /*it('should assign at least two tags to each product', function(done) {
        Comment.find().populate('tags').exec(function(err, comments) {
          if (err)
            return done(err);

          async.each(comments, function(product, nextProduct) {
            should(product.tags.length).be.greaterThan(1);

            nextProduct();
          }, done);
        });
      });*/
    });

   /*describe('populate(cb, false)', function() {
      before(function(done) {
        barrels.populate(done, false);
      });

      it('should keep the associations-related fields', function(done) {
        Comment.find().exec(function(err, comments) {
          if (err)
            return done(err);

          async.each(comments, function(product, nextProduct) {
            product.category.should.be.a.Number;
            product.tags.should.be.an.Array;

            nextProduct();
          }, done);
        });
      });
    });*/

   /*describe('populate(modelList, cb)', function() {
      before(function(done) {
        Comment.destroy().exec(function(err) {
          if (err)
            return done(err);
            
          Post.destroy().exec(function(err) {
            if (err)
              return done(err);

            barrels.populate(['comments', 'tags'], done);
          });
        });
      });

      it('should populate comments but not posts', function(done) {
        Comment.find().exec(function(err, comments) {
          if (err)
            return done(err);

          comments.length.should.be.greaterThan(1);
        });

        Post.find().exec(function(err, posts) {
          if (err)
            return done(err);

          posts.length.should.be.eql(0);
        });

        done();
      });
    });*/

  });
});