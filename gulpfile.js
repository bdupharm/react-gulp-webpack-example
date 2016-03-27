/**
 * Authored by Bo Du, 2016.
 *
 */

const gulp = require("gulp");
const gutil = require("gulp-util");
const del = require("del");
const vinylPaths = require("vinyl-paths");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const webpackConfig = require("./webpack.config.js");

// Clean out the build directory
gulp.task("clean", () => {
    return gulp.src("./build")
        .pipe(vinylPaths(del));
});

// Build the bundle.js file
gulp.task("build:bundle", (cb) => {
    webpack(webpackConfig({ devserver: false }), (err, stats) => {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        cb();
   });
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

gulp.task("serve", ["build:copy-html"], function(callback) {
    // Start a webpack-dev-server
    var compiler = webpack(webpackConfig({ devserver: true }));

    new WebpackDevServer(compiler, {
        // server and middleware options
        contentBase: "./build",
        publicPath: "/",
        hot: true,
        historyApiFallback: true,
    }).listen(8080, "0.0.0.0", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        // Server listening
        gutil.log("[webpack-dev-server]", "http://0.0.0.0:8080/");

        // keep the server alive or continue?
        // callback();
    });
});
