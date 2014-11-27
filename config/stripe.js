/**
 * 
 * Configuration file for the Stripe payment processing engine
 * 
 * For more information visit:
 * https://www.npmjs.org/package/stripe
 *  
 */

module.exports.stripe = {
     
     secretKey: (process.env.NODE_ENV == 'development') ? process.env.STRIPE_TEST_SECRET_KEY : process.env.STRIPE_LIVE_SECRET_KEY,
   
     publicKey: (process.env.NODE_ENV == 'development') ? process.env.STRIPE_TEST_PUBLIC_KEY : process.env.STRIPE_LIVE_PUBLIC_KEY

};
