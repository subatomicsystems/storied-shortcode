'use strict'

var _         = require('lodash')
var async     = require('async')
var glob      = require('glob')
var debug     = require('debug')('parser:parse')
var path      = require('path')
var Shortcode = require('wordpress-shortcode')
var minify    = require('html-minifier').minify

module.exports = function(body, options, callback) {

  if (typeof options === 'function') {
    callback = options
    options  = {}
  }

  var minifyOpts = _.defaults(options.minify_opts || {}, { collapseWhitespace : true });

  options = _.defaults(options, { verbose : true });

  /**
   * /!\ CONVENTION /!\
   *
   * Use the same file name as the name of the short code tag!
   *
   * ie. 'video-external' in 'shortcodes/video-external.js' detects
   *
   * [video-external src="http://foo.bar/video.mp4"]
   *
   */
  function parseShortcode(file, callback) {

    var tag = path.basename(file, '.js')

    Shortcode.replace(tag, body, require(file), function done(err, results) {

      if (err)
        return callback(err)

      if (options.minify)
        results = minify(results, minifyOpts)

      return callback(null, results)
    })

  }

  glob(__dirname + '/../shortcodes/*.js', function(err, files) {

    if (err)
      return callback(err)

    // for each supported shortcode converter
    async.eachSeries(files, function(file, callback) {

      parseShortcode(file, function(err, html) {
        if (err)
          return callback(err)

        body = html

        callback(null, html)
      })

    }, function done(err) {

      if (err)
        return callback(err)

      if (options.verbose)
        debug('Done parsing all shortcodes.')

      callback(null, body)
    })

  });

}
