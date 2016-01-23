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
                query: {
                    presets: ['node5'],
                    plugins: [
                        'transform-class-properties',
                        'transform-export-extensions'
                    ],
                },
            },
        ],
    },
    node: {
        fs: 'empty',
    },
};
