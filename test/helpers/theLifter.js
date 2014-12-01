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
    clear = require('cli-clear');

var theLifter = {
 
  /* Starts the Sails server, or if already started, stops and then starts it
   *
   * @param {function} done Callback function
   * @usage 
   * before('bootstrap', function (done) {
   *    theLifter.lift(done);
   * });
   */
  lift: function (next, cb) {
    //Clear the terminal window
    clear();
    
    async.waterfall(
      [
        // Check whether the Sails server is already running, and stop it if so
        function (next) {
          if (lifted) {
            //Clear the terminal window
            clear();
            return theLifter.lower(next);
          }
          next();
        },
 
        // Start the Sails server
        function (next) {
          sailsprocess = new SailsApp();
          sailsprocess.log.warn('Lifting sails...');
          sailsprocess.lift({
            log: {
              level: 'debug'
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
              migrate: 'drop'
            },
            liftTimeout: 50000
          }, function (err, app) {
            if (err) {
              sails.log.error(err);
              next(err);
            }
            // Load fixtures
            var barrels = new Barrels();

            // Populate the DB
            barrels.populate(function(err) {
              if(err){
                sails.log.error(err);
                next(err);
              }
              console.log('Populating the database.');
              next(err, app);
            });
            
            lifted = true;
            sailsprocess = app;

            // Save original objects in `fixtures` variable and return it to the callback
            //var fixtures = barrels.data;
            if(cb){
              cb(app);
            }
          });
        }
      ], next);
  },

  /* Stops the Sails server
   *
   * @param {function} done Callback function
   * @usage 
   * after('bootstrap', function (done) {
   *    theLifter.lower(done);
   * });
   */
  lower: function (next) {
    sailsprocess.log.warn('Lowering sails...');
    sailsprocess.lower(function (err) {
      if(err) {
        throw err;
      }
      lifted = false;
      next(err);
    });
  }
};

/**
 * Expose should to external world.
 */
exports = module.exports = theLifter;