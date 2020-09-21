'use strict';

const gulp = require('gulp');
const sass=require('gulp-sass');

function style(){
    return gulp
        .src('./src/style/style.sass')
        .pipe(sass())
        .pipe(gulp.dest('public/css'));
};



gulp.task('default', gulp.series(style));
exports.style= style;
