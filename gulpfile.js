var gulp = require('gulp');

gulp.task('copy', function() {
    
   gulp.src('./bower_components/font-awesome/fonts/**')
   .pipe(gulp.dest('./assets/vendors/font-awesome/fonts'));
    
     gulp.src('./bower_components/font-awesome/css/**')
   .pipe(gulp.dest('./assets/vendors/font-awesome/css'));

    
     gulp.src('./bower_components/jquery/dist/**')
   .pipe(gulp.dest('./assets/vendors/jquery/'));
    
    
    gulp.src('./bower_components/bootstrap/dist/**')
   .pipe(gulp.dest('./assets/vendors/bootstrap'));
    
    
});

gulp.task('assets-inject', ['copy'], function () {
    
    
    var series = require('stream-series'),
    inject = require('gulp-inject');

    
    //here we don't need all bootstrap
    var vendorBootstrapCss = gulp.src(['./assets/vendors/bootstrap/css/bootstrap.css'], {read: false}, {relative: true});
   
    var vendorBootstrapJs = gulp.src(['./assets/vendors/bootstrap/js/bootstrap.js'], {read: false}, {relative: true});
    
    var vendorjqueryJs = gulp.src(['./assets/vendors/jquery/jquery.js'], {read: false}, {relative: true});
     
    var vendorFontawesomeCss = gulp.src(['./assets/vendors/font-awesome/css/font-awesome.css'], {read: false}, {relative: true});
    
    var appRmtCSS = gulp.src(['./assets/app/css/*.css'], {read: false}, {relative: true});
    
    var appRmtJS = gulp.src(['./assets/app/js/*.js'], {read: false}, {relative: true});

    gulp.src('*.html')
    .pipe(inject(series(vendorBootstrapCss, vendorFontawesomeCss, appRmtCSS, vendorjqueryJs ,vendorBootstrapJs ,appRmtJS)))
    .pipe(gulp.dest('.'));
    
});



gulp.task('default', ['copy', 'assets-inject']);



