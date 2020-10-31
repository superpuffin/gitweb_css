var gulp                = require('gulp');
var sass                = require('gulp-sass');
var autoprefixer        = require('autoprefixer');
var cssnano             = require('cssnano');
var postcss             = require('gulp-postcss');
var sourcemaps          = require('gulp-sourcemaps');
var del                 = require('del');
var rename              = require('gulp-rename');
const postcssNormalize  = require('postcss-normalize');

gulp.task('clean', function(done) {
    del.sync('dist');
    done();
});

gulp.task('build:cssmin', function(){
    var plugins = [
        postcssNormalize(),
        autoprefixer({}),
        cssnano()
    ];
    return gulp.src('src/**/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError)) // Using gulp-sass
      // Minify and prefix css
      .pipe(postcss(plugins))
      .pipe(rename({suffix: '.min'}))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('dist/'))
  });

  gulp.task('build:css', function(){
    return gulp.src('src/**/*.scss')
      .pipe(sass().on('error', sass.logError)) // Using gulp-sass
      .pipe(postcss([postcssNormalize()]))
      .pipe(gulp.dest('dist/'))
  });

  gulp.task('default', gulp.series([
      'clean',
      'build:css',
      'build:cssmin'
  ]));