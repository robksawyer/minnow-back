/**
 * CashController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var secrets = require('../../config/stripe'),
    applicationFeeInPercent = process.env.MINNOW_APPLICATION_FEE_PERCENT || 10,
    stripe = require("stripe")(secrets.stripe.secretKey),
    ErrorService = require('../services/ErrorService'),
    MailerService = require('../services/MailerService');

module.exports = {

  /**
  *
  * Handles making the secret transaction.
  * More info: https://stripe.com/docs/api#transfers and https://stripe.com/docs/tutorials/sending-transfers
  * 
  * Here’s what the flow looks like:
  * 1. A transfer is created via the API. At this point, the transfer’s status is pending.
  * 2. You receive a transfer.paid webhook when the transfer is expected to be available in the recipient’s bank account or debit card. However, this 
  *    webhook does not guarantee that the transfer was actually successful.
  * 3. If the transfer fails, you’ll receive a transfer.failed webhook within five business days (that’s unfortunately how long some banks take to 
  *    return transfers) and the transfer will be marked as failed.
  * 4. You can safely assume the transfer was successful if you don’t receive a transfer.failed webhook within five business days.
  * 
  * Timelines: 
  * Unlike charging a credit card, sending a transfer is not synchronous. For bank accounts, transfers will be available in the bank account the next 
  * business day if created before 21:00 UTC (2pm PST). If the transfer fails (due to a typo in the bank details, for example), it can take up to five 
  * business days for Stripe to be notified.
  * 
  * Transfers to debit cards can take 1 to 2 days to complete. However, unlike with bank accounts, we'll know instantaneously if the debit card is not 
  * valid when it is added to the recipient.
  **/
  transfer: function(req, res){
    var params = req.params.all(),
        chargeAmount = Math.round(Number(params.amount)),
        appProfitAmount = (chargeAmount * applicationFeeInPercent/100),
        userProfitAmount = chargeAmount - appProfitAmount;

    console.log("Charge Amt: " + chargeAmount);
    console.log("App Profit: " + appProfitAmount);
    console.log("User Profit: " + userProfitAmount);

    User.findOneByEmail(req.user.email, function(err, sender){
      if(err){
        console.log(err);
        ErrorService.makeErrorResponse(500, {
          message: "Something went wrong", 
          type: "error", 
          options: {}
        }, res, req);
      }

      User.findOneByEmail(params.reciever, function (err, reciever){
        console.log(err);
        ErrorService.makeErrorResponse(500, {
          message: "Something went wrong", 
          type: "error", 
          options: {}
        }, res, req);

        //The Minnow transaction fee
        stripe.charges.create({

          amount: appProfitAmount, // amount in cents
          currency: "usd",
          recipient: 'self',
          card: sender.recipient.default_card,
          statement_description: 'Secret transfer fee.'

        }, function(err, fromSender) {
          if(err){
            console.log(err);
            ErrorService.makeErrorResponse(500, {
              message: "Something went wrong", 
              type: "error", 
              options: {}
            }, res, req);
          } else {
            console.log(fromSender);

            //If the receiver exists
            if(reciever){

              //The secret owner's cut
              stripe.charges.create({

                amount: userProfitAmount, // amount in cents
                currency: "usd",
                recipient: reciever.recipient.id,
                card: reciever.recipient.default_card,
                statement_description: 'A secret.'

              }, function(err, toReciever) {
                if(err){
                  console.log(err);
                  ErrorService.makeErrorResponse(500, {
                    message: "Something went wrong", 
                    type: "error", 
                    options: {}
                  }, res, req);
                } else {
                  console.log(toReciever);
                  res.json(200, {
                        message: "Success! Your transaction will be completed within 2 days.", 
                        type: "Success", 
                        options: {}
                      }
                    );
                }
              });

            } else {
              console.log('the receiver did not exist, that is weird');
              /*MailerService.send({
                from:       process.env.REPLY_TO_EMAIL_ADDRESS,
                to:         user.email,
                replyTo:    process.env.FROM_EMAIL_ADDRESS,
                subject:    'New Account Acivation Required',
                html:       '<h3>Thanks for signing up</h3><p><a href="http://localhost:1337/user/' + user.id + '/activate/' + user.activationToken + '">Please Activate Your Account</a></p>'
              }, function(err, response){
                sails.log.debug('nodemailer sent', err, response);
              });*/
              ErrorService.makeErrorResponse(500, {
                    message: "Something went wrong", 
                    type: "error", 
                    options: {}
                  }, res, req);
            }

          }
        });
      });
    });
  },

  handleTransaction: function(recipient, ){

  }


  }

};