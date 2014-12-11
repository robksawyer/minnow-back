/**
 * /api/services/EncryptionService.js
 *
 * Helps with encrypting data in the site.
 */
"use strict";

var moment = require("moment-timezone"),
    crypto = require('crypto');

module.exports = {

    /**
     * Method converts given date object to real UTC date (actually moment) object.
     *
     * @param   {Date}  date    Date object convert
     *
     * @returns {moment}
     */
    encrypt: function(data) {
        var cipher = crypto.createCipher('aes-256-cbc','InmbuvP6Z8');
        var text = "123|123123123123123";

        var crypted = cipher.update(text,'utf8','hex');
        crypted += cipher.final('hex');
        
        var decipher = crypto.createDecipher('aes-256-cbc','InmbuvP6Z8');
        
        var dec = decipher.update(crypted,'hex','utf8');
        dec += decipher.final('utf8');
    },

    
}