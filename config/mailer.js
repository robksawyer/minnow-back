/**
 * 
 * Configuration file for the email processing service
 * 
 * For more information visit:
 * 
 *  
 */

module.exports.mailer = {

     apiKey: process.env.POSTMARK_API_KEY,

     inboundAddress: process.env.POSTMARK_INBOUND_ADDRESS,

     smtpServer: process.env.POSTMARK_SMTP_SERVER

};
