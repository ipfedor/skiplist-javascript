const path = require('path');

module.exports = {
    devtool: 'sourcemap',
    context: __dirname,
    entry: {
        'index': path.resolve(__dirname, './main.js'),
        'test/bundle': path.resolve(__dirname, './test/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './'),
        filename: '[name].js',
        library: 'skiplist',
        libraryTarget: 'umd',
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel',
                cacheDirectory: true,
            },
        ],
    },
    node: {
        fs: 'empty',
    },
};
