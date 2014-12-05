/**
*
* site.js
* Global site configuration file.
* 
**/

module.exports.site = {
  
  /**
  *
  * Default number of Posts to return to the views
  *
  **/
  posts_return_limit: 10,

  /**
  *
  * Max number of Posts to ever return to the views
  *
  **/
  posts_return_max: 1000,

  /**
  *
  * Default number of Comments to return to the views
  *
  **/
  comments_return_limit: 10,

  /**
  *
  * Max number of Comments to ever return to the views
  *
  **/
  comments_return_max: 1000,

  /**
  *
  * Max Flag Amount 
  * The total here dictates when a post is automatically banned.
  *
  **/
  max_flag_count: 10

}