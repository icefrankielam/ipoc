// const { createSession, sessionFromRefreshToken } = require('@/utils/session')

// module.exports = async (_, { refreshToken }, { redis, res }) => {
//   try {
//     const session = await sessionFromRefreshToken(redis, refreshToken)
//     if (!session) throw new Error('unauthorized')
//     const tokenData = await createSession(redis, res, session)
//     return tokenData
//   } catch (e) {
//     console.error(e)
//     throw e
//   }
// }
