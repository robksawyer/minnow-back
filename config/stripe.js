/**
 * 
 * Configuration file for the Stripe payment processing engine
 * 
 * For more information visit:
 * https://www.npmjs.org/package/stripe
 *  
 */

module.exports.stripe = {

  /***************************************************************************
  *                                                                          *
  * Your Stripe secret key.                                                  *
  *                                                                          *
  ***************************************************************************/
   secretKey: process.env.STRIPE_SECRET_KEY,

};
