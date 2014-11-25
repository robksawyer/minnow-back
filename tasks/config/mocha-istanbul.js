/**
 * Instanbul handles mocha code coverage
 *
 * ---------------------------------------------------------------
 *
 * For usage docs see:
 *    https://github.com/pocesar/grunt-mocha-istanbul
 *
 */
module.exports = function(grunt) {

  grunt.config.set('mocha_istanbul', {
    coverage: {
      src: 'test', // the folder, not the files
      options: {
        coverageFolder: 'coverage',
        mask: '**/*.test.js',
        root: '../../api/'
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha-istanbul');
};

