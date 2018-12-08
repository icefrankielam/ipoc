const { repay } = require('@/utils/contracts')

module.exports = async (_, { userId }, { redis, res, session, models, user }) => {
  console.log('[Mutations][repay]')
  try {
    const pay = await repay({ userId })
    console.log(pay)

    return { status: 'hello' }
  } catch (e) {
    throw e
  }
}
