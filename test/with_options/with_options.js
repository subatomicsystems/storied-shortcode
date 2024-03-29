'use strict'

var parse   = require('../../lib/parse')
var should  = require('chai').should()
var cheerio = require('cheerio')

describe('With Options', function() {

  var body = require('fs').readFileSync(__dirname + '/fixture.html', 'utf-8')

  it('should minify when specified', function(done) {
    parse(body, { minify : true, verbose : false, minify_opts : { collapseWhitespace : true } }, function(err, html) {
      should.not.exist(err)

      var $ = cheerio.load(html)
      $('iframe[src*="soundcloud.com"]').length.should.equal(1)

      done()
    })
  })

})