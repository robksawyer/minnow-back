/**
 * UserController.js 
 * 
 * @module      :: Controller
 * @description :: Provides the base user
 *                 actions used to make waterlock work.
 *                 
 * @docs        :: http://waterlock.ninja/documentation
 */

module.exports = require('waterlock').actions.user({
  /* e.g.
    action: function(req, res){
  
    }
  */

  authorize: function(req, res){

    //Grab the variables passed and then redirect to get the valid data.
    //auth/login?type=facebook
    req.url = req.url + "&type=facebook";
    res.redirect(req.url);
  }

});