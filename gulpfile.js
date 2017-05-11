var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var watch = require('gulp-watch');

gulp.task('default', function() {
  gulp.start(['nodemon']);
});

gulp.task('nodemon', function (cb) {
  var started = false;
  return nodemon({
    script: './bin/www',
    watch: ['*.js', '*.json', 'views/**/*.*'],
    ignore: ['dist/*', 'src/*']
  }).on('start', function () {
    // to avoid nodemon being started multiple times
    if (!started) {
      cb();
      started = true;
    }
  });
});