/**
 * HomeController
 *
 * @description :: Server-side logic for managing home
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	index: function(req,res){
		return res.json({
			name: 'minnow',
			description: 'Welcome to the minnow.',
			version: '1.0'
		});
	},

  testFlickr: function(req, res){
    console.log(config.flickr.apiKey);
    res.view();
  }

};

