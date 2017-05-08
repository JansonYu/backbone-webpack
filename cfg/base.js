'use strict';
let path = require('path');
let defaultSettings = require('./defaults');
let webpack = require('webpack');

module.exports = {
  entry: {
    index:[
      './src/index'
    ],
    vendor: ['jquery', 'backbone','moment','numeral']
  },
  cache: false,
  devtool: 'source-map',
  additionalPaths: defaultSettings.additionalPaths,
  port: defaultSettings.port,
  debug: true,
  output: {
    path: path.join(__dirname, '/../dist/assets'),
    filename: '[name].js',
    publicPath: `.${defaultSettings.publicPath}`
  },
  devServer: {
    contentBase: './src/',
    historyApiFallback: true,
    hot: true,
    inline: true,
    port: defaultSettings.port,
    publicPath: defaultSettings.publicPath,
    noInfo: false,
    proxy: {

      // '/community-pc-war/*': {
      //   target: 'http://172.16.117.225:8000'
      // }

    '/community-pc-war/*': {
      target: 'http://localhost:' + defaultSettings.port,

      rewrite: function(req) {
        req.url = req.url.replace(/^\/community-pc-war/, '/testdata');
        req.method = "GET";
      },
      bypass: function(req, res, proxyOptions) {
        var noProxy = [
          // '/api/course/courseList.action'
          ];
        if (noProxy.indexOf(req.url) !== -1) {
          console.log('Skipping proxy for browser request.');
          return req.url;
        }
       }
      }
     }
  },
  resolve: {
    extensions: ['', '.js'],
    alias: {
      actions: `${defaultSettings.srcPath}/actions/`,
      components: `${defaultSettings.srcPath}/components/`,
      sources: `${defaultSettings.srcPath}/sources/`,
      stores: `${defaultSettings.srcPath}/stores/`,
      styles: `${defaultSettings.srcPath}/styles/`,
      jquery: `${defaultSettings.srcPath}/lib/jquery/jquery.min.js`
    }
  },
  module: {}
};
