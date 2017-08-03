const nodeExternals = require('webpack-node-externals');

module.exports = {
    externals: [nodeExternals()],
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
            },
            { 
                test: /\.json$/, 
                use: { loader: "json-loader" } 
            }
        ]
    },
    plugins: []
}