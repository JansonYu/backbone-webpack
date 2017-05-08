'use strict';
let webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');


// Additional npm or bower modules to include in builds
// Add all foreign plugins you may need into this array
// @example:
// let npmBase = path.join(__dirname, '../node_modules');
let additionalPaths = [];
const srcPath = path.join(__dirname, '/../src');
const dfltPort = 9098;
function getDefaultModules() {
  return {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        include: srcPath,
        loader: 'eslint-loader'
      }
      ],
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader",  { publicPath: './'}) 
      },
      { 
          test: /\.less$/, 
          loader: ExtractTextPlugin.extract("style-loader", "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!less-loader",  { publicPath: './'}) 
      },
      {
        test: /\.html$/,
        loader: 'mustache?noShortcut'
      },
      {
        test: /\.(png|jpg|gif|eot|svg|ttf|woff|woff2)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.(mp4|ogg)$/,
        loader: 'file-loader'
      },
      {
        test: /\.(js)$/,
        loader: 'es3ify-loader'
      },
      {
        test: /\.(js)$/,
        loader: 'babel',
        include: [].concat(
          additionalPaths,
          [ path.join(__dirname, '/../src') ]
        )
      }
    ]
  };
}
module.exports = {
  srcPath: srcPath,
  additionalPaths: additionalPaths,
  publicPath: '/assets/',
  port: dfltPort,
  getDefaultModules: getDefaultModules,
  postcss: function () {
    return [];
  },
  cache: false,
  devtool: 'source-map',
  plugins: [
    new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new ExtractTextPlugin("[name].css"),
    new webpack.optimize.UglifyJsPlugin({
        compress: { screw_ie8: false },
        output: { screw_ie8: false },
        mangle: false
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};