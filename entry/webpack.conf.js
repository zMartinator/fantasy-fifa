var webpack = require('webpack');
var path = require('path');

module.exports = {
  devServer: {
    host: 'localhost' // You can change this to your server IP address to access it remotely
  },
  hotMiddleware: {
    reload: true
  },
  resolve: {
    root: path.join(__dirname, '..', 'modules'),
    extensions: ['', '.js', '.jsx', '.json', '.css']
  }
};
