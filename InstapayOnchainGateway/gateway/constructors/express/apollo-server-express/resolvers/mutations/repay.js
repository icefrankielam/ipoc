const { repay } = require('@/utils/contracts')

module.exports = async (_, { userId }, { redis, res, session, models, user }) => {
  console.log('[Mutations][repay]')
  console.log('[Mutations][repay] userId: ', userId)
  try {
    const borrower = await models.Users.findOne({ where: { id: userId } })
    console.log('borrower: ', borrower.get({ plain: true }))
    const pay = await repay({ borrowerAddress: borrower.wallet, amount: borrower.balance })
    console.log(pay)

    return { status: 'hello' }
  } catch (e) {
    throw e
  }
}
