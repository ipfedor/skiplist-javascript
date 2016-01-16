module.exports = {
  {
      context: __dirname + '/src',
      entry: './index',
      output: {
          path: __dirname + '/build',
          filename: 'bundle.js',
      },
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
};
