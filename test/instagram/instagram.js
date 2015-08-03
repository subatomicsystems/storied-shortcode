'use strict'

var parse   = require('../../lib/parse')
var should  = require('chai').should()
var cheerio = require('cheerio')

describe('Instagram', function() {

  var body = require('fs').readFileSync(__dirname + '/fixture.html', 'utf-8')

  it('should convert to Instagram blockquotes', function(done) {
    this.timeout(5000)

    parse(body, function(err, html) {
      should.not.exist(err)

      var $ = cheerio.load(html)
      $('blockquote.instagram-media').length.should.equal(2)

      done()
    })
  })

})