var webpack = require('webpack');

var babelSettings = { presets: ['react', 'es2015', 'stage-0'] };

module.exports = {
  entry: './entry',
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel', query: babelSettings, exclude: /node_modules/ }
    ]
  }
};
