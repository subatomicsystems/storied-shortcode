'use strict'

var parse   = require('../../lib/parse')
var should  = require('chai').should()
var cheerio = require('cheerio')

describe('Twitter', function() {

  var body = require('fs').readFileSync(__dirname + '/fixture.html', 'utf-8')

  it('should convert to Twitter tweet', function(done) {
    this.timeout(5000)

    parse(body, function(err, html) {
      should.not.exist(err)

      var $ = cheerio.load(html)
      $('.n2-static-embed.twitter-tweet').length.should.equal(1)

      done()
    })
  })

})