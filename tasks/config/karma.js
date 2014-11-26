/**
 * Run Karma Test Runner
 *
 * ---------------------------------------------------------------
 *
 * Starts the Karma test runner.
 *
 * For usage docs see:
 *    https://github.com/karma-runner/grunt-karma
 */
module.exports = function(grunt) {

  grunt.config.set('karma', {
    unit: {
      configFile: 'karma.conf.js'
    },
    //continuous integration mode: run tests once in PhantomJS browser.
    continuous: {
      configFile: 'karma.conf.js',
      singleRun: true,
      browsers: ['PhantomJS']
    }
  });

  grunt.loadNpmTasks('grunt-karma');
};
