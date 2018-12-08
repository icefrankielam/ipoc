const { destroySession } = require('@/utils/session')

module.exports = async (_, $, { req }) => {
  try {
    await destroySession({ req })
  } catch (error) {
    console.error(error)
    return false
  }
}
