const path = require('path');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const OfflinePlugin = require('offline-plugin');
const dll = require('./app/public/js/dll/library.json');

const isDevelopment = process.env.NODE_ENV === 'development';

const sourcePath = path.join(__dirname, './');

const analyzer = process.env.WEBPACK_ANALYZER ? [new BundleAnalyzerPlugin()] : [];

// hot module reload dependencies
const hmr = isDevelopment ? ['webpack-hot-middleware/client'] : [];
const hmrPlugins = isDevelopment
  ? [new webpack.HotModuleReplacementPlugin({ multiStep: true })]
  : [];

// production dependencies
const uglify = isDevelopment ? [] : [new UglifyJsPlugin()];
const compression = isDevelopment
  ? []
  : [
    new CompressionPlugin({
      test: /[.js|.css]/,
    }),
  ];
const miniCss = isDevelopment
  ? []
  : [
    new MiniCssExtractPlugin({
      filename: './css/[name].css',
      chunkFilename: './css/[id].css',
    }),
  ];
const minCssPlugin = isDevelopment ? ['style-loader'] : [MiniCssExtractPlugin.loader];

const sw = isDevelopment
  ? []
  : [
    new OfflinePlugin({
      publicPath: path.join(__dirname, './app/public'),
      externals: ['/css/styles.css', '/js/dll/library.js'],
      ServiceWorker: {
        minify: false,
      },
    }),
  ];

module.exports = {
  entry: {
    // pages
    home: [...hmr, './app/client/pages/Home'],
  },

  mode: isDevelopment ? 'development' : 'production',

  devtool: isDevelopment ? 'inline-source-map' : false,

  output: {
    publicPath: '/',
    path: path.join(__dirname, './app/public'),
    filename: './js/[name].[hash].js',
    chunkFilename: './js/[name]-chunk.[chunkhash].js',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
      },
      {
        test: /\.css?$/,
        use: [...minCssPlugin, 'css-loader'],
      },
      {
        test: /.scss?$/,
        use: [...minCssPlugin, 'css-loader', 'sass-loader'],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(__dirname, 'node_modules'), sourcePath],
  },

  optimization: {
    namedModules: isDevelopment,
    splitChunks: {
      chunks: 'all',
    },
    noEmitOnErrors: true,
  },

  plugins: [
    // removing locales from moment
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /es/),

    // Static defines, with webpack -p these blocks are removed
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      __DEV__: true,
      __SSR__: false,
      __CLIENT__: true,
    }),

    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: dll,
    }),

    new ManifestPlugin({ writeToFileEmit: true }),

    ...sw,
    ...miniCss,
    ...hmrPlugins,
    ...uglify,
    ...compression,
    ...analyzer,
  ],
};
