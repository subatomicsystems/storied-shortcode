'use strict';

var debug = require('debug')('parser:youtube')

var template  = require('hogan.js').compile(
  require('fs').readFileSync(__dirname + '/../templates/youtube.mustache', 'utf-8')
)

module.exports = function(code, callback) {

  var src = code.content ? code.content :
    code.attrs.named.src ? code.attrs.named.src : code.attrs.numeric[0]

  if (src && src.charAt(0) === '=')
    src = src.substr(1)

  if (!src)
    return callback(null)

  debug('YouTube URL found: ' + src)

  var renderedTemplate = template.render({ src : src })
  debug('YouTube rendered template: ' + renderedTemplate)
  return callback(null, renderedTemplate)
}
