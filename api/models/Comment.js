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
    post: {
      model: 'post'
    },
    status: {
      type: 'string',
      in: ['published', 'draft', 'banned'],
      defaultsTo: ['published']
    },
    owner: {
      model: 'user'
    }
  }
};

