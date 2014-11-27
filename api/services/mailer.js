var nodemailer = require('nodemailer');

module.exports = {

  /**
   * Sends an email to a given recipient
   * @param  {object}   email           an object containing all of the necessary data to email
   * @param  {Function} cb[err, res]    the callback to call once email is sent, or if it fails
   */
  send: function(email, cb){

    // Postmark transport.
    var transport_postmark = nodemailer.createTransport( 'postmark', {
      host: config.mailer.smtpServer,
      from: config.mailer.fromEmail,
      subject: email.subject,
      to: email.to,
      html: email.htmlContent,
      txt: email.txtContent,
      auth: {
        user: config.mailer.apiKey,
        pass: config.mailer.apiKey
      }
    });

    /** sets up the mail options, from and such like that **/

    /** Actually sends the email */
    transport.sendMail(transport_postmark, function(err, response){
      if(err) return cb(err);
      return cb(null, response);
    });
  }
}