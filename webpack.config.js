var path = require("path");
var webpack = require("webpack");

module.exports = {
    var loaders = [];
    if (opts.hotReload) {
        loaders.push("react-hot");
    }

    var devtool;
    var plugins = [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin(),
    ];
    var entry = [
        "./wartortle/jsx/components/App.jsx",
    ];

    // PRODUCTION CONFIGURATION
    if (opts.environment === "PRODUCTION") {
        devtool = "source-map";
    }

    // DEVELOPMENT CONFIGURATION
    if (opts.environment === "DEVELOPMENT") {
        if (opts.hotReload) {
            entry.unshift(
                "webpack-dev-server/client?http://0.0.0.0:5050",
                "webpack/hot/only-dev-server" // "only" prevents reload on syntax errors
            );
            plugins.push(new webpack.HotModuleReplacementPlugin());
        }
        devtool = "cheap-module-source-map";
    }

    var config = {
        devtool: devtool,
        entry: entry,
        output: {
            path: path.join(__dirname, "build"),
            publicPath: "/",
            filename: "bundle.js"
        },
        plugins: plugins,
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    loaders: loaders,
                    exclude: /node_modules/,
                }
            ]
        },
        resolve: {
            modulesDirectories: ["./node_modules", "./wartortle/jsx"]
        },
    };

    if (opts.watch) {
        _.extend(config, { watch: true });
    }

    if (opts.plugins !== undefined && opts.plugins.length > 0) {
        for (var i = 0; i < opts.plugins.length; i++) {
            config.plugins.push(opts.plugins[i]);
        }
    }

    var babelSettings = {
        cacheDirectory: true,
        presets: ["es2015", "react"],
    };

    if (opts.babelPlugins !== undefined && opts.babelPlugins.length > 0) {
        babelSettings.plugins = opts.babelPlugins;
    }

    if (opts.testing) {
        babelSettings.presets.push("airbnb");

        config.externals = {
          "cheerio": "window",
          "react/addons": true,
          "react/lib/ExecutionEnvironment": true,
          "react/lib/ReactContext": true
        };
    }

    // Add babel loader
    config.module.loaders[0].loaders.push("babel?" + JSON.stringify(babelSettings));

    return config;
};
