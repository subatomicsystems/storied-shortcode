'use strict'

var _         = require('lodash')
var async     = require('async')
var glob      = require('glob')
var log       = require('./logger')
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
    var name = path.basename(file, '.js')
    var html = Shortcode.replace(name, body, require(file))

    if (options.verbose)
      log.info({ shortcode : name }, 'Done')

    html = minify(html, minifyOpts)

    callback(null, html)
  }

  glob(__dirname + '/../shortcodes/*.js', function(err, files) {

    if (err)
      return callback(err)

    async.each(files, function(file, callback) {

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
        log.info('Done parsing all shortcodes.')

      callback(null, body)
    })


  });

}
