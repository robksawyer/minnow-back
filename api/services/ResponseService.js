/**
 * /api/services/ResponseService.js
 *
 * Generic response helper service.
 */
"use strict";

module.exports = {

  /**
   * Simple service method to send "proper" error message back to client. This is called basically
   * all over the application in cases where error may occur.
   *
   * @param   {Error|{}}  error       Error object
   * @param   {Request}   request     Request object
   * @param   {Response}  response    Response object
   *
   * @returns {*}
   */
  makeError: function(error, request, response) {
      sails.log.error(__filename + ":" + __line + " [Error triggered]");
      sails.log.error(error);

      if (request.isAjax || request.isJson || request.isSocket) {
          var errorMessage = new Error();

          errorMessage.message = error.message ? error.message : error;
          errorMessage.status = error.status ? error.status : 500;

          return response.json(errorMessage.status, errorMessage);
      } else {
          return response.send(error.status ? error.status : 500, error.message ? error.message : error);
      }
  },

  /**
   * Simple service method to send "proper" api message back to client. This is called basically
   * all over the application in cases where a JSON response may occur.
   *
   * @param   {}||string  response data     String or Object
   * @param   {}||string  metadata          String or Object
   * @param   {Request}   request           Request object
   * @param   {Response}  response          Response object
   *
   * @returns {*}
   */
  makeResponse: function(respData, metadata, req, res){
    if(!metadata) metadata = {};
    if(!respData) respData = {};
    var defaultData = {
      status: res.statusCode,
      url: req.path,
      metadata: metadata
    };
    var returnData = _.merge(defaultData, respData);
    res.json(res.statusCode, returnData);
  },

  /**
   * returns an ip address and port from the express request object, or the 
   * sails.io socket which is attached to the req object.
   * 
   * @param  {Object} req express request
   * @return {Object}     the transport address object
   * @api private
   */
  addressFromRequest: function(req){
    if(req.connection && req.connection.remoteAddress){
      return {
        ip:req.connection.remoteAddress,
        port: req.connection.remotePort
      };
    }
    
    if(req.socket && req.socket.remoteAddress){
      return {
        ip: req.socket.remoteAddress,
        port: req.socket.remotePort
      };
    }

    return{
      ip: '0.0.0.0',
      port: 'n/a'
    };
  }
  
}