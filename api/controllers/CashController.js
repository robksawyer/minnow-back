/**
 * CashController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var secrets = require('../../config/stripe'),
    applicationFeeInPercent = process.env.MINNOW_APPLICATION_FEE_PERCENT || 15,
    stripe = require("stripe")(secrets.stripe.secretKey),
    ErrorService = require('../services/ErrorService'),
    MailerService = require('../services/MailerService');

module.exports = {

  /**
  *
  * This handles creating a customer record. This will be referred to when making future transfers on part of the user
  * More info: https://stripe.com/docs/api#create_customer
  * 
  * PARAMS:
  * user.id, token (see tokens in Stripe docs)
  * 
  * NOTES:
  * This should be called when a new account is created.
  **/
  createCustomer: function(req, res){
    var params = req.params.all(),
        token = params.token,
        customerData = {};

    //Add the card token if it's available
    if(token){
      customerData.token = token;
    }

    //Create the customer
    stripe.customers.create(customerData, function(err, customer) {
      // asynchronously called
      if(err){
        ErrorService.makeErrorResponse(500, {
          message: "Something went wrong", 
          type: "error", 
          options: {}
        }, req, res);
      }

      //The customer was created. Update the user's account and add the customer id
      User.findOneById(req.user.id).exec(function(err, user){

        user.customerId = customer.id; //Add the customer id
        User.save(function(err, user){
          if(err){
            ErrorService.makeErrorResponse(500, {
              message: "There was an issue that occured when creating your account. Please contact support.", 
              type: "error", 
              options: {
                code: 501 
              }
            }, req, res);
          }
        });
      });

    });
  },

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
  * 
  * PARAMS:
  * amount, receiver (id), req.user.id (id), param.post.id, param.secret.id
  * 
  * TODO: 
  * We should track when failures and successes happen and track those for each user. This would go into a rating for them or something.
  * 
  **/
  transfer: function(req, res){
    var params = req.params.all(),
        chargeAmount = Math.round(Number(params.amount)), //in cents
        appProfitAmount = (chargeAmount * applicationFeeInPercent/100),
        userProfitAmount = chargeAmount - appProfitAmount;

    sails.log.warn("Post IDt: " + param.post.id);
    sails.log.warn("Secret ID: " + param.secret.id);

    sails.log("Charge Amt: " + chargeAmount);
    sails.log("App Profit: " + appProfitAmount);
    sails.log("User Profit: " + userProfitAmount);

    //Find the sender details (by ID)
    User.findOneById(req.user.id, function(err, sender){
      if(err){
        sails.log(err);
        ErrorService.makeErrorResponse(500, {
          message: "Something went wrong", 
          type: "error", 
          options: {}
        }, req, res);
      }

      //Find the recipient details (by ID)
      User.findOneById(params.reciever, function (err, reciever){
        sails.log(err);
        ErrorService.makeErrorResponse(500, {
          message: "Something went wrong", 
          type: "error", 
          options: {}
        }, req, res);

        //Transfer the funds to the Minnow account
        stripe.transfers.create({

          amount: chargeAmount, // amount in cents
          currency: "usd",
          recipient: 'self',
          type: "card",
          card: sender.recipient.default_card,
          statement_description: 'Secret transfer fee.',
          //customer: ??

        }, function(err, fromSender) {
          if(err){
            sails.log(err);
            ErrorService.makeErrorResponse(500, {
              message: "Something went wrong", 
              type: "error", 
              options: {}
            }, req, res);
          } else {
            sails.log(fromSender);

            //If the receiver exists
            if(reciever){

              //The secret owner's cut sent from Minnow
              stripe.transfers.create({

                amount: userProfitAmount, // amount in cents
                currency: "usd",
                type: "card",
                recipient: reciever.recipient.id, //The ID of an existing, verified recipient that the money will be transferred to in this request.
                card: receiver.recipient.default_card, //The card must be the ID of a card belonging to the recipient. The transfer will be sent to this card.
                statement_description: 'A secret.',
                metadata: {
                  post: param.post.id,
                  secret: param.secret.id
                }
                //customer: ??

              }, function(err, toReciever) {
                if(err){
                  sails.log(err);
                  ErrorService.makeErrorResponse(500, {
                    message: "Something went wrong", 
                    type: "error", 
                    options: {}
                  }, req, res);
                } else {
                  sails.log(toReciever);
                  res.json(200, {
                        message: "Success! Your transaction will be completed within 2 days.", 
                        type: "Success", 
                        options: {}
                      }
                    );
                }
              });

            } else {
              sails.log('the receiver did not exist, that is weird');
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
                  }, req, res);
            }

          }
        });
      });
    });
  }

};