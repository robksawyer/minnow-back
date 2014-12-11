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
    getSecretForPost: function(postId, next){
        //
        //Check to see if the user is the owner or has purchased the secret
        //
        Secret
            .find({post: postId})
            .exec(function(err, secret){
                if (err) {
                    sails.log.error("[Failed to fetch the secret data]");
                    sails.log.error(err);
                }

                next(err, secret);
            });
    }

};