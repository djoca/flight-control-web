var gulp = require('gulp');
var del = require('del');
var fs = require('fs');

gulp.task('clean', function() {
  return del('build');
});

gulp.task('src-flights', function() {
  return gulp.src('app/flights/*').pipe(gulp.dest('build/flights'));
});

gulp.task('src-admin', function() {
  return gulp.src('app/admin/*').pipe(gulp.dest('build/admin'));
});

gulp.task('src', ['src-flights', 'src-admin'], function() {
  return gulp.src(['app/*.js', 'app/*.html']).pipe(gulp.dest('build'));
});

gulp.task('lib', function(){
  return gulp.src([
  'node_modules/angular/angular.min.js',
  'node_modules/angular-route/angular-route.min.js',
  'node_modules/bootstrap/dist/js/bootstrap.min.js',
  'node_modules/jquery/dist/jquery.min.js'
  ]).pipe(gulp.dest('build/lib'));
});

gulp.task('css', function(){
  return gulp.src('app/bower_components/bootstrap/dist/css/bootstrap.min.css')
    .pipe(gulp.dest('build/css'));
});

gulp.task('build', ['src', 'lib', 'css']);

gulp.task('default', [ 'build' ]);
