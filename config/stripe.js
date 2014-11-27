/**
 * 
 * Configuration file for the Stripe payment processing engine
 * 
 * For more information visit:
 * https://www.npmjs.org/package/stripe
 *  
 */

module.exports.stripe = {

  if(process.env.NODE_ENV == 'development'){
     
     secretKey: process.env.STRIPE_TEST_SECRET_KEY,
   
     publicKey: process.env.STRIPE_TEST_PUBLIC_KEY,

     
  } else {

     secretKey: process.env.STRIPE_LIVE_SECRET_KEY,

     publicKey: process.env.STRIPE_LIVE_PUBLIC_KEY

  }

};
