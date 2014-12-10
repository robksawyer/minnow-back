/**
 * ServiceController
 *
 * @description :: Server-side logic for managing various service calls
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  searchFlickr: function(req, res){
    var query = req.param('q');
    sails.log("Searching for " + query);
    if(!query) {
      ResponseService.makeResponse("No results found", null, req, res);
    }
    FlickrService.searchPhotos(query, function(err, results){
      if(err){
        ErrorService.makeErrorResponse(500, 'There was an error retrieving images.', req, res);
      }
      ResponseService.makeResponse(results, null, req, res);
    });
  }

};

