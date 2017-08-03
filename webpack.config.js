const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const merge = require('./config/helper/mergeHelper');
let commonConfig = require('./config');

let settings = merge({
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'server.js'
    },
    target: 'node',
    context: __dirname,
    externals: [nodeExternals()],
    resolve: {
        extensions: ['.js'],
        alias: {
            'domains': path.resolve(__dirname, 'src/domains/'),
            'support': path.resolve(__dirname, 'src/support/')
        }
    },
    module: {}
}, commonConfig);

settings.plugins = [
    new CopyWebpackPlugin([
        { from: path.resolve(__dirname, 'src/.env') }
    ]),
    new webpack.IgnorePlugin(/\.(css|less)$/),
    new webpack.BannerPlugin({
        banner: "hash:[hash], chunkhash:[chunkhash], name:[name], filebase:[filebase], query:[query], file:[file]"
    })
];

if (process.env.NODE_ENV === 'production') {
    settings.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        mangle: true
    }));
}

module.exports = settings;