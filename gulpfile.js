'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require("gulp-rename");


gulp.task('dist', function(){

    return gulp.src('./src/**/*.js')
        .pipe(concat('jT.js'))
        .pipe(gulp.dest('./dist/'));

});

gulp.task('compress', function () {
    gulp.src('./dist/jT.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist'))
})