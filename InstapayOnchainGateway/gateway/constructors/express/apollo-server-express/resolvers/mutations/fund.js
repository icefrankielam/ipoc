// const { repay } = require('@/utils/contracts')

module.exports = async (_, { userId }, { redis, res, session, models, user }) => {
  console.log('[Mutations][fund]')
  try {
    // const pay = await repay({ userId })
    // console.log(pay)

    return true
  } catch (e) {
    throw e
  }
}
