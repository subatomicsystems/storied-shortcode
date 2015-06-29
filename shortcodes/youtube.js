'use strict';

var template  = require('hogan.js').compile(
  require('fs').readFileSync(__dirname + '/../templates/youtube.mustache', 'utf-8')
)

module.exports = function(code) {
  var src = code.attrs.named.src ? code.attrs.named.src : code.attrs.numeric[0]

  if (src.charAt(0) === '=')
    src = src.substr(1)

  return template.render({ src : src })
}
