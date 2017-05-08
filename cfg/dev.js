'use strict';

let path = require('path');
let webpack = require('webpack');
let baseConfig = require('./base');
let defaultSettings = require('./defaults');

let config = Object.assign({}, baseConfig, {
  plugins: defaultSettings.plugins.concat([
    new webpack.HotModuleReplacementPlugin()
  ]),
  module: defaultSettings.getDefaultModules()
});

module.exports = config;
