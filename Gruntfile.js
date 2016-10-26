module.exports = function (grunt) {

  grunt.initConfig({
      
  copy: {
  main: {
    files: [
      // includes files within path
      {expand: true, cwd: 'bower_components/bootstrap/dist/css/', src: '**' ,dest: 'assets/static/css'},
     
      {expand: true, cwd: 'bower_components/bootstrap/dist/js/', src: '**' ,dest: 'assets/static/js'},

      {expand: true, cwd: 'bower_components/font-awesome/css', src: '**' ,dest: 'assets/static/css'},
        
      {expand: true, cwd: 'bower_components/jquery/dist', src: '**' ,dest: 'assets/static/js'},
        
      {expand: true, cwd: 'bower_components/font-awesome/fonts', src: '**' ,dest: 'assets/fonts'},    
    
      {expand: true, cwd: 'bower_components/bootstrap/fonts', src: '**' ,dest: 'assets/fonts'},
    ],
  },
},
      
  injector: {
 options: {
    destFile : 'rmt-leed-app/index.html',
    ignorePath: 'rmt-leed-app/'
    }, 
       files:[ {
                expand: true,
                cwd: 'rmt-leed-app/assets/static/css/',
                src: ['*.css'],
                dest: 'rmt-leed-app/assets/static/css',
                ext: '.css'
              },
             {
                expand: true,
                cwd: 'rmt-leed-app/assets/static/js/',
                src: ['*.js'],
                dest: 'rmt-leed-app/assets/static/js',
                ext: '.js'
              }
              ],
  }

  });
    
    grunt.loadNpmTasks('grunt-injector');
    
    grunt.loadNpmTasks('grunt-contrib-copy');
    
    grunt.registerTask('default', ['copy','injector']);
};