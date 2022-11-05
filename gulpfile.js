const dartSass = require("sass");
const gulpSass = require("gulp-sass");
const { src, dest, watch, parallel, series } = require("gulp");
const sourceMap = require("gulp-sourcemaps");
const autoPrefixer = require("gulp-autoprefixer");
const sass = gulpSass(dartSass);

const cleanCss = require("gulp-clean-css");

const scssPath = "./scss/**/*";

const styles = () =>
  src(scssPath + ".scss")
    .pipe(sourceMap.init())
    .pipe(sass())
    .pipe(
      autoPrefixer({
        grid: "no-autoplace",
      })
    )
    .pipe(cleanCss())
    .pipe(sourceMap.write("./"))
    .pipe(dest("./css"));

function main() {
  watch(scssPath, styles);
}

exports.watch = main;
