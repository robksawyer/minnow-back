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
     * Method to encrypt a message
     *
     * @param   message   The message to encrypt
     *
     * @returns {moment}
     */
    encrypt: function(message, key) {
        if(!message || !key){
            return undefined;
        }
        var cipher = crypto.createCipher(sails.config.encryption.type, key);
        var crypted = cipher.update(text,'utf8','hex');
        return cipher.final('hex');
    },

    /**
     * Method to decrypt a message
     *
     * @param   encMessage   The message to decrypt
     *
     * @returns {moment}
     */
    decrypt: function(encMessage, key){
        if(!encMessage || !key){
            return undefined;
        }
        var decipher = crypto.createDecipher(sails.config.encryption.type, key);
        var dec = decipher.update(crypted,'hex','utf8');
        return decipher.final('utf8');
    }

    
}