/*
 * Location: /test/helpers/appHelper.js
 *
 * @description :: Provides 'lift' and 'lower' methods to set up
 *   and tear down a Sails instance (for use in tests)
 */
var Sails = require('sails'),
    should = require('should'),
    async = require('async'),
    lifted = false,
    Barrels = require('barrels'),
    sailsprocess, barrels, fixtures;
 
var appHelper = {
 
  /* Starts the Sails server, or if already started, stops and then starts it
   *
   * @param {function} done Callback function
   * @usage 
   * before('bootstrap', function (done) {
   *    appHelper.lift(done);
   * });
   */
  lift: function (done) {
    async.waterfall(
      [
        // Check whether the Sails server is already running, and stop it if so
        function (cb) {
          if (lifted) {
            return appHelper.lower(cb);
          }
          cb();
        },
 
        // Start the Sails server
        function (cb) {
          Sails.log.warn('Lifting sails...');
          Sails.lift({
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
              migrate: 'drop'
            },
            liftTimeout: 10000
          }, function (err, app) {
            if (err) {
              return cb(err);
            }
            // Load fixtures
            barrels = new Barrels();

            // Save original objects in `fixtures` variable
            fixtures = barrels.data;

            // Populate the DB
            barrels.populate(function(err) {
              done(err, app);
            });
            
            lifted = true;
            sailsprocess = app;
          });
        }
      ], done);
  },
 
  /* Stops the Sails server
   *
   * @param {function} done Callback function
   * @usage 
   * after('bootstrap', function (done) {
   *    appHelper.lower(done);
   * });
   */
  lower: function (done) {
    sailsprocess.log.warn('Lowering sails...');
    sailsprocess.lower(function (err) {
      if(err) 
        throw err;
      lifted = false;
      done(err);
    });
  },

  /*Pass along a specific model to load fixtures for it.
  * @usage:
  * appHelper.fixtures(['posts'], done, function(err, res){
  *   sails.log.warn( res );
  * });
  */
  /*getFixtures: function(model){
    // Load fixtures
    barrels = new Barrels();

    if(!model){
      // Populate the DB
      barrels.populate(function(err) {
        if (err) 
          throw err;
        return barrels.data;
      });
    }else{
      // Populate the DB with models passed
      barrels.populate(model, function(err) {
        if(err)
            throw err;
        return barrels.data[model];
      });
    }
  }*/
};

/**
 * Expose should to external world.
 */
exports = module.exports = appHelper;