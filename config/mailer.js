/**
 * 
 * Configuration file for the email processing service
 * 
 * The current processing service is Postmark.
 *
 * For more information visit:
 *  Postmark: https://devcenter.heroku.com/articles/postmark
 *  Nodemailer: https://github.com/andris9/Nodemailer
 * 
 */

module.exports.mailer = {

     apiKey: process.env.POSTMARK_API_KEY,

     inboundAddress: process.env.POSTMARK_INBOUND_ADDRESS,

     smtpServer: process.env.POSTMARK_SMTP_SERVER,

     fromEmail: 'Team Minnow <hellominnow@gmail.com>'

};
