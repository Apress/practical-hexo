'use strict'

var sass = require('sass')
var extend = require('util')._extend

module.exports = (ext) => function (data) {
  var userConfig = extend(
    this.theme.config.sass || {},
    this.config.sass || {}
  )

  var config = extend({
    data: data.text,
    file: data.path,
    outputStyle: 'nested',
    sourceComments: false
  }, userConfig)

  try {
    var result = sass.renderSync(config);
    return result.css.toString();
  } catch (error) {
    console.error(error.toString());
    throw error;
  }
}
