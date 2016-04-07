var gulp = require('gulp');
var ts = require('gulp-typescript');
var watch = require('gulp-watch');
var source = require('vinyl-source-stream');
var tsProject = ts.createProject('./src/tsconfig.json');
var connect = require('gulp-connect');
var webpack = require('webpack-stream');
var del = require('del');

var TMP_FOLDER = '.tmp/';
var DIST_FOLDER = 'dist/';

gulp.task('clean', ['clean:tmp', 'clean:dist']);

gulp.task('clean:tmp', function (cb) {
    del(TMP_FOLDER, cb);
});

gulp.task('clean:tmp2', function (cb) {
    del(TMP_FOLDER, cb);
});


gulp.task('clean:dist', function (cb) {
    del(DIST_FOLDER, cb);
});

gulp.task('typescript', function () {
    return gulp.src(
        [
            'src/*.ts',
            'src/*/**.ts',
            'typings/tsd.d.ts'
        ]
        )
        .pipe(ts(tsProject))
        .js
        .pipe(gulp.dest(TMP_FOLDER))
        .pipe(webpack( require('./webpack.config.js') ))
        .pipe(gulp.dest(DIST_FOLDER + 'js/'));
});

gulp.task('build-files', ['clean', 'typescript'], function (cb) {
    cb();
});
gulp.task('build', ['build-files']);

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
    gulp.src(['src/styles/*.css', 'src/**/*.ts'])
        .pipe(watch(['src/styles/*.css', 'src/**/*.ts']))
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
gulp.task('default', ['build', 'copy', 'webserver', 'livereload', 'watch']);