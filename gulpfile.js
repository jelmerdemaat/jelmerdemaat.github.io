var gulp = require('gulp'),
    sass = require('gulp-sass'),
    csso = require('gulp-csso'),
  	sourcemaps = require('gulp-sourcemaps'),
  	autoprefixer = require('gulp-autoprefixer'),
    include = require('gulp-include'),
    filter = require('gulp-filter'),
  	rename = require('gulp-rename'),
  	util = require('gulp-util'),
    browserSync = require('browser-sync').create(),
    pkg = require('./package.json');


/// Settings
////////////////////////////////////////////////////////

var src = 'src/',
    dest = 'assets/';

var html = {
	src: [
    src + '**/*.html'
  ],
  dest: './'
};


var scss = {
	src: src + 'sass/**/*.scss',
	dest: dest + 'css/',
  browsers: ['> 2%', 'last 2 versions', 'IE >= 10']
};


/// Tasks
////////////////////////////////////////////////////////

gulp.task('html', function() {
  html.filter = filter(['**', '!includes/**']);

	gulp.src(html.src)
    .pipe(html.filter)
    .pipe(include())
    .on('error', function(err) {
      util.log(err.message, err.description)
    })
		.pipe(gulp.dest(html.dest));
});

gulp.task('scss', function() {
  gulp.src(scss.src)
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compact'
    }))
    .pipe(autoprefixer({
      browsers: scss.browsers
    }))
    .pipe(sourcemaps.write('./maps/'))
    .on('error', util.log)
    .pipe(gulp.dest(scss.dest))
    .pipe(browserSync.stream({ match: '**/*.css' }));
});

gulp.task('scss:build', function() {
  gulp.src(scss.src)
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(autoprefixer({
      browsers: scss.browsers
    }))
    .pipe(csso())
    .on('error', util.log)
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(scss.dest));
});

gulp.task('develop', [
	'html',
	'scss'
]);

gulp.task('build', [
  'html',
  'scss:build'
]);

gulp.task('serve', ['develop'], function() {
  browserSync.init({
    server: "./",
    logConnections: true,
    logPrefix: pkg.name,
    open: false
  });

	gulp.watch(html.src, ['html']).on('change', browserSync.reload);
	gulp.watch(scss.src, ['scss']);
});

gulp.task('default', ['serve']);
