var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');

/**
 * Gulp Tasks
 */

gulp.task('browser-sync', ['nodemon'], function() {
    browserSync({
        proxy: "localhost:3007/calendar-events",  // local node app address
        port: 5000,  // use *different* port than above
        notify: true,
        browser: ["chrome"]
    });
});

gulp.task('nodemon', function (cb) {
    var called = false;
    return nodemon({
        script: 'app.js',
        ignore: [
            'gulpfile.js',
            'node_modules/',
            'client_secret.json'
        ]
    })
        .on('start', function () {
            if (!called) {
                called = true;
                cb();
            }
        });
});

gulp.task('default', ['browser-sync'], function () {
    gulp.watch(['*.*'], reload);
    gulp.watch(['public/*.*'], reload);
});