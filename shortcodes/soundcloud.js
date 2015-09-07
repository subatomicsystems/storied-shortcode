'use strict';

var debug = require('debug')('parser:soundcloud')

var template  = require('hogan.js').compile(
  require('fs').readFileSync(__dirname + '/../templates/soundcloud.mustache', 'utf-8')
)

module.exports = function(code, callback) {

  var params = code.attrs.named.params
  var url    = code.attrs.named.url ? code.attrs.named.url : code.attrs.numeric[0]

  if (url && url.charAt(0) === '=')
    url = url.substr(1)

  if (!url)
    return callback(null)

  debug('SoundCloud URL found: ' + url)

  var renderedTemplate = template.render({ url : url, params : params })
  debug('SoundCloud rendered template: ' + renderedTemplate)
  return callback(null, renderedTemplate);
}
