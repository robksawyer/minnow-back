module.exports = function (grunt) {
  grunt.registerTask('test', [
    //'mochaTest',
    'mocha_istanbul:coverage'
  ]);
}