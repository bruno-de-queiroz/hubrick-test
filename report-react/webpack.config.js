var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    context: path.join(__dirname, "src"),
    devtool: debug ? "inline-sourcemap" : null,
    entry: ['babel-polyfill', "./index.js"],
    module: {
        loaders: [
            {
                test: /\.css?$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: [
                        'react-html-attrs',
                        'transform-class-properties',
                        'transform-decorators-legacy',
                    ]
                }
            }
        ]
    },
    output: {
        path: path.join(__dirname, "build"),
        filename: "app.min.js"
    },
    devServer: {
        historyApiFallback: {
            index: 'index.html'
        }
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            }
        }),
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, "src/index.html"),
                to: path.join(__dirname, "build/index.html")
            }
        ]),
        new webpack.optimize.UglifyJsPlugin({mangle: true, sourcemap: false}),
    ],
};
