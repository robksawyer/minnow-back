/**
 * CommentController
 *
 * @description :: Server-side logic for managing comments
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    /**
     * Main history action. This will render object specified comment GUI where user
     * can view, reply and add new comments.
     *
     * @param   {Request}   request     Request object
     * @param   {Response}  response    Response object
     */
    index: function(request, response) {
        var objectId = request.param("objectId");
        var objectName = request.param("objectName");

        // Fetch specified object and id comments
        DataService.getComments(objectName, objectId, 0, function(error, comments) {
            if (error) {
                ResponseService.makeError(error, request, response);
            } else {
                response.view({
                    objectId: objectId,
                    objectName: objectName,
                    comments: comments
                });
            }
        });
    }

};

