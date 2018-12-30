const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';
const sourcePath = path.join(__dirname, './');

// production dependencies
const uglify = isDevelopment ? [] : [new UglifyJsPlugin()];
const compression = isDevelopment
  ? []
  : [
    new CompressionPlugin({
      test: /[.js|.css]/,
    }),
  ];

module.exports = {
  mode: isDevelopment ? 'development' : 'production',

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(__dirname, 'node_modules'), sourcePath],
  },

  entry: {
    // static core libs, almost never changed
    library: [
      'babel-polyfill',
      'react',
      'react-dom',
      'redux',
      'react-redux',
      'promise.prototype.finally',
      'axios',
      'qs',
      'fbemitter',
    ],
  },

  output: {
    filename: '[name].js',
    path: path.join(__dirname, './app/public/js/dll'),
    library: '[name]',
  },

  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: './app/public/js/dll/[name].json',
    }),
    ...uglify,
    ...compression,
  ],
};
