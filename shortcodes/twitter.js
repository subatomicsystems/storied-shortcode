/**
 * Instagram shortcode uses the smartifier to convert the shortcodes to a template
 */

'use strict';

var config  = require('../config.json')
var request = require('request')
var debug = require('debug')('parser:twitter')

module.exports = function(code, callback) {

  var url = code.attrs.named.url ? code.attrs.named.url : code.attrs.numeric[0]

  if (url && url.charAt(0) === '=')
    url = url.substr(1)

  if (!url)
    return callback(null)

  debug('Twitter URL found: ' + url)

  request({
    url    : config.smartifier,
    method : 'POST',
    body : {
      html : url,
      options : { 'smartify' : ['twitter'] }
    },
    json : true
  }, function (err, res, body) {
    if (err)
      return callback(null)

    debug('Twitter Smartified HTML: ' + body.html)
    return callback(null, body.html)
  })
}
