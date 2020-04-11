var gulp = require('gulp');
var browserSync = require('browser-sync').create();

function css() {
  var postcss = require('gulp-postcss');
  var tailwindcss = require('tailwindcss');

  return gulp.src('css/styles.css')
    .pipe(postcss([
      tailwindcss('./js/tailwind.js'),
      require('autoprefixer'),
    ]))
    .pipe(gulp.dest('assets/'))
    .pipe(browserSync.stream());
}

gulp.task('css', css);


gulp.task('serve', gulp.series('css', function() {
  browserSync.init({
      server: "./"
  });

  gulp.watch("./css/styles.css", css);
  gulp.watch("./*.html").on('change', browserSync.reload);
}));

gulp.task('default', gulp.series('serve'));