//Configuration for running tests and examples against the Twilio API
module.exports.twilio = {
    accountSid: process.env.TWILIO_ACCOUNT_ID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    from: process.env.TWILIO_PHONE_NUMBER, //The Twilio number you've bought or configured
    to: process.env.TWILIO_TEST_TO_PHONE //The number you would like to send messages to for testing
};