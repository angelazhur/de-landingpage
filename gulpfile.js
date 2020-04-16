'use strict';

const gulp = require('gulp');

// styles
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
sass.compiler = require('node-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');

// js, html, css
const include = require('gulp-include');

// js
const minify = require('gulp-minify');

// files
const del = require('del');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');

const gulpIf = require('gulp-if');
const browserSync = require('browser-sync').create();

// errors
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');

// if run for prod ('gulp build') => NODE_ENV=production gulp build
// Its command remove sourcemaps from css file
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('test', function() {
    return console.log(isDevelopment);
})

// styles
gulp.task('styles', function() {
    return gulp.src('frontend/styles/*.sass')
        .pipe(plumber({
            errorHandler: notify.onError(err => ({
                title: 'Styles',
            message: err.message
            }))
        }))
        .pipe( gulpIf(isDevelopment, sourcemaps.init()) )
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(rename({
            basename: 'main',
            suffix: '.min'
        }))
        .pipe(autoprefixer({
            grid: true,
            cascade: false
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe( gulpIf(isDevelopment, sourcemaps.write()) )
        .pipe(gulp.dest('public/css/'))
});

// main script
gulp.task('script', function() {
    return gulp.src('frontend/js/script.js')
        .pipe(plumber({
            errorHandler: notify.onError(err => ({
                title: 'Scripts',
            message: err.message
            }))
        }))
        .pipe(minify({
            ext: {
                min: '.min.js'
            },
            noSource: true,
        }))
        .pipe(gulp.dest('public/js/'))
});

// vendors scripts
gulp.task('vendors_scripts', function() {
    return gulp.src('frontend/js/vendors.js')
        .pipe(plumber({
            errorHandler: notify.onError(err => ({
                title: 'Vendors Scripts',
            message: err.message
            }))
        }))
        .pipe(include({
            extensions: 'js',
            hardFail: true
        }))
        .pipe(minify({
            ext: {
                min: '.min.js'
            },
            noSource: true,
        }))
        .pipe(gulp.dest('public/js/'))
});

// html
gulp.task('html', function() {
    return gulp.src('frontend/templates/*.html')
        .pipe(plumber({
            errorHandler: notify.onError(err => ({
                title: 'HTML',
                message: err.message
            }))
        }))
        .pipe(include({
            extensions: 'html',
            includePaths: [
                __dirname + '/frontend/templates'
            ],
            hardFail: true
        }))
        .pipe(gulp.dest('public/'))
});

// remove 'public' dir
gulp.task('clean', function() {
    return del('public');
});

// copy all asssets (imgs, fonts, favicons and etc.) in 'public' dir
gulp.task('assets', function() {
    return gulp.src('frontend/assets/**', {since: gulp.lastRun('assets')})
        .pipe(imagemin())
        .pipe(gulp.dest('public'));
});

// build project for production
gulp.task('build', gulp.series(
    'clean',
    gulp.parallel('styles', 'vendors_scripts', 'script', 'assets', 'html'))
);

// watch files
gulp.task('watch', function() {
    gulp.watch('frontend/templates/**/*.*', gulp.series('html'));
    gulp.watch('frontend/styles/**/*.*', gulp.series('styles'));
    gulp.watch('frontend/assets/**/*.*', gulp.series('assets'));
    gulp.watch('frontend/js/script.js', gulp.series('script'));
});

// local server
gulp.task('serve', function() {
    browserSync.init({
        server: 'public',
    });
    browserSync.watch('public/**/*.*').on('change', browserSync.reload);
});

// develop task
gulp.task('dev',
    gulp.series('clean', 'build', gulp.parallel('watch', 'serve'))
);