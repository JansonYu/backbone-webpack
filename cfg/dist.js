'use strict';

let path = require('path');
let webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

let baseConfig = require('./base');
let defaultSettings = require('./defaults');

let config = Object.assign({}, baseConfig, {
  plugins: defaultSettings.plugins.concat([
    new HtmlWebpackPlugin({
      template: 'src/index_dist.htm',
      filename: '../index.html',
      hash: true,
    })
  ]),
  module: defaultSettings.getDefaultModules()
});


module.exports = config;