const path = require('path')
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const { outLogger, errLogger } = require('@/constructors/logger')
const { packages } = require('@/config')

const { sessionStore, session, IPOC_EXPRESS_SESSION_SECRET } = require('./express-session')


module.exports = async () => {
  const app = express()

  app.set('view engine', 'ejs')
  app.set('views', path.resolve(__dirname, './views'))
  app.use(express.static(path.resolve(__dirname, '../../public')))
  app.use('/static', express.static(path.resolve(__dirname, '../../public')))
  app.use('/public', express.static(path.resolve(__dirname, '../../public')))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cookieParser(IPOC_EXPRESS_SESSION_SECRET))
  app.use(cookieParser())
  app.use(outLogger)
  app.use(errLogger)
  app.disable('x-powered-by')

  if (packages.express['express-session']) {
    app.use(session)
    if (packages.express['express-session']['postgres']) sessionStore.sync()
  }

  if (packages.express.routes) app.use('/', require('./routes'))

  return app
}
