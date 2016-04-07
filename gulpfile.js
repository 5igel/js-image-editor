var gulp = require('gulp');
var ts = require('gulp-typescript');
var watch = require('gulp-watch');
var source = require('vinyl-source-stream');
var tsProject = ts.createProject('./src/tsconfig.json');
var connect = require('gulp-connect');
/*
 compile typescript
 use ES5 and commonJS module
 */
gulp.task('typescript', function () {
    return gulp.src(
            [
                'src/main.ts',
                'typings/tsd.d.ts'
            ]
        )
        .pipe(ts(tsProject))
        .js.pipe(gulp.dest('dist/js'));
});
/*
 Web server to test app
 */
gulp.task('webserver', function () {
    connect.server({
        livereload: true,
        root: ['dist']
    });
});

/*
 Automatic Live Reload
 */
gulp.task('livereload', function () {
    gulp.src(['dist/styles/*.css', 'dist/js/*.js'])
        .pipe(watch(['dist/styles/*.css', 'dist/js/*.js']))
        .pipe(connect.reload());
});
/*
 copy all html files and assets
 */
gulp.task('copy', function () {
    gulp.src('src/**/*.html').pipe(gulp.dest('dist'));
    gulp.src('src/assets/**/*.*').pipe(gulp.dest('dist/assets'));
});

/*
 compile less files

gulp.task('less', function () {
    gulp.src('src/styles/semantic.less')
        .pipe(less())
        .pipe(gulp.dest('dist/styles'));
});
 */

/*
 Watch typescript and less
 */
gulp.task('watch', function () {
    gulp.watch('src/styles/*.less', ['less']);
    gulp.watch('src/**/*.ts', ['typescript']);
    gulp.watch('src/**/*.html', ['copy']);
});

/*
 default task
 */
gulp.task('default', ['typescript', 'copy', 'webserver', 'livereload', 'watch']);