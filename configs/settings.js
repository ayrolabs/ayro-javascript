/* eslint-disable import/no-extraneous-dependencies */

'use strict';

const project = require('../package.json');
const {properties} = require('@ayro/commons');

module.exports = (env) => {
  const settings = {env};
  if (env === 'production') {
    settings.apiUrl = 'https://api.ayro.io';
    settings.webcmUrl = 'https://webcm.ayro.io';
    settings.libUrl = `https://cdn.ayro.io/sdks/ayro-${project.version}.min.js`;
    settings.libCssUrl = `https://cdn.ayro.io/sdks/ayro-${project.version}.min.css`;
    settings.frameUrl = `https://cdn.ayro.io/sdks/ayro-frame-${project.version}.min.js`;
    settings.frameCssUrl = `https://cdn.ayro.io/sdks/ayro-frame-${project.version}.min.css`;
  } else {
    settings.apiUrl = properties.get('api.url', 'http://localhost:3000');
    settings.webcmUrl = properties.get('webcm.url', 'http://localhost:3102');
    settings.libUrl = '/dist/ayro.js';
    settings.libCssUrl = '/dist/ayro.css';
    settings.frameUrl = '/dist/ayro-frame.js';
    settings.frameCssUrl = '/dist/ayro-frame.css';
  }
  return settings;
};
