const { ipocOnchainLiquidityPoolContract } = require('@/utils/contracts')


const run = async ({ sequelize, models }) => {
  // address _operator, address _identityContract, uint256 _identityTokenId, uint256 _uid
  // ipocOnchainLiquidityPoolContract.events.logInstapayCreated({ fromBlock: 0 }, async (err, event) => {
  //   if (err) {
  //     console.error(err)
  //   } else {
  //     try {
  //       console.log('logInstapayCreated: event: ', event)

  //       const {
  //         _operator,
  //         _identityContract,
  //         _identityTokenId,
  //         _uid,
  //       } = event.returnValues

  //       console.log('return value: _operator', _operator)
  //       console.log('return value: _identityContract', _identityContract)
  //       console.log('return value: _identityTokenId', _identityTokenId)
  //       console.log('return value: _uid', _uid)

  //       const txn = await sequelize.transaction()

  //       const user = await models.Users.findOne({ where: { id: _uid } })

  //       await txn.commit()
  //     } catch(error) {
  //       console.error(error)
  //     }
  //   }
  // })
}


module.exports.run = run

