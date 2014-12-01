'use strict';

/**
 * 500 (Server Error) Response
 *
 * Usage:
 * return res.serverError();
 * return res.serverError(err);
 * return res.serverError(err, 'some/specific/error/view');
 *
 * NOTE:
 * If something throws in a policy or controller, or an internal
 * error is encountered, Sails will call `res.serverError()`
 * automatically.
 */
var ErrorService = require('../services/ErrorService');

module.exports = function serverError(data, options) {
    // Get access to `req`, `res`, & `sails`
    var req = this.req;
    var res = this.res;
    var sails = req._sails;

    // Set status code
    res.status(500);

    //Do something with the valiation errors
    if(data && data.invalidAttributes !== undefined){
      
    }

    // Log error to console
    if (data !== undefined) {
        sails.log.error('Sending 500 ("Server Error") response: \n', data);
    } else {
        sails.log.error('Sending empty 500 ("Server Error") response');
    }

    // Only include errors in response if application environment
    // is not set to 'production'.  In production, we shouldn't
    // send back any identifying information about errors.
    if (sails.config.environment === 'production') {
        data = undefined;
    }

    // Backend will always response JSON
    return ErrorService.makeErrorResponse(res.statusCode, data, req, res);
};