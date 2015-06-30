'use strict'

var parse   = require('../../lib/parse')
var should  = require('chai').should()
var cheerio = require('cheerio')

describe('YouTube', function() {

  var body = require('fs').readFileSync(__dirname + '/fixture.html', 'utf-8')

  it('should convert to a YouTube iframe', function(done) {
    parse(body, function(err, html) {
      should.not.exist(err)

      var $ = cheerio.load(html)
      $('iframe[src*="youtube.com"], iframe[src*="youtu.be"]').length.should.equal(3)

      done()
    })
  })

})