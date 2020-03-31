const gulp = require("gulp");
const sass = require("gulp-sass");
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
// const purgecss = require('gulp-purgecss');


/*
  generate the css with sass
*/
gulp.task('css', function() {
  return gulp.src('./src/scss/main.scss')
    // Adding tailwind
    .pipe(postcss([
      require('tailwindcss'),
      require('autoprefixer'),
    ]))
    // .pipe(purgecss({
    //   content: ['./**/*.html']
    // }))
    .pipe(sass({
      outputStyle: 'compressed'
    })
    .on('error', sass.logError))
    .pipe(gulp.dest('./_site/css'));
});


/*
 Uglify our javascript files into one.
 Use pump to expose errors more usefully.
*/

gulp.task('js', function() {
  return gulp.src("./src/js/**/*.js")
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./_site/js'));
});


/*
  Watch folders for changess
*/
gulp.task("watch", function() {
  gulp.watch('./src/scss/**/*.scss', gulp.parallel('css'));
  gulp.watch('./src/js/**/*.js', gulp.parallel('js'));
});


/*
  Build task.
*/
gulp.task('build', gulp.parallel(
  'css',
  'js'
));