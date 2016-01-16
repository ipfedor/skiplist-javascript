const path = require('path');

module.exports = {
    devtool: 'sourcemap',
    context: __dirname,
    entry: {
        'dist/bundle': path.resolve(__dirname, './src/index.js'),
        'test/bundle': path.resolve(__dirname, './test/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './'),
        filename: '[name].js',
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'stage-1'],
                },
            },
        ],
    },
    node: {
        fs: 'empty',
    },
};
