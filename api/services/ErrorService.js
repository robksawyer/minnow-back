/**
 * /api/services/ErrorService.js
 *
 * Generic error service.
 * 200 OK             - Everything worked as expected.
 * 400 Bad Request    - Often missing a required parameter.
 * 403 Unauthorized   - No valid access token provided.
 * 402 Request Failed - Parameters were valid but request failed.
 * 404 Not Found      - The requested item doesn't exist.
 * 500, 502, 503, 504 Server errors - Something went wrong on Minnow's end.
 */
"use strict";

module.exports = {
  /**
   * Method returns generic error response message. Note that output varies if request
   * has been made via ajax, socket, json or some other way.
   *
   * @param   {Number}                    status      HTTP status code
   * @param   {String|sails.error.socket} message     Actual error message
   * @param   {Request}                   request     Request object
   * @param   {Response}                  response    Response object
   *
   * @returns {*}
   */
  makeErrorResponse: function(status, message, req, res) {

      if (req.isAjax || req.isJson || req.isSocket) {
          var errorMessage = new Error();

          errorMessage.message = message;
          errorMessage.status = res.statusCode;

          return res.json(status, errorMessage);
      } else {
          return res.send(status, message);
      }
  }
  
}