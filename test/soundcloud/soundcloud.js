'use strict'

var parse   = require('../../lib/parse')
var should  = require('chai').should()
var cheerio = require('cheerio')

describe('Soundcloud', function() {

  var body = require('fs').readFileSync(__dirname + '/fixture.html', 'utf-8')

  it('should convert to a SoundCloud iframe', function(done) {
    parse(body, function(err, html) {
      should.not.exist(err)

      var $ = cheerio.load(html)
      $('iframe[src*="soundcloud.com"]').length.should.equal(1)

      done()
    })
  })

})