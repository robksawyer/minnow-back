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
  * latest
  * Returns the latest posts in the system. This presents users with the latest posts in the system.
  * From this page a user can purchase a secret, like, and flag posts. 
  *
  * @param req
  * @param res
  * @return 
  **/
  latest: function(req, res){
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
    if(req.param('post') == null || req.param('post') == undefined){
      ErrorService.makeErrorResponse(400, 'You must provide a valid post id.', req, res);
    }
    if(req.user.id == null || req.user.id == undefined){
      ErrorService.makeErrorResponse(400, 'You are not allowed to perform this action.', req, res);
    }

    //Check to see if the user already has a flag for the post
    Flag.find().where({
      owner: req.user.id,
      post: req.param('post')
    }).exec(function(err, res){
      if(!res.id){
        //Create the flag
        var postObj = {
          post: req.param('post'), //The post id
          user: req.user.id
        };
        //Get the user's ip address
        var userAddress = ResponseService.addressFromRequest(req);
        postObj = _.merge(postObj, userAddress);
        Flag.create(postObj, function(err, res){
          if(err){
            ErrorService.makeErrorResponse(500, 'There was an error creating the flag.', req, res);
          }
          ResponseService.makeResponse({flag: res}, null, req, res);

          //Check to see if the post is banned
          checkFlagCount(post);
        });
      }
      //If the Flag is found do nothing
    });
    
  },

  /**
  *
  * checkFlagCount
  * Method checks the current flag count for a post and bans it if the 
  * count is at the max flag count.
  * @param post - The post id
  * @return integer
  **/
  checkFlagCount: function(post){
    Flag.count({ post: post }).exec(function(err, count){
      if(count >= sails.config.site.max_flag_count){
        //Change the status of the post and ban it
        Post.update({
          id: post,
          status: 'banned'
        }, function(err, res){
          if(err){
            sails.log.error('checkFlagCount: Error - Unable to ban post #' + post + '.');
          }
          sails.log.warn('The post #' + post + ' was banned.');
        });
      }
      return count;
    });
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

