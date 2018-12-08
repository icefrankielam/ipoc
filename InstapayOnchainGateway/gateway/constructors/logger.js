const fs = require('fs')
const path = require('path')
const morgan = require('morgan')
const rfs = require('rotating-file-stream')

const logsDirectory = path.join(__dirname, '../logs')

const logger = {}

// ensure log directory exists
fs.existsSync(logsDirectory) || fs.mkdirSync(logsDirectory)

const logStreamConfig = {
  interval: '1d', // rotate daily
  compress: 'gzip', // compress rotated files
  path: logsDirectory,
}

const accessLogStream = rfs('access.log', logStreamConfig)
const errorLogStream = rfs('error.log', logStreamConfig)


module.exports.outLogger = morgan('dev', {
  skip: (req, res) => res.statusCode < 400,
  stream: process.env.NODE_ENV !== 'development' ? errorLogStream : process.stderr,
})

module.exports.errLogger = morgan('dev', {
  skip: (req, res) => res.statusCode >= 400,
  stream: process.env.NODE_ENV !== 'development' ? accessLogStream : process.stdout,
})
