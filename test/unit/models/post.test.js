'use strict';
/**
 * Test File: Testing Post
 * File location: test/models/Post.test.js
 */
 
var request = require('supertest'),
    expect = require('chai').expect,
    should = require('chai').should,
    assert = require('chai').assert;

describe('PostModel', function postModel(){

 describe('to have', function(){

    it('attributes', function(done){

        var attributes = Post.attributes;

        expect(attributes).to.have.property('owner');
        expect(attributes).to.have.property('secret');
        expect(attributes).to.have.property('body');
        expect(attributes).to.have.property('slug');
        expect(attributes).to.have.property('category');
        expect(attributes).to.have.property('img');
        expect(attributes).to.have.property('status');

        done();
    });


    it('attributes (public)', function(done){

      Post.findOne(1).exec(function(err, res){
        assert(!err, err);
        if(err){
          done(err);
        }

        expect(res).to.be.ok;
        expect(res.body).to.have.string('Lorem Ipsum is simply dummy text of the printing and typesetting industry.');

        expect(res).to.have.property('id');
        expect(res).to.have.property('owner');
        expect(res).to.not.have.property('secret'); //Secret should be hidden
        expect(res).to.have.property('body');
        expect(res).to.have.property('slug');
        expect(res).to.have.property('category');
        expect(res).to.have.property('img');
        expect(res).to.have.property('status');

        done();
      });
    });

  });
});