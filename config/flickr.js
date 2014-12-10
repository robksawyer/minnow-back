/**
 * 
 * Configuration file for the Flickr API integration
 * 
 * For more information visit:
 * https://www.npmjs.org/package/flickrapi
 *  
 */

module.exports.flickr = {

     apiKey: process.env.FLICKR_KEY,

     apiSecret: process.env.FLICKR_SECRET,

     imagesPerPage: 15

};
