module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-wiredep');

  grunt.initConfig({
      
      wiredep: {

  task: {

    // Point to the files that should be updated when
    // you run `grunt wiredep`
    src: [
       'rmt-leed-app/*.html'
    ],

    options: {
      // See wiredep's configuration documentation for the options
      // you may pass:
devDependencies: true
      // https://github.com/taptapship/wiredep#configuration
    }
  }
}

  });
};