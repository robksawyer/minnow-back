'use strict';
/**
 * Test File: Testing Like
 * File location: test/models/Like.test.js
 */
 
var request = require('supertest'),
    expect = require('chai').expect,
    should = require('chai').should,
    assert = require('chai').assert;

describe('LikeModel', function likeModel(){

 describe('to have', function(){

    it('attributes', function(done){

      Like.findOne({id: 1}).exec(function(err, res){
        assert(!err, err);
        if(err){
          done(err);
        }

        expect(res).to.have.property('id');
        expect(res).to.have.property('post');
        expect(res).to.have.property('owner');
        expect(res).to.have.property('createdAt');
        expect(res).to.have.property('updatedAt');

        done();
      });
    });


    it('attributes toJSON', function(done){

      Like.findOne({id: 1}).exec(function(err, res){
        assert(!err, err);
        if(err){
          done(err);
        }

        var resJson = res.toJSON();

        //expect(resJson.body).to.have.string('Lorem Ipsum is simply dummy text of the printing and typesetting industry.');

        expect(res).to.have.property('id');
        expect(res).to.have.property('post');
        expect(res).to.have.property('owner');
        expect(res).to.have.property('createdAt');
        expect(res).to.have.property('updatedAt');

        done();
      });
    });

  });
});