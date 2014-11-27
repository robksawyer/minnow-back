var nodemailer = require('nodemailer');

module.exports = {

  /**
   * Sends an email to a given recipient
   * @param  {object}   email           an object containing all of the necessary data to email
   * @param  {Function} cb[err, res]    the callback to call once email is sent, or if it fails
   */
  send: function(email, cb){

    /** sets up the modemailer smtp transport */
    /*var transport = nodemailer.createTransport("SMTP", {
      service: mailer.service,
      auth: {
          user: mailer.user,
          pass: mailer.pass
      }
    });*/

    /** sets up the mail options, from and such like that **/

    /** Actually sends the email */
    transport.sendMail(email, function(err, response){
      if(err) return cb(err);
      return cb(null, response);
    });
  }
}