var gulp = require('gulp');
var jshint = require('gulp-jshint');
//var jsxcs = require('gulp-jsxcs');
var nodemon = require('gulp-nodemon');
var browserify = require('browserify');

var babel = require('gulp-babel');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');


// Location of all JS files that need to be linted
var JS_Files = ['*.js', 'src/**/*.js'];
// Location of all JSX files
var JSX_Files = ['src/views/*.js', 'src/views/*.jsx', 'src/views/script.jsx'];
// Location of all JS and JSX files
var JS_And_JSX_Files = ['*.js', 'src/**/*.js', 'src/views/*.js', 'src/views/*.jsx', 'src/views/script.jsx'];

// Gulp task to lint our JS files against JSCS and JSHint
gulp.task('style', function() {
    return gulp.src(JS_Files)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true    
        }));
});


// Gulp task to transpile our React JSX files into native ES5 ones
// and reacts a nice (and ugly/minified) bundle out of them
// Hint: https://gist.github.com/hecof/88813137c0309a4ab88f
var jsx2js = function () {
    browserify({
        entries: './src/views/script.jsx',
        extensions: ['.js', '.jsx'],
        debug: true
    })
        .transform('babelify', {
            presets: ['react']
        })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./public/js/'));
};
gulp.task('jsx2js', jsx2js);


// Gulp task to monitor the app server
// and restart it when changes in code are detected
gulp.task('serve', ['style', 'jsx2js'], function () {
    var options = {
        script: 'app.js',
        delayTime: 1,
        env: {
            'PORT': 5000
        },
//        watch: JS_Files,
        watch: JS_And_JSX_Files,
        /*tasks: function (changedFiles) {
            var tasks = [];
            // TODO: condition to check whether client- or server-side code has changed;
            // add jsx2js only if client-side code has changed
            tasks.push('jsx2js');
            return tasks;
        }*/
    };
    return nodemon(options)
        .on('restart', function (changedFiles) {
            console.log('Restarting...');
        });
});