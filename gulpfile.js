var gulp = require('gulp'),
    sass = require('gulp-sass'),
    csso = require('gulp-csso'),
  	sourcemaps = require('gulp-sourcemaps'),
  	rename = require('gulp-rename');

var src = 'src/',
	dest = 'dist/';

var html = {
	src: src + '*.html',
	dest: dest
}

var scss = {
	src: src + 'sass/**/*.scss',
	dest: dest + 'css/'
}

gulp.task('html', function() {
	gulp.src(html.src)
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
      console.log(err);
    })
    .pipe(gulp.dest(scss.dest));
});

gulp.task('scss:build', function() {
  gulp.src(scss.src)
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(csso())
    .on('error', function(err) {
      console.log(err);
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

gulp.task('default', ['develop'], function() {
	gulp.watch(html.src, ['html']);
	gulp.watch(scss.src, ['scss']);
});