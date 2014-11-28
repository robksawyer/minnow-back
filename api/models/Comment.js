/**
* Comment.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    body: {
      type: 'string',
      maxLength: 140,
      minLength: 1,
      required: true
    },
    summary: {
      type: 'string'
    },
    status: {
      type: 'string',
      enum: ['published', 'draft', 'banned'],
      defaultsTo: ['published']
    },
    post: {
      model: 'post'
    },
    owner: {
      model: 'user'
    }
  }
};

