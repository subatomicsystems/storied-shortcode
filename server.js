'use strict';

var _       = require('lodash')
var bParser = require('body-parser')
var app     = require('express')()
var parse   = require('./lib/parse')
var config  = require('./config.json')

var PORT    = process.env.PORT || config.port || 3000

app.use(bParser.text({ type: 'text/html' }));

app.get('/', function(req, res) {
  res.send('Shortcode Service is listening on %s', PORT)
})

app.post('/shortcode', function (req, res, next) {

  var body = req.body

  if (_.isEmpty(body))
    return next('Could not parse empty body')

  parse(body, function(err, html) {
    if (err)
      res.status(400).send(err)
    else
      res.send(html)
  })

})

// Error middleware
app.use(function(err, req, res, next) {
  var code = res.statusCode
  res.status(code).json({ error : err })
})

var server = app.listen(PORT, function () {
  var port = server.address().port
  console.log('Shortcode service listening on port %s', port)
})