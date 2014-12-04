/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  /**
  *
  * index
  * The main entry point for the app. This presents users with the latest posts in the system.
  * From this page a user can purchase a secret, like, and flag posts. 
  *
  * @param req
  * @param res
  * @return 
  **/
  
  index: function(req, res){
    var skip = 0;
    var limit = sails.config.site.posts_return_limit;

    if( req.param('skip') ){
       skip = req.param('skip');
    }
    if( req.param('limit') ){
      limit = req.param('limit');
    }

    //Retreive the posts
    DataService.getPosts({}, limit, skip, function(err, posts){
      if(err){
        ErrorService.makeErrorResponse(500, 'There was an error retrieving the posts.', req, res);
      }
      ResponseService.makeResponse({posts: posts}, null, req, res);
    });

  },

  /**
  *
  * flag
  * Method allows a user to flag a post. It should only let them do it once. 
  *
  * @param req
  * @param res
  * @return 
  **/
  flag: function(req, res){

    res.json(200, {});
  },

  /**
  *
  * like
  * Method should allow a user to like and unlike a post. It should check to see if the 
  * user has already liked the post. If they have it runs the unlike routine. 
  *
  * @param req
  * @param res
  * @return 
  **/
  like: function(req, res){

    res.json(200, {});
  }

};

