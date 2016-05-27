/**
 * Authored by Bo Du, 2016.
 *
 */

const gulp = require("gulp");
const del = require("del");
const vinylPaths = require("vinyl-paths");
const webpack = require("webpack");

// Clean out the build directory
gulp.task("clean", () => {
    return gulp.src("./build")
        .pipe(vinylPaths(del));
});

// Build the bundle.js file
gulp.task("build:bundle", () => {
    return gulp.src("./src/jsx")
        .pipe(webpack(require("./webpack.config.js")))
        .pipe(gulp.dest("./build"));
});

// Copy over html file(s), this design can be extended to copy over all
// types of static files.
gulp.task("build:copy-html", () => {
    return gulp.src("./src/*.html")
        .pipe(gulp.dest("./build"));
});

// We need to execute the "clean" task before our build tasks.
gulp.task("build", ["clean"], () => {
    // Gulp processes these tasks in parallel, order here is not important.
    // If you want to process tasks sequentially, check out https://www.npmjs.com/package/run-sequence
    gulp.start("build:bundle", "build:copy-html");
});
