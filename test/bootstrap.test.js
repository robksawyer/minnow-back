var Sails = require('sails'),
    Barrels = require('barrels'),
    should = require('should');

// Global before hook
before(function (done) {
  // Lift Sails with test database
  Sails.lift({
    log: {
      level: 'error'
    },
    connections: {
      test: {
        adapter: 'sails-disk'
      }
    },
    models: {
      connection: 'test',
      migrate: 'drop'
    },
    hooks: {
      grunt: false
    },
    environment: 'development'
  }, function(err, sails) {
    if (err)
      return done(err);

    // Load fixtures
    var barrels = new Barrels();

    // Save original objects in `fixtures` variable
    fixtures = barrels.data;

    // Populate the DB
    barrels.populate(function(err) {
      done(err, sails);
    });

  });
});

// Global after hook
after(function (done) {
  console.log(); // Skip a line before displaying Sails lowering logs
  sails.lower(done);
});