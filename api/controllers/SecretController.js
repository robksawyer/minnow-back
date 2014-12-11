/**
 * SecertController
 *
 * @description :: Server-side logic for managing secrets
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    /**
     * Fetches a secret for a post. 
     * Checks to see if the user purchased or is owner.
     *
     * @param   {{}}        where   Used query conditions
     * @param   {Function}  next    Callback function to call after query
     */
    getSecretForPost: function(req, res){
        if(!req.param('post')) {
            ErrorService.makeErrorResponse(403, 'You did not provide a post id.', req, res);
        }
        var postId = req.param('post');
        //Check to see if the post exists
        Post
            .find({id: postId})
            .exec(function(err, post){
                if(err){
                    ErrorService.makeErrorResponse(500, 'There was an error retrieving the post.', req, res);
                }
                if(!post){
                    ErrorService.makeErrorResponse(404, 'This post does not exist.', req, res);
                }
                
                sails.log(post);

                var hasAccess = false;
                if(req.session.user.id === post[0].owner){
                    hasAccess = true;
                } else if(req.session.user.id){
                    //Look up the user's purchases to see if they have purchased the secret
                    Purchase.find({user: req.session.user.id, post: post[0].id})
                        .exec(function(err, purchase){
                            if(err){
                                ErrorService.makeErrorResponse(500, 'There was an error retrieving the purchase.', req, res);
                            }
                            sails.log(purchase);
                            if(purchase){
                                hasAccess = true;
                            }

                        });
                    
                }
                sails.log("hasAccess: " + hasAccess);
                if(hasAccess === true){
                    Secret
                        .find({post: postId})
                        .exec(function(err, secret){
                            if (err) {
                                ErrorService.makeErrorResponse(500, 'There was an error retrieving the secret.', req, res);
                            }
                            ResponseService.makeResponse(secret, null, req, res);
                        });
                }

            });

        res.forbidden(err);
    }

};