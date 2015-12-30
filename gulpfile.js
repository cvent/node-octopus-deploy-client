var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    releaseTasks = require('gulp-release-tasks'),
    raml = require('gulp-raml'),
    del = require('del'),
    ramlClientGenerator = require('gulp-raml-client-generator'),
    eslint = require('gulp-eslint');

// Load tasks into gulp
releaseTasks(gulp);

var paths = {
  scripts: ['index.js'],
  dist: ['dist/**/*.js'],
  tests: ['test/**/*.js'],
  raml: ['api.raml']
};

gulp.task('lint', function() {
  return gulp.src(paths.scripts)
          .pipe(eslint())
          .pipe(eslint.format())
          .pipe(eslint.failOnError());
});

gulp.task('generate-client', function() {
  gulp.src('raml/api.raml')
      .pipe(ramlClientGenerator())
      .pipe(gulp.dest('dist/'));
});

gulp.task('clean', function(cb){
  del(['dist/'], cb);
});

gulp.task('verify-raml', function() {
  gulp.src(paths.raml)
    .pipe(raml())
    .pipe(raml.reporter('default'));
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['test']);
  gulp.watch(paths.tests, ['test']);
});

gulp.task('test', ['generate-client', 'lint'], function() {
  return gulp.src(paths.tests, {read: false})
        .pipe(mocha());
});

gulp.task('default', ['test']);
