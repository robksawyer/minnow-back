/*
 * Location: /test/helpers/theLifter.js
 *
 * @description :: Provides 'lift' and 'lower' methods to set up
 *   and tear down a Sails instance (for use in tests)
 */
'use strict';
var SailsApp = require('sails').Sails,
    async = require('async'),
    lifted = false,
    Barrels = require('barrels'),
    sailsprocess,
    clear = require('cli-clear'),
    barrels, fixtures;
 
var theLifter = {
 
  /* Starts the Sails server, or if already started, stops and then starts it
   *
   * @param {function} done Callback function
   * @usage 
   * before('bootstrap', function (done) {
   *    theLifter.lift(done);
   * });
   */
  lift: function (cb) {
    //Clear the terminal window
    clear();

    async.waterfall(
      [
        // Check whether the Sails server is already running, and stop it if so
        function (cb) {
          if (lifted) {
            return theLifter.lower(cb);
          }
          cb();
        },
 
        // Start the Sails server
        function (cb) {
          sailsprocess = new SailsApp();
          sailsprocess.log.warn('Lifting sails...');
          sailsprocess.lift({
            log: {
              level: 'warn'
            },
            connections: {
              test: {
                adapter: 'sails-disk'
              }
            },
            loadHooks: [
              'blueprints',
              'controllers',
              'http',
              'moduleloader',
              'orm',
              'policies',
              'request',
              'responses',
              'session',
              'userconfig',
              'views'
            ],
            models: {
              // Use in-memory database for tests
              connection: 'test',
              migrate: 'alter'
            },
            liftTimeout: 10000
          }, function (err, app) {
            if (err) {
              sails.log.error(err);
              return cb(err);
            }
            // Load fixtures
            barrels = new Barrels();

            // Save original objects in `fixtures` variable
            fixtures = barrels.data;

            // Populate the DB
            barrels.populate(function(err) {
              cb(err, app);
            });
            
            lifted = true;
            sailsprocess = app;
          });
        }
      ], cb);
  },
 
  /* Stops the Sails server
   *
   * @param {function} done Callback function
   * @usage 
   * after('bootstrap', function (done) {
   *    theLifter.lower(done);
   * });
   */
  lower: function (cb) {
    sailsprocess.log.warn('Lowering sails...');
    sailsprocess.lower(function (err) {
      if(err) {
        throw err;
      }
      lifted = false;
      cb(err);
    });
  }
};

/**
 * Expose should to external world.
 */
exports = module.exports = theLifter;