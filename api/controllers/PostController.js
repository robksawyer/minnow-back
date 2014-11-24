/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	restricted: function(req, res){
		return res.ok('If you can see me, you are authenticated.');
	},

	open: function(req, res){
		return res.ok('This action is open.');
	},
	
	jwt: function(req, res){
		return res.ok('You have a JSON web token.');
	}
	
};

