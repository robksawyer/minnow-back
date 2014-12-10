/**
 * ServiceController
 *
 * @description :: Server-side logic for managing various service calls
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  searchFlickr: function(req, res){
    var query = "",
        limit = sails.config.flickr.imagesPerPage,
        page = 1;

    if(req.param('q')){
      query = req.param('q');
    }
    if(req.param('limit')){
      limit = req.param('limit');
    }
    if(req.param('page')){
      page = req.param('page');
    }

    sails.log("Searching for " + query);
    if(!query) {
      ResponseService.makeResponse("No results found", null, req, res);
    }
    FlickrService.searchPhotos(query, limit, page, function(err, results){
      if(err){
        ErrorService.makeErrorResponse(500, 'There was an error retrieving images.', req, res);
      }
      ResponseService.makeResponse(results, null, req, res);
    });
  }

};

