const path = require("path");
const webpack = require("webpack");


const babelSettings = {
    cacheDirectory: true,
    presets: ["es2015", "react"],
};

module.exports = (opts) => {
    var entry = [ "./src/jsx/App.jsx" ];
    var loaders = [ "babel?" + JSON.stringify(babelSettings) ];

    if (opts.devserver) {
        loaders.unshift("react-hot");
        entry.unshift(
            "webpack-dev-server/client?http://0.0.0.0:5050",
            "webpack/hot/only-dev-server" // "only" prevents reload on syntax errors
        );
    }

    var config = {
        devtool: "cheap-module-source-map",
        entry: entry,
        output: {
            path: path.join(__dirname, "build"),
            publicPath: "/",
            filename: "bundle.js"
        },
        plugins: [
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.NoErrorsPlugin()
        ],
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
