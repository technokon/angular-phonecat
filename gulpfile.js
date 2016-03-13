var gulp = require('gulp');
var webserver = require('gulp-webserver');

gulp.task('webserver', function() {
    gulp.src('app')
        .pipe(webserver({
            livereload: true,
            directoryListing: false,
            open: false,
            fallback: 'index.html'
        }));
});