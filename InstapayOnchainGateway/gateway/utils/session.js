const { path } = require('ramda')
const { promisify } = require('bluebird')
const jwt = require('jsonwebtoken')

const { IPOC_EXPRESS_SESSION_SECRET } = require('@/constructors/express/express-session')


const signJWT = promisify(jwt.sign)
const verifyJWT = promisify(jwt.verify)

const createJWT = async ({ key = IPOC_EXPRESS_SESSION_SECRET, data }) => {
  const result = await signJWT(data, key, { expiresIn: '30d' })
  return result
}

const decodeJWT = async ({ token, key = IPOC_EXPRESS_SESSION_SECRET }) => {
  return await verifyJWT(token, key)
}

const sessionFromRequest = async ({ req }) => {
  if (path(['session', 'user', 'id'], req)) return req.session
  if (!req.get('authorization')) return {}
  const token = req.get('authorization').split(' ')[1] /* "authorization: Bearer <token>" */
  return await decodeJWT({ token })
}

const createSession = async ({ redis, req, res, user }) => {
  const userData = { id: user.id }
  /* Set cookie */
  req.session.user = userData
  /* Create JWT tokens */ // Note - they are the same for now
  return {
    accessToken: await createJWT({ data: { user: userData } }),
    refreshToken: await createJWT({ data: { user: userData } }),
    tokenType: 'Bearer',
  }
}

const destroySession = ({ req }) => req.session.destroy()



module.exports.signJWT = signJWT
module.exports.verifyJWT = verifyJWT
module.exports.createSession = createSession
module.exports.destroySession = destroySession
module.exports.createJWT = createJWT
module.exports.decodeJWT = decodeJWT
module.exports.sessionFromRequest = sessionFromRequest
