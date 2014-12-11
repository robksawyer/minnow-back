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

      Post.findOne({id: 1}).exec(function(err, res){
        assert(!err, err);
        if(err){
          done(err);
        }
        expect(res).to.have.property('id');
        expect(res).to.have.property('owner');
        expect(res).to.have.property('secret');
        expect(res).to.have.property('body');
        expect(res).to.have.property('slug');
        expect(res).to.have.property('category');
        expect(res).to.have.property('img');
        expect(res).to.have.property('status');

        expect(res.body).to.have.string('Lorem Ipsum is simply dummy text of the printing and typesetting industry.');

        done();
      });
    });


    it('attributes toJSON', function(done){

      Post.findOne({id: 1}).exec(function(err, res){
        assert(!err, err);
        if(err){
          done(err);
        }

        var resJson = res.toJSON();

        expect(resJson.body).to.have.string('Lorem Ipsum is simply dummy text of the printing and typesetting industry.');

        expect(resJson).to.have.property('id');
        expect(resJson).to.have.property('owner');
        expect(resJson).to.not.have.property('secret'); //Secret should be hidden
        expect(resJson).to.have.property('body');
        expect(resJson).to.have.property('slug');
        expect(resJson).to.have.property('category');
        expect(resJson).to.have.property('img');
        expect(resJson).to.have.property('status');

        done();
      });
    });

  });
});