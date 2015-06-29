'use strict';

var parse = require('./lib/parse')
var body  = require('fs').readFileSync('test.html', 'utf-8')

parse(body, function(err, body) {

  if (err)
    throw err

  console.log(body)
})