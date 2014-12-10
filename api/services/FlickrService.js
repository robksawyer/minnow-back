/**
 * /api/services/FlickrService.js
 *
 * Service that helps with Flickr API calls.
 *
 * Single object fetch:
 *  search{ObjectName}(terms, next)
 *
 * Multiple object fetch
 *  get{ObjectName}s(terms, next)
 *
 * All data service methods will write error log if some error occurs. In all cases callback function 'next'
 * is called with two arguments: possible error and actual result.
 *
 * Note that with multiple object fetch service will attach "default" sort conditions for results.
 */

"use strict";

var async  = require("async"),
    Flickr = require("flickrapi"),
    flickrOptions = {
      api_key: sails.config.flickr.apiKey,
      secret: sails.config.flickr.apiSecret
    };

module.exports = {

    /**
    * Service to search for photos via flickr
    *
    * @param   {String} query           Used query conditions
    * 
    * To map a photo to the response, see https://www.flickr.com/services/api/misc.urls.html
    * Examples:
    * https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
    * or
    * https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_[mstzb].jpg
    * or
    * https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{o-secret}_o.(jpg|gif|png)
    */
    searchPhotos: function(query, next) {
        if(!query) next();
        
        Flickr.tokenOnly(flickrOptions, function(error, flickr) {
          if(error) {
            return next(error);
          }

          // we can now use "flickr" as our API object,
          // but we can only call public methods and access public data
          flickr.photos.search({
              text: "%" + query + "%",
              safe_search: 1,
              content_type: 1,
              media: 'photos',
              is_commons: true,
              page: 1,
              per_page: sails.config.flickr.imagesPerPage
            }, function(err, result) {
                if(err) {
                    next(err);
                }
                // result is Flickr's response
                next(err, result);
            });
        });
    }
}