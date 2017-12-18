'use strict';

var gulp = require('gulp');
var replace = require('gulp-replace');
var del = require('del');
var runSequence = require('run-sequence');

var npmDir = 'node_modules/';
var sharedDir = '../../ffh_shared/';
var wijmoDir = sharedDir + 'libs/wijmo/Dist/';

var srcDir = './src/';

var paths = {
  npmBootstrap: npmDir + 'bootstrap/scss/**',
  assets: srcDir +  'assets/',
  vendor: srcDir +  'vendor/'
};

gulp.task('bootstrap-sass-copy', function () {
  return gulp.src(paths.npmBootstrap).pipe(gulp.dest(paths.vendor + 'scss/bootstrap'));
});

gulp.task('wijmo-copy', function () {
  gulp.src( wijmoDir + 'styles/wijmo.css').pipe(gulp.dest(paths.vendor + 'wijmo/css' ));
  gulp.src( wijmoDir + 'controls/*.d.ts').pipe(gulp.dest(npmDir + '@types/wijmo' ));
  gulp.src( wijmoDir + 'controls/*.min.js' ).pipe(gulp.dest(paths.vendor + 'wijmo' ));
  return gulp.src( wijmoDir + 'controls/cultures/*.min.js').pipe(gulp.dest(paths.vendor + 'wijmo/cultures' ));

});
