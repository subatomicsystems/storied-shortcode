'use strict';

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

  return callback(null, template.render({ src : src }))
}
