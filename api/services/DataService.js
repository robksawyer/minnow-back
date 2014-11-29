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
            .findOne(where)
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
     * @param   {Function}  next    Callback function to call after query
     */
    getPosts: function(where, next) {
        Post
            .find(where)
            //.sort("title ASC")
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

        PostUser
            .findOne(where)
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
     * Service to fetch post users from database by given conditions.
     *
     * @param   {{}}        where   Used query conditions
     * @param   {Function}  next    Callback function to after query
     */
    getPostUsers: function(where, next) {
        PostUser
            .find()
            .where(where)
            .exec(function(error, /** sails.model.postUser[] */ postUsers) {
                if (error) {
                    sails.log.error("[Failed to fetch post user data]");
                    sails.log.error(error);
                }

                next(error, postUsers);
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

        Comment
            .findOne(where)
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
     * @param   {String}                objectName  Name of the object (Post, Sprint, Story, Task, etc.)
     * @param   {Number}                objectId    Id of the specified object
     * @param   {Function}              next        Callback function which is called after comments are fetched
     * @param   {sails.model.user[]}    [users]     User objects or empty array
     */
    getComments: function(where, next, users) {
        users = users || false;
        sails.log.warn("getComments");
        async.parallel(
            {
                // Fetch comments
                comments: function(callback) {
                    Comment
                        .find(where)
                        .populate('owner','post')
                        .sort("createdAt ASC")
                        .exec(function(error, /** sails.model.comment[] */ comments) {
                            sails.log.warn('Inside');
                            sails.log.warn(comments);
                            callback(error, comments);
                        });
                },

                // Fetch users, note this is done only with first iteration
                users: function(callback) {
                    if (users) {
                        callback(null, users);
                    } else {
                        DataService.getUsers({}, callback);
                    }
                }
            },

            /**
             * Main callback function which is called after all parallel jobs are done or
             * an error has occurred within those.
             *
             * @param   {null|Error}    error
             * @param   {{
             *              comments: sails.model.comment[],
             *              users: sails.model.user[]
             *          }}              data
             */
            function(error, data) {
                if (error) {
                    sails.log.error("[Failed to fetch comment data]");
                    sails.log.error(error);

                    next(error, null);
                } else {
                    fetchSiblingsAndAttachUsers(data);
                }
            }
        );

        /**
         * Private helper function to attach user object to each comment and fetch
         * siblings by calling service method itself with current comment data.
         *
         * @param   {{
         *              comments: sails.model.comment[],
         *              users: sails.model.user[]
         *          }}  data
         */
        function fetchSiblingsAndAttachUsers(data) {
            async.map(
                data.comments,

                /**
                 * Iterator function which will attach user object to processed link object. Users
                 * are simply searched from user array which is fetched in main async parallel call.
                 *
                 * @param   {sails.model.comment}   comment     Comment object
                 * @param   {Function}              callback    Callback function to call after job is done.
                 */
                function(comment, callback) {
                    comment.author = _.find(data.users, function(user) {
                        return user.id === comment.createdUserId;
                    });

                    // Call service itself recursive, note that we pass the users to service
                    DataService.getComments(objectName, objectId, comment.id, function(error, comments) {
                        if (!error) {
                            comment.comments = comments;
                        }

                        callback(error, comment);
                    }, data.users);
                },

                /**
                 * Main callback function which is called after all links are mapped. In this
                 * comments contains author and siblings data.
                 *
                 * @param   {null|Error}            error   Possible error
                 * @param   {sails.model.comment[]} comment Processed comments
                 */
                function(error, comment) {
                    if (error) {
                        sails.log.error("[Failed to fetch comment sibling data]");
                        sails.log.error(error);
                    }

                    next(error, comment);
                }
            );
        }
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
            .findOne(where)
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
        UserLogin
            .find({id: userId})
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
            .find(where)
            .sort("email ASC")
            .sort("createdAt ASC")
            .exec(function(error, users) {
                if (error) {
                    sails.log.error("[Failed to fetch user data]");
                    sails.log.error(error);
                }

                next(error, users);
            });
    },

    /**
     * Service to fetch post users. These users are attached in some role to specified post.
     *
     * @param   {Number}    postId   Post id
     * @param   {Function}  next        Callback function which is called after job is finished
     * @param   {Boolean}   [noViewers] Skip users that are in 'Viewer' role in this post. Defaults to false.
     */
    getUsersByPost: function(postId, next, noViewers) {
        noViewers = noViewers || false;

        async.parallel(
            {
                // Fetch post user data
                postUsers: function(callback) {
                    DataService.getPostUsers({id: postId}, callback);
                },

                // Fetch post data
                post: function(callback) {
                    DataService.getPost(postId, callback);
                },

                // Fetch admin users
                adminUsers: function(callback) {
                    var where = {
                        admin: true
                    };

                    DataService.getUsers(where, callback);
                }
            },

            /**
             * Main callback function which is called after all parallel jobs are done or
             * some error occurred while processing those.
             *
             * @param   {null|Error}    error
             * @param   {{
             *              postUsers: sails.model.postUser[],
             *              post: sails.model.post,
             *              adminUsers: sails.model.user[]
             *          }}              data
             */
            function(error, data) {
                if (error) {
                    sails.log.error("[Failed to fetch post users data, see errors above]");
                    sails.log.error(error);

                    next(error, null);
                } else {
                    var userIds = [];

                    // Add post users
                    _.each(data.postUsers, function(postUser) {
                        if (!(noViewers && postUser.role === 0)) {
                            userIds.push({id: postUser.userId});
                        }
                    });

                    // Add post manager
                    userIds.push({id: data.post.managerId});

                    // Add admin users
                    _.each(data.adminUsers, function(user) {
                        if (user.username !== "admin") {
                            userIds.push({id: user.id});
                        }
                    });

                    // Fetch user objects that are attached to this post
                    DataService.getUsers({or: userIds}, next);
                }
            }
        )
    }
}