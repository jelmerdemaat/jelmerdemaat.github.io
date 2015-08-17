var gulp = require('gulp'),
    sass = require('gulp-sass'),
    csso = require('gulp-csso'),
  	sourcemaps = require('gulp-sourcemaps'),
    include = require('gulp-include'),
    filter = require('gulp-filter'),
  	rename = require('gulp-rename'),
  	util = require('gulp-util'),
    browserSync = require('browser-sync').create(),
    pkg = require('./package.json');

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
	dest: dest + 'css/'
};

gulp.task('html', function() {
  var f = filter(['*','!src/includes']);

  /// TODO: Fix filer in build process

	gulp.src(html.src)
    .pipe(include({
      // extensions: 'html'
    }))
    .on('error', function(err) {
      util.log(err);
    })
    .pipe(f)
    // .pipe(util.log('*', '!' + src + 'includes/*.'))
		.pipe(gulp.dest(html.dest));
});

gulp.task('scss', function() {
  gulp.src(scss.src)
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compact'
    }))
    .pipe(sourcemaps.write('./maps/'))
    .on('error', function(err) {
      util.log(err);
    })
    .pipe(gulp.dest(scss.dest))
    .pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('scss:build', function() {
  gulp.src(scss.src)
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(csso())
    .on('error', function(err) {
      util.log(err);
    })
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
