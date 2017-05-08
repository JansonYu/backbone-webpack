/*eslint no-console:0 */
'use strict';
const config = require('./webpack.config');
const open = require('open');

console.log('Listening at localhost:' + config.port);
console.log('Opening your system browser...');

// open('http://localhost:' + config.port + '/');
open('http://localhost:' + config.port + '/index.html');
