'use strict';
/* jshint unused:false */

/**
 * commentAuth
 *
 * @module      :: Policy
 * @description :: Checks to see if the user has purchased the post.
 *
 */
module.exports = function(req, res, next) {
  if(!req.param('post')) {
    sails.log.error('commentAuth -> Post ID was not provided when trying to create a comment.');
    return res.forbidden(err); 
  }
  if(!req.param('owner')) {
    sails.log.error('commentAuth -> Post does not have an owner, that is really weird.');
    return res.forbidden(err); 
  }

  var postId = parseInt(req.param('post'));

  //Check to ensure that the Post exists before adding the comment.
  Post.findById( postId ).exec(function(err, post){
      if(err) {
        next(err);
      }
      if(!post) {
        ErrorService.makeErrorResponse(404, 'This post does not exist.', req, res);
      }

      //Look up the user's purchases to see if the Post ID exists in the stack
      Purchase.find({user: req.session.user.id, post: postId}).exec(function(err, purchase){
        if(err) {
          next(err);
        }

        //Check to see if purchase exists
        if(purchase.id){
          //Continue
          next();
        }else{
          return res.forbidden(err);
        }
        
      });
  });

};
