const Session = require('express-session')
const Sequelize = require('sequelize')

const { packages } = require('@/config')
const { sequelize } = require('@/constructors/sequelize')

const IPOC_EXPRESS_SESSION_SECRET = process.env.IPOC_EXPRESS_SESSION_SECRET || 'keyboard cat'

const createStore = () => {
  if (packages.express['express-session']['postgres']) {
    const SequelizeStore = require('connect-session-sequelize')(Session.Store)
    store = new SequelizeStore({
      db: sequelize,
      checkExpirationInterval: 15 * 60 * 1000, // 15 minutes. The interval to cleanup expired sessions (in milliseconds).
      expiration: 24 * 60 * 60 * 1000, // 1 day (milliseconds)
    })
  }

  if (packages.express['express-session']['redis']) {
    // TODO
    const RedisStore = require('connect-redis')(Session)
    store = new RedisStore({
      // client: '',
      host: 'host',
      port: 6379,
      // socket: '',
    })
  }

  return store
}


const sessionStore = createStore()

const session = Session({
  secret: IPOC_EXPRESS_SESSION_SECRET,
  store: sessionStore,
  saveUninitialized: true,
  cookie: {
    secure: false && process.env.NODE_ENV !== 'development', // TODO
  },
  resave: false, // we support the touch method so per the express-session docs this should be set to false
  proxy: true, // if you do SSL outside of node.
})


module.exports.sessionStore = sessionStore
module.exports.session = session
module.exports.IPOC_EXPRESS_SESSION_SECRET = IPOC_EXPRESS_SESSION_SECRET
