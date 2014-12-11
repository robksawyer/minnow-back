/**
 * /api/services/EncryptionService.js
 *
 * Helps with encrypting data in the site.
 */
"use strict";

var crypto = require('crypto');

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
        var encrypted = cipher.update(message,'utf8','hex');
        return encrypted += cipher.final('hex');
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
        var decrypted = decipher.update(encMessage,'hex','utf8');
        return decrypted += decipher.final('utf8');
    },

    /**
     * Method to generate a key
     *
     * @param   rounds   Number of rounds to process the data for. (default - 10)
     *
     * @returns {moment}
     */
    generateKeySync: function(rounds){
        var bcrypt = require('bcrypt');
        if(!rounds) rounds = 10;
        return bcrypt.genSaltSync(rounds);
    },


    /**
     * Method to generate a key
     *
     * @param   rounds   Number of rounds to process the data for. (default - 10)
     *
     * @returns {moment}
     */
    generateKey: function(rounds, next){
        var bcrypt = require('bcrypt');
        if(!rounds) rounds = 10;
        bcrypt.genSaltSync(rounds, function(err, result){
            next(err, result);
        });
    }

    
}