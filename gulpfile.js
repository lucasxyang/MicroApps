var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');
var browserify = require('browserify');


var babel = require('gulp-babel');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');


// Location of all JS files that need to be linted
var jsFiles = ['*.js', 'src/**/*.js'];


// why the heck this doesnt work?!
// Gulp task to lint our JS files against JSCS and JSHint
gulp.task('style', function() {
    return gulp.src(jsFiles)
                .pipe(jshint())
                .pipe(jshint.reporter('jshint-stylish', {
                    verbose: true    
                }))
                .pipe(jscs());
});


// Gulp task to monitor the app server
// and restart it when changes in code are detected
gulp.task('serve', function() {
     var options = {
         script: 'app.js',
         delayTime: 1,
         env: {
             'PORT': 5000
         },
         watch: jsFiles
     };
     return nodemon(options)
             .on('restart', function(ev) {
                 console.log('Restarting...');
             });
 });
