const path = require('path')
const nodeExternals = require('webpack-node-externals')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const env = process.env.NODE_ENV

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'server.js'
    },
    target: 'node',
    externals: [nodeExternals()],
    resolve: {
        extensions: ['.js'],
        alias: {
            'domains': path.resolve(__dirname, 'src/domains/'),
            'support': path.resolve(__dirname, 'src/support/')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                        plugins: ['transform-runtime']
                    }
                }
            }
        ]
    },
    plugins: env === 'production'
    ? [

    ] : [
        new CopyWebpackPlugin([
            { from: path.resolve(__dirname, 'src/.env') }
        ])
    ]
}