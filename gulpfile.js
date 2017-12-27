var gulp = require('gulp');
var del = require('del');
var fs = require('fs');

gulp.task('clean', function() {
  return del('build');
});

gulp.task('src-flights', function() {
  return gulp.src('app/flights/*').pipe(gulp.dest('build/flights'));
});

gulp.task('src', ['src-flights'], function() {
  return gulp.src(['app/*.js', 'app/*.html']).pipe(gulp.dest('build'));
});

gulp.task('lib', function(){
  return gulp.src([
  'app/bower_components/angular/angular.min.js',
  'app/bower_components/angular-route/angular-route.min.js',
  'app/bower_components/bootstrap/dist/js/bootstrap.min.js',
  'app/bower_components/jquery/dist/jquery.min.js'
  ]).pipe(gulp.dest('build/lib'));
});

gulp.task('css', function(){
  return gulp.src('app/bower_components/bootstrap/dist/css/bootstrap.min.css')
    .pipe(gulp.dest('build/css'));
});

gulp.task('build', ['src', 'lib', 'css']);

gulp.task('default', [ 'build' ]);
