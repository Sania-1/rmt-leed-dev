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
    
     gulp.src('./bower_components/themify-icons/**')
   .pipe(gulp.dest('./assets/vendors/themify-icons'));
    
    gulp.src('./bower_components/bootstrap-select/dist/**')
   .pipe(gulp.dest('./assets/vendors/bootstrap-select'));
    
     gulp.src('./bower_components/switchery/dist/**')
   .pipe(gulp.dest('./assets/vendors/switchery'));
    
    gulp.src('./bower_components/modernizer/modernizer.js')
   .pipe(gulp.dest('./assets/vendors/modernizer'));
    
       gulp.src('./bower_components/animate.css/animate.min.css')
   .pipe(gulp.dest('./assets/vendors/animate.css'));
    
     gulp.src('./bower_components/perfect-scrollbar/css/**')
   .pipe(gulp.dest('./assets/vendors/perfect-scrollbar'));
    
    gulp.src('./bower_components/perfect-scrollbar/js/**')
   .pipe(gulp.dest('./assets/vendors/perfect-scrollbar'));
    
});

gulp.task('assets-inject', ['copy'], function () {
    
    
    var series = require('stream-series'),
    inject = require('gulp-inject');

    
    //here we don't need all bootstrap
    var vendorBootstrapCss = gulp.src(['./assets/vendors/bootstrap/css/bootstrap.css'], {read: false}, {relative: true});
    
    var vendorFontawesomeCss = gulp.src(['./assets/vendors/font-awesome/css/font-awesome.css'], {read: false}, {relative: true});
    
    var bootstrapSelectCss =  gulp.src(['./assets/vendors/bootstrap-select/css/bootstrap-select.min.css'], {read: false}, {relative: true});
    
    var perfectScrollbarCss =  gulp.src(['./assets/vendors/perfect-scrollbar/perfect-scrollbar.min.css'], {read: false}, {relative: true});
   
    var themifyiconsCss = gulp.src(['./assets/vendors/themify-icons/css/themify-icons.css'], {read: false}, {relative: true});
    
    var animateCss = gulp.src(['./assets/vendors/animate.css/animate.min.css'], {read: false}, {relative: true});
    
    var switcheryCss = gulp.src(['./assets/vendors/switchery/switchery.min.css'], {read: false}, {relative: true});
    
    var bootstrapSelectJs = gulp.src(['./assets/vendors/bootstrap-select/js/bootstrap-select.min.js'], {read: false}, {relative: true});
    
    var vendorjqueryJs = gulp.src(['./assets/vendors/jquery/jquery.js'], {read: false}, {relative: true});
     
    var bootstrapJs =  gulp.src(['./assets/vendors/bootstrap/js/bootstrap.js'], {read: false}, {relative: true}); 
    
    var perfectScrollbarJs =  gulp.src(['./assets/vendors/perfect-scrollbar/perfect-scrollbar.min.js'], {read: false}, {relative: true}); 
    
    var perfectScrollbarJquery =  gulp.src(['./assets/vendors/perfect-scrollbar/perfect-scrollbar.jquery.min.js'], {read: false}, {relative: true}); 
    
    var modernizerJs = gulp.src(['./assets/vendors/modernizer/modernizer.js'], {read: false}, {relative: true});
  
    var switcheryJs = gulp.src(['./assets/vendors/switchery/switchery.min.js'], {read: false}, {relative: true});
    
    var appRmtCSS = gulp.src(['./assets/app/css/*.css'], {read: false}, {relative: true});
    
    var appRmtJS = gulp.src(['./assets/app/js/*.js'], {read: false}, {relative: true});

    gulp.src('*.html')
    .pipe(inject(series(vendorBootstrapCss, vendorFontawesomeCss, bootstrapSelectCss, perfectScrollbarCss,themifyiconsCss, animateCss, switcheryCss, appRmtCSS,   
         vendorjqueryJs, bootstrapJs, bootstrapSelectJs , perfectScrollbarJs,perfectScrollbarJquery ,modernizerJs,  switcheryJs ,appRmtJS)))
    .pipe(gulp.dest('.'));
    
});



gulp.task('default', ['copy', 'assets-inject']);



