/**
 * /api/services/DataService.js
 *
 * Generic data service, which is used to fetch generic data and call defined callback after data fetching.
 * This contains basically all data fetch that Taskboard needs. Services contains fetch of one and multiple
 * objects.
 *
 * Single object fetch:
 *  get{ObjectName}(terms, next, [noExistCheck])
 *
 * Multiple object fetch
 *  get{ObjectName}s(terms, next)
 *
 * All data service methods will write error log if some error occurs. In all cases callback function 'next'
 * is called with two arguments: possible error and actual result.
 *
 * Note that with multiple object fetch service will attach "default" sort conditions for results.
 */

var async = require("async");

module.exports = {

    /**
     * Service to fetch single post data from database.
     *
     * @param   {Number|{}} where           Used query conditions
     * @param   {Function}  next            Callback function to call after query
     * @param   {Boolean}   [noExistsCheck] If data is not found, skip error
     */
    getPost: function(where, next, noExistsCheck) {
        noExistsCheck = noExistsCheck || false;

        Post
            .findOne()
            .where(where)
            .exec(function(error, /** sails.model.post */ post) {
                if (error) {
                    sails.log.error("[Failed to fetch post data]");
                    sails.log.error(error);
                } else if (!post && !noExistsCheck) {
                    error = new Error();

                    error.message = "Post not found.";
                    error.status = 404;
                }

                next(error, post);
            });
    },

    /**
     * Service to fetch post data from database.
     *
     * @param   {{}}        where   Used query conditions
     * @param   10          limit   Total posts to return
     * @param   0           skip    Total posts to skip over
     * @param   {Function}  next    Callback function to call after query
     */
    getPosts: function(where, limit, skipAmt, next) {
        if(!limit) {
            limit = sails.config.site.posts_return_limit;
        }
        if(limit > sails.config.site.posts_return_max){
            limit = sails.config.site.posts_return_max;
        }
        Post
            .find()
            .where(where)
            .populate('owner')
            .sort("createdAt ASC")
            .limit(limit)
            .skip(skipAmt)
            .exec(function(error, /** sails.model.post[] */ posts) {
                if (error) {
                    sails.log.error("[Failed to fetch post data]");
                    sails.log.error(error);
                }
                next(error, posts);
            });
    },

    /**
     * Service to fetch single post user from database by given conditions.
     *
     * @param   {Number|{}} where           Used query conditions
     * @param   {Function}  next            Callback function to after query
     * @param   {Boolean}   [noExistsCheck] If data is not found, skip error
     */
    getPostUser: function(where, next, noExistsCheck) {
        noExistsCheck = noExistsCheck || false;

        Post
            .findOne()
            .where(where)
            .populate('owner')
            .exec(function(error, /** sails.model.postUser */ postUser) {
                if (error) {
                    sails.log.error("[Failed to fetch post user data]");
                    sails.log.error(error);
                } else if (!postUser && !noExistsCheck) {
                    error = new Error();

                    error.message = "Post user not found.";
                    error.status = 404;
                }

                next(error, postUser);
            });
    },

    /**
     * Service to fetch single comment from database. Note that this won't fetch comment
     * siblings nor author data
     *
     * @param   {Number|{}} where           Used query conditions
     * @param   {Function}  next            Callback function to call after query
     * @param   {Boolean}   [noExistsCheck] If data is not found, skip error
     */
    getComment: function(where, next, noExistsCheck) {
        noExistsCheck = noExistsCheck || false;
        if(typeof where != "object") {
            error = new Error();
            error.message = "Find query must be an object.";
            error.status = 403;
            next(error, comment);
        }
        Comment
            .findOne()
            .where(where)
            .exec(function(error, /** sails.model.comment */ comment) {
                if (error) {
                    sails.log.error("[Failed to fetch comment data]");
                    sails.log.error(error);
                } else if (!comment && !noExistsCheck) {
                    error = new Error();
                    error.message = "Comment not found.";
                    error.status = 404;
                }
                next(error, comment);
            });
    },

    /**
     * Service to fetch comments for specified object. Note that service calls itself recursive to
     * fetch all nested comments. Note that service fetches all users for performance reasons so we
     * don't have to make n single user queries to database.
     *
     * @param   {String}                where             Specific query instructions
     * @param   {Number}                limit             Total number of comments to return
     * @param   {Number}                skip              Total comments to skip, this is used for paging
     * @param   {Function}              next              Callback function which is called after comments are fetched
     */
    getComments: function(where, limit, skip, next) {
        if(!limit) {
            limit = sails.config.site.comments_return_limit;
        }
        if(limit > sails.config.site.comments_return_max){
            limit = sails.config.site.comments_return_max;
        }
        if(typeof where != "object") {
            error = new Error();
            error.message = "Find query must be an object.";
            error.status = 403;
            next(error, comment);
        }
        Comment
            .find()
            .where(where)
            .populate('owner')
            .sort("commentId ASC")
            .exec(function(error, /** sails.model.comment[] */ comments) {
                if (error) {
                    sails.log.error("[Failed to fetch comment data]");
                    sails.log.error(error);
                }  
                next(error, comments);
            });
    },

    /**
     * Service to fetch single user data from database.
     *
     * @param   {Number|{}} where           Used query conditions
     * @param   {Function}  next            Callback function to call after query
     * @param   {Boolean}   [noExistsCheck] If data is not found, skip error
     */
    getUser: function(where, next, noExistsCheck) {
        noExistsCheck = noExistsCheck || false;

        User
            .findOne()
            .where(where)
            .exec(function(error, /** sails.model.user */ user) {
                if (error) {
                    sails.log.error("[Failed to fetch user data]");
                    sails.log.error(error);
                } else if (!user && !noExistsCheck) {
                    error = new Error();
                    error.message = "User not found.";
                    error.status = 404;
                }

                next(error, user);
            });
    },

    /**
     * Service to fetch specified user sign in data from database.
     *
     * @param   {Number}    id  User id
     * @param   {Function}  next    Callback function to call after query
     */
    getUserSignInData: function(userId, next) {
        User
            .find()
            .where({id: userId})
            .sort("createdAt DESC")
            .exec(function(error, /** sails.model.userLogin[] */ userLogin) {
                if (error) {
                    sails.log.error("[Failed to fetch user login data]");
                    sails.log.error(error);
                }

                next(error, userLogin);
            });
    },

    /**
     * Service to fetch user data from database.
     *
     * @param   {{}}        where   Used query conditions
     * @param   {Function}  next    Callback function to call after query
     */
    getUsers: function(where, next) {
        User
            .find()
            .where(where)
            .sort("email ASC")
            .sort("createdAt ASC")
            .exec(function(error, users) {
                if (error) {
                    sails.log.error("[Failed to fetch user data]");
                    sails.log.error(error);
                }

                next(error, users);
            });
    }
}