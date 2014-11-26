var appHelper = require('./helpers/appHelper'),
    should = require('should');

before(function (done) {
  appHelper.lift(done);
});


// Global after hook
after(function (done) {
  console.log(); // Skip a line before displaying Sails lowering logs
  appHelper.lower(done);
});