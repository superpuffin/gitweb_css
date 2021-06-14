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
const babel = require("gulp-babel");
const terser = require("gulp-terser");

export function clean(done) {
  del.sync("dist");
  done();
}

export function js() {
  return src("src/js/**/*.js")
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(dest("dist/js/"));
}

export function js_min() {
  return src("src/js/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(terser())
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("."))
    .pipe(dest("dist/js/"));
}

export function build_cssmin() {
  var plugins = [postcssNormalize(), autoprefixer({}), cssnano()];
  return (
    src("src/scss/**/*.scss")
      .pipe(sourcemaps.init())
      .pipe(sass({ includePaths: ["node_modules"] }).on("error", sass.logError)) // Using gulp-sass
      // Minify and prefix css
      .pipe(postcss(plugins))
      .pipe(rename({ suffix: ".min" }))
      .pipe(sourcemaps.write("."))
      .pipe(dest("dist/css/"))
  );
}

function bs_css() {
  return src("src/scss/**/*.scss")
    .pipe(sass({ includePaths: ["node_modules"] }).on("error", sass.logError)) // Using gulp-sass
    .pipe(postcss([postcssNormalize()]))
    .pipe(dest("html/css"))
    .pipe(browserSync.stream());
}

export function build_css() {
  return src("src/scss/**/*.scss")
    .pipe(sass({ includePaths: ["node_modules"] }).on("error", sass.logError)) // Using gulp-sass
    .pipe(postcss([postcssNormalize()]))
    .pipe(dest("dist/css/"));
}

export function serve() {
  bs_css("html/");

  browserSync.init({
    server: "./html/",
  });

  watch("src/**/*.scss", bs_css);
}

export default series([clean, build_css, build_cssmin, js, js_min]);
