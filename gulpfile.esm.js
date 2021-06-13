import { src, dest, series, watch } from "gulp";

const sass = require("gulp-dart-sass");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");
const del = require("del");
const rename = require("gulp-rename");
const postcssNormalize = require("postcss-normalize");
const browserSync = require("browser-sync").create();

export function clean(done) {
  del.sync("dist");
  done();
}

export function build_cssmin() {
  var plugins = [postcssNormalize(), autoprefixer({}), cssnano()];
  return (
    src("src/**/*.scss")
      .pipe(sourcemaps.init())
      .pipe(sass({ includePaths: ["node_modules"] }).on("error", sass.logError)) // Using gulp-sass
      // Minify and prefix css
      .pipe(postcss(plugins))
      .pipe(rename({ suffix: ".min" }))
      .pipe(sourcemaps.write("."))
      .pipe(dest("dist/"))
  );
}

function bs_css() {
  return src("src/**/*.scss")
    .pipe(sass({ includePaths: ["node_modules"] }).on("error", sass.logError)) // Using gulp-sass
    .pipe(postcss([postcssNormalize()]))
    .pipe(dest("html/"))
    .pipe(browserSync.stream());
}

export function build_css() {
  return src("src/**/*.scss")
    .pipe(sass({ includePaths: ["node_modules"] }).on("error", sass.logError)) // Using gulp-sass
    .pipe(postcss([postcssNormalize()]))
    .pipe(dest("dist/"));
}

export function serve() {
  bs_css("html/");

  browserSync.init({
    server: "./html/",
  });

  watch("src/*.scss", bs_css);
}

export default series([clean, build_css, build_cssmin]);
