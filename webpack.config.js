const path = require("path");
const webpack = require("webpack");


const babelSettings = {
    extends: path.join(__dirname, '/.babelrc')
};

module.exports = (opts) => {
    var entry = [ "./src/jsx/App.jsx" ];
    var loaders = [ "babel?" + JSON.stringify(babelSettings) ];
    var plugins = [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin()
    ];

    if (opts.devserver) {
        loaders.unshift("react-hot");
        entry.unshift(
            "webpack-dev-server/client?http://0.0.0.0:8080",
            "webpack/hot/only-dev-server" // "only" prevents reload on syntax errors
        );
        plugins.push(new webpack.HotModuleReplacementPlugin());
    }

    var config = {
        devtool: "cheap-module-source-map",
        entry: entry,
        output: {
            path: path.join(__dirname, "build"),
            publicPath: "/",
            filename: "bundle.js"
        },

        devServer: {
           headers: { "Access-Control-Allow-Origin": "*" }
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
            modulesDirectories: ["./node_modules", "./src/jsx"]
        },
    };

    return config;
};
