const { repay } = require('@/utils/contracts')

module.exports = async (_, { userId }, { redis, res, session, models, user }) => {
  console.log('[Mutations][repay]')
  console.log('[Mutations][repay] userId: ', userId)
  try {
    const borrower = await models.Users.findOne({ where: { id: userId } })
    const repayTransaction = await repay({ borrowerAddress: borrower.wallet, amount: borrower.balance })
    return repayTransaction
  } catch (e) {
    throw e
  }
}
