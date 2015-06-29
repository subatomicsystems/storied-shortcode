var bunyan  = require('bunyan');

var logger = bunyan.createLogger({
  name: 'n2-aggregator',
  streams: [{
    level  : 'error',
    type   : 'rotating-file',
    path   : 'error.log',
    period : '1d',
    count  : 3
  }, {
    stream: process.stdout
  }]
});

/* silent logger for CI and tests */
if (process.env.NODE_ENV === 'test')
  logger.streams = [];

module.exports = logger;
