/**
 * CommentController
 *
 * @description :: Server-side logic for managing comments
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    /**
     * Method returns the comments for a post.
     *
     * @param   {Request}   req     Request object
     * @param   {Response}  res     Response object
     */
    index: function(req, res) {
        var postId = req.param("post");
        if(!postId){
            ErrorService.makeErrorResponse(400, 'You must provide a valid post id.', req, res);
        }
        // Fetch comments for a specific post id
        DataService.getComments({post: postId}, 10, null, function(error, comments) {
            if (error) {
                ResponseService.makeError(error, req, res);
            } else {
                ResponseService.makeResponse({comments: comments}, null, req, res);
            }
        });
    }

};

